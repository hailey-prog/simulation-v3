import { useCallback, useEffect, useRef, useState } from 'react';
import { useSimulation } from './hooks/useSimulation';
import { Header } from './components/Header';
import { IntroScreen } from './components/IntroScreen';
import { ChatWindow } from './components/ChatWindow';
import { SubmitReview } from './pages/SubmitReview';
import { OutroScreen } from './pages/OutroScreen';
import { Choice } from './types/simulation';

export function SimulationApp() {
  const {
    phase,
    messages,
    currentRound,
    choiceHistory,
    choicesEnabled,
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
  } = useSimulation();

  // Count-up elapsed timer — starts when simulation begins, keeps running through all phases
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (phase === 'running' || phase === 'submit-review') {
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setElapsedSeconds((s) => s + 1);
        }, 1000);
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [phase]);

  const handleTyped = useCallback(
    (msgId: string) => {
      const msg = messages.find((m) => m.id === msgId);
      if (!msg) return;
      if (msg.type === 'system-scenario') onScenarioTyped(msgId);
    },
    [messages, onScenarioTyped]
  );

  const handleSelect = useCallback((choice: Choice) => selectChoice(choice), [selectChoice]);

  const handleRollbackFromReview = useCallback(
    (roundId: number) => {
      rollbackToRound(roundId);
    },
    [rollbackToRound]
  );

  const currentRoundData = simulationData.rounds[currentRound];

  const scores = phase === 'outro' ? computeScores() : null;

  return (
    <div className="h-screen bg-base flex flex-col overflow-hidden">
      {phase !== 'intro' && phase !== 'outro' && (
        <Header
          title={simulationData.intro.title}
          currentRound={currentRound + 1}
          totalRounds={simulationData.intro.totalRounds}
          isRunning={phase === 'running'}
          elapsedSeconds={elapsedSeconds}
        />
      )}
      <div className="flex-1 flex justify-center min-h-0 min-w-0">
        <div className="w-full max-w-[720px] flex flex-col min-h-0 min-w-0">

          {phase === 'intro' && (
            <IntroScreen
              intro={simulationData.intro}
              playerName={playerName}
              onNameChange={setPlayerName}
              onStart={startSimulation}
            />
          )}

          {phase === 'running' && (
            <div className="flex-1 min-h-0 flex flex-col">
              <ChatWindow
                messages={messages}
                currentRoundChoices={currentRoundData?.choices ?? []}
                choicesEnabled={choicesEnabled}
                previousChoiceId={previousChoiceId ?? undefined}
                onSelect={handleSelect}
                onTyped={handleTyped}
                onRollback={rollbackToRound}
              />
            </div>
          )}

          {phase === 'submit-review' && (
            <SubmitReview
              choiceHistory={choiceHistory}
              elapsedSeconds={elapsedSeconds}
              submitNote={submitNote}
              onNoteChange={setSubmitNote}
              onRollback={handleRollbackFromReview}
              onSubmit={submitSimulation}
            />
          )}

          {phase === 'outro' && scores && (
            <OutroScreen
              playerName={playerName}
              overall={scores.overall}
              percentages={scores.percentages}
              elapsedSeconds={elapsedSeconds}
              outro={simulationData.outro}
              competencyLabels={simulationData.competencyLabels}
            />
          )}

        </div>
      </div>
    </div>
  );
}
