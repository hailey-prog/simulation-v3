import React from 'react';

export const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-1 px-4 py-3 bg-surface border border-border rounded-2xl rounded-tl-sm w-fit shadow-sm">
    <span className="w-2 h-2 bg-accent/50 rounded-full animate-dotBounce1" />
    <span className="w-2 h-2 bg-accent/50 rounded-full animate-dotBounce2" />
    <span className="w-2 h-2 bg-accent/50 rounded-full animate-dotBounce3" />
  </div>
);
