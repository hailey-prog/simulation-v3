import React, { useMemo, useEffect, useState } from 'react';
import { ChatMessage, SituationContent } from '../types/simulation';
import { RoundBadge } from './RoundBadge';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import { TypingIndicator } from './TypingIndicator';
import { EmailCard } from './EmailCard';
import { SlideCard } from './SlideCard';
import { DocumentCard } from './DocumentCard';
import { AttachmentCard } from './AttachmentCard';

// ─── Plain text parsing ────────────────────────────────────────

interface TextSegment {
  type: 'plain' | 'quote';
  start: number;
  end: number;
  content: string;
}

function parseSegments(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const regex = /"[^"]*"/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'plain', start: lastIndex, end: match.index, content: text.slice(lastIndex, match.index) });
    }
    segments.push({ type: 'quote', start: match.index, end: match.index + match[0].length, content: match[0] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ type: 'plain', start: lastIndex, end: text.length, content: text.slice(lastIndex) });
  }
  return segments.length ? segments : [{ type: 'plain', start: 0, end: text.length, content: text }];
}

interface LineRange { text: string; start: number; end: number; }

function buildLineRanges(fullText: string): LineRange[] {
  const ranges: LineRange[] = [];
  let idx = 0;
  for (const line of fullText.split('\n')) {
    ranges.push({ text: line, start: idx, end: idx + line.length });
    idx += line.length + 1;
  }
  return ranges;
}

function cursorLineIndex(lines: LineRange[], d: number, fullText: string, showCursor: boolean): number {
  if (!showCursor || d <= 0) return -1;
  if (d >= fullText.length) return Math.max(0, lines.length - 1);
  const lastCh = fullText[d - 1];
  if (lastCh === '\n') {
    const i = lines.findIndex((l) => l.start === d);
    return i >= 0 ? i : lines.length - 1;
  }
  return lines.findIndex((l) => l.start <= d - 1 && d - 1 < l.end);
}

function renderPlainScenarioLines(fullText: string, displayedLen: number, showCursor: boolean, wrapClass: string) {
  const lines = buildLineRanges(fullText);
  const lastNonEmptyIdx = lines.reduce((acc, l, i) => (l.text.trim() ? i : acc), -1);
  const cursorIdx = cursorLineIndex(lines, displayedLen, fullText, showCursor);

  return (
    <div className={`flex flex-col gap-2 ${wrapClass}`}>
      {lines.map((line, i) => {
        if (displayedLen < line.start) return null;
        if (!line.text.trim()) return <div key={i} className="h-3 shrink-0" aria-hidden />;

        const sliceEnd = Math.min(displayedLen, line.end);
        const visible = fullText.slice(line.start, sliceEnd);
        const showTypingCursor = showCursor && cursorIdx === i;
        const isCircled = /^[\u2460-\u2473]/.test(line.text);
        const isClosingQuestion = i === lastNonEmptyIdx && /[?？]$/.test(line.text.trim()) && !isCircled;

        if (isCircled) return (
          <div key={i} className="border-l-4 border-slate-300 pl-3 py-1.5 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
            {visible}{showTypingCursor && <span className="typing-cursor" />}
          </div>
        );
        if (isClosingQuestion) return (
          <p key={i} className="text-[16px] font-bold text-slate-900 mt-5 leading-relaxed whitespace-pre-wrap">
            {visible}{showTypingCursor && <span className="typing-cursor" />}
          </p>
        );
        return (
          <p key={i} className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
            {visible}{showTypingCursor && <span className="typing-cursor" />}
          </p>
        );
      })}
    </div>
  );
}

function renderSegments(segments: TextSegment[], displayedLen: number, showCursor: boolean) {
  const lastVisibleIdx = segments.reduce((acc, seg, i) => (seg.start < displayedLen ? i : acc), -1);
  const hasQuotes = segments.some((s) => s.type === 'quote');
  const lastPlainIdx = segments.reduce((acc, seg, i) => (seg.type === 'plain' ? i : acc), -1);

  return segments.map((seg, i) => {
    if (seg.start >= displayedLen) return null;
    const visible = seg.content.slice(0, displayedLen - seg.start);
    const cursor = showCursor && i === lastVisibleIdx ? <span className="typing-cursor" /> : null;

    if (seg.type === 'quote') return (
      <div key={i} className="bg-sky-100 rounded-xl rounded-tl-none px-4 py-3.5 text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
        {visible}{cursor}
      </div>
    );
    const trimmed = visible.replace(/^\n+|\n+$/g, '');
    if (!trimmed && !cursor) return null;
    const isKeyQuestion = hasQuotes && i === lastPlainIdx;
    return (
      <p key={i} className={`leading-relaxed whitespace-pre-wrap ${isKeyQuestion ? 'text-[16px] font-bold text-slate-900 mt-5' : 'text-sm text-slate-600'}`}>
        {trimmed}{cursor}
      </p>
    );
  });
}

// ─── Rich content typing ───────────────────────────────────────

