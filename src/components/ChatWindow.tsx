import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChatMessage, Choice } from '../types/simulation';
import { SystemMessage } from './SystemMessage';
import { UserMessage } from './UserMessage';
import { ChoiceButtons } from './ChoiceButtons';
import { X } from 'lucide-react';

const CHOICE_HINT_DELAY_MS = 30_000;
const CHOICE_HINT_MESSAGE = '구체적인 상황이 더 필요하다면 업무를 하면서 겪었던 상황을 기준으로 선택해 주세요.';

interface Props {
  messages: ChatMessage[];
  currentRoundChoices: Choice[];
  choicesEnabled: boolean;
  previousChoiceId?: string;
  onSelect: (choice: Choice) => void;
  onTyped: (id: string) => void;
  onRollback: (roundId: number) => void;
}

export const ChatWindow: React.FC<Props> = ({
  messages,
  currentRoundChoices,
  choicesEnabled,
  previousChoiceId,
  onSelect,
  onTyped,
  onRollback,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const roundRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [choiceHintToast, setChoiceHintToast] = useState(false);
  const [fadingFromIdx, setFadingFromIdx] = useState<number | null>(null);
  const prevMsgCountRef = useRef(0);
  const isTypingActiveRef = useRef(false);

  // Auto-scroll during typing: only scroll if bottomRef has gone below the visible area
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const observer = new ResizeObserver(() => {
      if (!isTypingActiveRef.current) return;
      const container = containerRef.current;
      const bottom = bottomRef.current;
      if (!container || !bottom) return;
      const containerBottom = container.getBoundingClientRect().bottom;
      const bottomElBottom = bottom.getBoundingClientRect().bottom;
      if (bottomElBottom > containerBottom + 8) {
        bottom.scrollIntoView({ behavior: 'instant', block: 'end' });
      }
    });
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const isNewMessage = messages.length > prevMsgCountRef.current;
    prevMsgCountRef.current = messages.length;

    if (!isNewMessage || fadingFromIdx !== null) return;

    const latestMsg = messages[messages.length - 1];

    if (latestMsg?.type === 'system-scenario') {
      isTypingActiveRef.current = true;
      requestAnimationFrame(() => {
        const el = roundRefs.current.get(latestMsg.roundId!);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      });
      return;
    }

    isTypingActiveRef.current = false;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, fadingFromIdx]);

  const handleTyped = useCallback((id: string) => {
    isTypingActiveRef.current = false;
    onTyped(id);
  }, [onTyped]);

  const lastScenarioMsg = [...messages].reverse().find((m) => m.type === 'system-scenario');
  const showChoicesAfter = lastScenarioMsg?.id;

  const lastScenarioDoneTyping = lastScenarioMsg && !lastScenarioMsg.isTyping;
  const showChoices = lastScenarioDoneTyping && choicesEnabled && fadingFromIdx === null;

  useEffect(() => {
    if (showChoices) {
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      });
    }
  }, [showChoices]);

  useEffect(() => {
    if (!showChoices) {
      setChoiceHintToast(false);
      return;
    }
    setChoiceHintToast(false);
    const timer = window.setTimeout(() => setChoiceHintToast(true), CHOICE_HINT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [showChoices, showChoicesAfter]);

  const isEditable = useCallback(
    (roundId: number) =>
      messages.some((m) => m.type === 'system-scenario' && (m.roundId ?? 0) > roundId),
    [messages]
  );

  const handleEdit = useCallback(
    (msg: ChatMessage) => {
      if (!msg.roundId) return;
      const startIdx = messages.findIndex((m) => m.id === msg.id);
      if (startIdx < 0) return;

      setFadingFromIdx(startIdx);

      setTimeout(() => {
        setFadingFromIdx(null);
        onRollback(msg.roundId!);
        setTimeout(() => {
          const el = roundRefs.current.get(msg.roundId!);
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }, 200);
    },
    [messages, onRollback]
  );

  return (
    <div ref={containerRef} className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden chat-scroll px-5 py-6">
      <div ref={innerRef} className="space-y-8">
      {messages.map((msg, index) => {
        const prev = index > 0 ? messages[index - 1] : undefined;
        const showRoundDivider =
          msg.roundId != null &&
          prev != null &&
          prev.roundId != null &&
          msg.roundId > prev.roundId;

        const isCurrentActive = msg.id === showChoicesAfter && showChoices;
        const isFading = fadingFromIdx !== null && index >= fadingFromIdx;

        return (
          <div
            key={msg.id}
            ref={
              msg.type === 'system-scenario' && msg.roundId != null
                ? (el) => {
                    if (el) roundRefs.current.set(msg.roundId!, el);
                    else roundRefs.current.delete(msg.roundId!);
                  }
                : undefined
            }
            className={[
              showRoundDivider ? '!mt-8 border-t border-border pt-8' : '',
              isFading ? 'opacity-0 transition-opacity duration-200' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {msg.type === 'user-choice' && msg.choiceText ? (
              <UserMessage
                text={msg.choiceText}
                onEdit={
                  msg.roundId != null && isEditable(msg.roundId)
                    ? () => handleEdit(msg)
                    : undefined
                }
              />
            ) : (
              <SystemMessage message={msg} onTyped={handleTyped} />
            )}

            {isCurrentActive && (
              <ChoiceButtons
                choices={currentRoundChoices}
                enabled={choicesEnabled}
                onSelect={onSelect}
                previousChoiceId={previousChoiceId}
              />
            )}
          </div>
        );
      })}
      <div ref={bottomRef} />
      </div>

      {choiceHintToast && (
        <div
          className="fixed left-1/2 z-[120] w-[min(480px,calc(100vw-2rem))] -translate-x-1/2 animate-fadeIn"
          style={{ top: '56px' }}
          role="status"
        >
          <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 shadow-lg">
            <p className="flex-1 text-sm font-medium text-white leading-snug">{CHOICE_HINT_MESSAGE}</p>
            <button
              onClick={() => setChoiceHintToast(false)}
              className="shrink-0 text-slate-400 hover:text-white transition-colors"
              aria-label="닫기"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
