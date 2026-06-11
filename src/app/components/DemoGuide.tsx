/* ══════════════════════════════════════════════════════════════════════════
   Demo hint indicators — placed on the next interactive element a
   presenter should click. Rendered inline by parent components that
   receive a `hintTarget` string from App.tsx.

   - DemoDot: subtle pulsing dot for emails, refresh, navigation
   - ActionHint: aggressive pulsing border + glow for action buttons

   Toggle all demo hints on/off with the backtick (`) key.
   ══════════════════════════════════════════════════════════════════════════ */

export function DemoDot({ className = '' }: { className?: string }) {
  return (
    <span
      className={`absolute pointer-events-none z-10 ${className}`}
      style={!className ? { top: -3, right: -3 } : undefined}
    >
      <span className="flex h-2.5 w-2.5">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ background: 'var(--chart-4)' }}
        />
        <span
          className="relative inline-flex rounded-full h-2.5 w-2.5"
          style={{ background: 'var(--chart-4)' }}
        />
      </span>
    </span>
  );
}

export function ActionHint({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex demo-action-hint">
      <span
        className="absolute -inset-[3px] rounded-[var(--radius-button)] pointer-events-none z-10"
        style={{
          border: '2px solid var(--chart-4)',
          animation: 'demo-action-pulse 2s ease-in-out infinite',
        }}
      />
      <span
        className="absolute -inset-[3px] rounded-[var(--radius-button)] pointer-events-none z-10"
        style={{
          boxShadow: '0 0 12px 2px var(--chart-4)',
          opacity: 0.4,
          animation: 'demo-action-glow 2s ease-in-out infinite',
        }}
      />
      {children}
      <style>{`
        @keyframes demo-action-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes demo-action-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </span>
  );
}