function getBodyText(content: SituationContent): string {
  if (content.type === 'email') return content.body;
  if (content.type === 'document') return content.body;
  return '';
}

interface RichTypingProps {
  content: SituationContent;
  question: string;
  onReady: () => void;
}

const RichTyping: React.FC<RichTypingProps> = ({ content, question, onReady }) => {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCard(true), 500);
    return () => clearTimeout(t);
  }, []);

  const bodyText = getBodyText(content);
  const fullTypingText = bodyText ? `${bodyText}${question}` : question;
  const bodyBoundary = bodyText.length;

  const { displayed, skip } = useTypingAnimation(
    showCard ? fullTypingText : '',
    showCard,
    onReady,
    12
  );

  if (!showCard) return <TypingIndicator />;

  const displayedBody = displayed.slice(0, Math.min(displayed.length, bodyBoundary));
  const bodyDone = displayed.length >= bodyBoundary;
  const displayedQuestion = bodyDone ? displayed.slice(bodyBoundary) : '';
  const bodyTyping = !bodyDone && displayed.length > 0;
  const questionTyping = bodyDone && displayed.length < fullTypingText.length;

  return (
    <div
      className="flex flex-col gap-3 max-w-[90%] animate-fadeIn"
      onClick={skip}
      style={{ cursor: 'pointer' }}
    >
      {content.type === 'email' && (
        <EmailCard content={content} typedBody={displayedBody} bodyTyping={bodyTyping} />
      )}
      {content.type === 'document' && (
        <DocumentCard content={content} typedBody={displayedBody} bodyTyping={bodyTyping} />
      )}
      {content.type === 'slide' && <SlideCard content={content} />}
      {content.type === 'attachment' && <AttachmentCard content={content} />}

      {question && (bodyDone || !bodyText) && (
        <p className="text-[16px] font-bold text-slate-900 leading-relaxed">
          {displayedQuestion || (bodyDone && !bodyText ? '' : '')}
          {questionTyping && <span className="typing-cursor" />}
        </p>
      )}
    </div>
  );
};

// ─── Static rich content (already done typing) ────────────────

const RichStatic: React.FC<{ content: SituationContent; question: string }> = ({ content, question }) => (
  <div className="flex flex-col gap-3 max-w-[90%]">
    {content.type === 'email' && <EmailCard content={content} />}
    {content.type === 'document' && <DocumentCard content={content} />}
    {content.type === 'slide' && <SlideCard content={content} />}
    {content.type === 'attachment' && <AttachmentCard content={content} />}
    {question && <p className="text-[16px] font-bold text-slate-900 leading-relaxed">{question}</p>}
  </div>
);

// ─── Component ────────────────────────────────────────────────

interface Props {
  message: ChatMessage;
  onTyped: (id: string) => void;
}

export const SystemMessage: React.FC<Props> = ({ message, onTyped }) => {
  const situationContent = message.situationContent;
  const isPlain = !situationContent || situationContent.type === 'plain';
  const plainText = isPlain && situationContent?.type === 'plain' ? situationContent.text : '';
  const question = message.question ?? '';

  const fullTypingText = useMemo(() => {
    if (!isPlain) return '';
    return question ? `${plainText}\n\n${question}` : plainText;
  }, [isPlain, plainText, question]);

  const segments = useMemo(() => parseSegments(fullTypingText), [fullTypingText]);

  const { displayed, skip } = useTypingAnimation(
    fullTypingText,
    isPlain && message.isTyping,
    () => onTyped(message.id)
  );

  const showCursor = isPlain && message.isTyping && displayed.length > 0;

  const roundBadge = message.type === 'system-scenario' && message.roundId && message.roundTitle
    ? <RoundBadge roundId={message.roundId} title={message.roundTitle} />
    : null;

  // ── Plain ──
  if (isPlain) {
    if (message.isTyping && displayed === '') {
      return (
        <div className="flex flex-col gap-0 animate-fadeIn">
          {roundBadge}
          <TypingIndicator />
        </div>
      );
    }

    const hasQuotes = segments.some((s) => s.type === 'quote');
    const bodyContent = hasQuotes
      ? <div className="flex flex-col gap-3 max-w-[90%]">{renderSegments(segments, displayed.length, showCursor)}</div>
      : renderPlainScenarioLines(fullTypingText, displayed.length, showCursor, 'max-w-[90%]');

    return (
      <div
        className="flex flex-col gap-0 animate-fadeIn"
        onClick={message.isTyping ? skip : undefined}
        style={{ cursor: message.isTyping ? 'pointer' : 'default' }}
      >
        {roundBadge}
        {bodyContent}
      </div>
    );
  }

  // ── Rich types ──
  if (!situationContent) return null;

  return (
    <div className="flex flex-col gap-0 animate-fadeIn">
      {roundBadge}
      {message.isTyping
        ? <RichTyping content={situationContent} question={question} onReady={() => onTyped(message.id)} />
        : <RichStatic content={situationContent} question={question} />
      }
    </div>
  );
};
