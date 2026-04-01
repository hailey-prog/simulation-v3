import { useState, useCallback, useRef } from 'react';
import { simulationData } from '../data/scenario';
import {
  ChatMessage,
  ChoiceHistoryItem,
  Choice,
  CompetencyScores,
  SimulationPhase,
  SituationContent,
} from '../types/simulation';

let msgCounter = 0;
const uid = () => `msg-${++msgCounter}`;

function getBranchedContent(roundId: number, branchMap: Record<number, string>): SituationContent {
  const round = simulationData.rounds.find((r) => r.id === roundId)!;
  const prevKey = branchMap[roundId - 1] ?? branchMap[roundId - 2] ?? branchMap[roundId - 3];
  if (round.branchedContent && prevKey && round.branchedContent[prevKey]) {
    return round.branchedContent[prevKey];
  }
  return round.content;
}

export function useSimulation() {
  const [phase, setPhase] = useState<SimulationPhase>('intro');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentRound, setCurrentRound] = useState(0); // 0-indexed
  const [branchMap, setBranchMap] = useState<Record<number, string>>({}); // roundId -> branchKey
  const [choiceHistory, setChoiceHistory] = useState<ChoiceHistoryItem[]>([]);
  const [choicesEnabled, setChoicesEnabled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [previousChoiceId, setPreviousChoiceId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState(simulationData.intro.character.name);
  const [submitNote, setSubmitNote] = useState('');

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addMessage = useCallback((msg: Omit<ChatMessage, 'id'>) => {
    const full: ChatMessage = { id: uid(), ...msg };
    setMessages((prev) => [...prev, full]);
    return full.id;
  }, []);

  const markTypingDone = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isTyping: false } : m))
    );
  }, []);

  // --- Start simulation: show first round scenario ---
  const startSimulation = useCallback(() => {
    setPhase('running');
    const round = simulationData.rounds[0];
    addMessage({
      type: 'system-scenario',
      roundId: round.id,
      situationContent: round.content,
      question: round.question,
      situationType: round.situationType,
      roundTitle: round.title,
      isTyping: true,
    });
    setIsTyping(true);
    setChoicesEnabled(false);
  }, [addMessage]);

  const onScenarioTyped = useCallback((msgId: string) => {
    markTypingDone(msgId);
    setIsTyping(false);
    setChoicesEnabled(true);
  }, [markTypingDone]);

  // --- User selects a choice ---
  const selectChoice = useCallback(
    (choice: Choice) => {
      if (!choicesEnabled) return;
      setChoicesEnabled(false);
      setPreviousChoiceId(null);

      const round = simulationData.rounds[currentRound];

      const newBranchMap = { ...branchMap, [round.id]: choice.branchKey };
      setBranchMap(newBranchMap);

      // Add user bubble immediately
      addMessage({
        type: 'user-choice',
        roundId: round.id,
        choiceText: choice.text,
        isTyping: false,
      });

      // Record choice history (no reaction)
      setChoiceHistory((prev) => [
        ...prev,
        {
          roundId: round.id,
          roundTitle: round.title,
          choiceId: choice.id,
          choiceText: choice.text,
          scores: choice.scores,
          quality: choice.quality,
        },
      ]);

      const nextRoundIndex = currentRound + 1;
      const isLast = nextRoundIndex >= simulationData.rounds.length;

      // 600ms delay, then advance to next round or submit-review
      timerRef.current = setTimeout(() => {
        if (isLast) {
          setPhase('submit-review');
          return;
        }

        setCurrentRound(nextRoundIndex);
        const nextRound = simulationData.rounds[nextRoundIndex];
        const content = getBranchedContent(nextRound.id, newBranchMap);

        setIsTyping(true);
        addMessage({
          type: 'system-scenario',
          roundId: nextRound.id,
          situationContent: content,
          question: nextRound.question,
          situationType: nextRound.situationType,
          roundTitle: nextRound.title,
          isTyping: true,
        });
        setChoicesEnabled(false);
      }, 600);
    },
    [choicesEnabled, currentRound, branchMap, addMessage]
  );

  // --- Rollback to a past round (for edit flow) ---
  const rollbackToRound = useCallback(
    (roundId: number) => {
      const roundIndex = simulationData.rounds.findIndex((r) => r.id === roundId);
      if (roundIndex < 0) return;

      const prevItem = choiceHistory.find((h) => h.roundId === roundId);
      setPreviousChoiceId(prevItem?.choiceId ?? null);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      setMessages((prev) => {
        const scenarioIdx = prev.findIndex(
          (m) => m.type === 'system-scenario' && m.roundId === roundId
        );
        if (scenarioIdx < 0) return prev;
        return prev.slice(0, scenarioIdx + 1);
      });

      setCurrentRound(roundIndex);

      setChoiceHistory((prev) =>
        prev.filter((h) => {
          const hIdx = simulationData.rounds.findIndex((r) => r.id === h.roundId);
          return hIdx < roundIndex;
        })
      );

      setBranchMap((prev) => {
        const next = { ...prev };
        simulationData.rounds.forEach((r, idx) => {
          if (idx >= roundIndex) delete next[r.id];
        });
        return next;
      });

      setChoicesEnabled(true);
      setIsTyping(false);
      setPhase('running');
    },
    [choiceHistory]
  );

  // --- Submit simulation → outro ---
  const submitSimulation = useCallback(() => {
    setPhase('outro');
  }, []);

  // Compute final scores
  const computeScores = useCallback((): {
    totals: CompetencyScores;
    percentages: CompetencyScores;
    overall: number;
  } => {
    const keys: (keyof CompetencyScores)[] = ['user', 'collaboration', 'decision', 'business'];
    const totals: CompetencyScores = { user: 0, collaboration: 0, decision: 0, business: 0 };
    const maxPossible: CompetencyScores = { user: 0, collaboration: 0, decision: 0, business: 0 };

    choiceHistory.forEach((item) => {
      keys.forEach((k) => {
        totals[k] += item.scores[k];
      });
    });

    simulationData.rounds.forEach((round) => {
      keys.forEach((k) => {
        const max = Math.max(...round.choices.map((c) => c.scores[k]));
        maxPossible[k] += max;
      });
    });

    const percentages: CompetencyScores = { user: 0, collaboration: 0, decision: 0, business: 0 };
    keys.forEach((k) => {
      percentages[k] = maxPossible[k] > 0 ? Math.round((totals[k] / maxPossible[k]) * 100) : 0;
    });

    const overall = Math.round(keys.reduce((s, k) => s + percentages[k], 0) / keys.length);

    return { totals, percentages, overall };
  }, [choiceHistory]);

  return {
    phase,
    messages,
    currentRound,
    choiceHistory,
    choicesEnabled,
    isTyping,
    previousChoiceId,
    playerName,
    submitNote,
    simulationData,
    setPlayerName,
    setSubmitNote,
    startSimulation,
    onScenarioTyped,
    selectChoice,
    rollbackToRound,
    submitSimulation,
    computeScores,
  };
}
