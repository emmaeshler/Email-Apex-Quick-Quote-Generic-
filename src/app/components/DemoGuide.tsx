/* ══════════════════════════════════════════════════════════════════════════
   DemoDot — a subtle pulsing indicator placed on the next interactive
   element a presenter should click. Rendered inline by parent components
   that receive a `hintTarget` string from App.tsx.

   Toggle all demo hints on/off with the backtick (`) key.
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Tiny pulsing dot — place inside a `relative` parent.
 * Uses --secondary (orange) from the design-system as the "yellow" cue.
 */
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