/**
 * Workflow Flowchart - Hidden Admin Panel
 *
 * Visual diagram showing all workflow phases, transitions, and hint rules.
 * Accessed via the hidden "Deleted" folder in the sidebar.
 */

import { hintRules } from '../lib/hintRegistry';

export function WorkflowFlowchart() {
  // Group rules by phase
  const phaseGroups = hintRules.reduce((acc, rule) => {
    const phase = rule.phase.split(':')[0]; // Extract "Phase 0", "Phase 1a", etc.
    if (!acc[phase]) acc[phase] = [];
    acc[phase].push(rule);
    return acc;
  }, {} as Record<string, typeof hintRules>);

  const phases = Object.keys(phaseGroups).sort();

  return (
    <div className="size-full overflow-auto bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-w-semibold text-foreground mb-2">
            Workflow Hint Registry
          </h1>
          <p className="text-foreground/60">
            Visual map of all {hintRules.length} workflow hint rules across {phases.length} phases
          </p>
        </div>

        {/* Flowchart */}
        <div className="space-y-8">
          {phases.map((phase, phaseIndex) => {
            const rules = phaseGroups[phase];
            const isActive = false; // TODO: Could track current phase

            return (
              <div
                key={phase}
                className={`
                  relative border-2 rounded-lg p-6
                  ${isActive ? 'border-blue-500 bg-blue-50/5' : 'border-border'}
                `}
              >
                {/* Phase Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-w-medium text-foreground mb-1">
                      {phase}
                    </h2>
                    <p className="text-sm text-foreground/60">
                      {rules.length} hint{rules.length !== 1 ? 's' : ''} defined
                    </p>
                  </div>
                  <div className="text-sm text-foreground/40 font-mono">
                    Priority: {Math.max(...rules.map(r => r.priority))}–{Math.min(...rules.map(r => r.priority))}
                  </div>
                </div>

                {/* Hint Rules */}
                <div className="space-y-3">
                  {rules
                    .sort((a, b) => b.priority - a.priority)
                    .map((rule) => (
                      <div
                        key={rule.id}
                        className="flex items-start gap-4 p-4 bg-background-secondary/50 rounded-md border border-border/50"
                      >
                        {/* Priority Badge */}
                        <div className="shrink-0 w-12 h-8 flex items-center justify-center bg-primary/10 text-primary text-sm font-w-medium rounded">
                          {rule.priority}
                        </div>

                        {/* Rule Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-w-medium text-foreground">
                              {rule.id}
                            </span>
                            <span className="text-xs text-foreground/40">→</span>
                            <code className="text-xs px-2 py-0.5 bg-background rounded font-mono text-primary">
                              {rule.target}
                            </code>
                          </div>
                          <p className="text-sm text-foreground/70 mb-2">
                            {rule.phase.split(': ')[1] || rule.phase}
                          </p>

                          {/* Conditions */}
                          <div className="flex flex-wrap gap-1.5">
                            {Object.entries(rule.conditions).map(([key, value]) => {
                              if (key === 'customCondition') {
                                return (
                                  <span
                                    key={key}
                                    className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded"
                                  >
                                    custom()
                                  </span>
                                );
                              }

                              let displayValue = value;
                              if (Array.isArray(value)) {
                                displayValue = value.length > 2
                                  ? `[${value.length} items]`
                                  : value.join(', ');
                              } else if (typeof value === 'boolean') {
                                displayValue = value ? '✓' : '✗';
                              }

                              return (
                                <span
                                  key={key}
                                  className="text-xs px-2 py-0.5 bg-background border border-border/50 text-foreground/60 rounded font-mono"
                                >
                                  {key}: {String(displayValue)}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Arrow to next phase */}
                {phaseIndex < phases.length - 1 && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-8 h-8 flex items-center justify-center bg-background border-2 border-border rounded-full">
                      <svg
                        className="w-4 h-4 text-foreground/40"
                        fill="none"
                        strokeWidth="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-12 pt-6 border-t border-border">
          <h3 className="text-sm font-w-medium text-foreground mb-3">Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-12 h-6 flex items-center justify-center bg-primary/10 text-primary text-xs font-w-medium rounded shrink-0">
                900
              </div>
              <div>
                <span className="font-w-medium text-foreground">Priority Number</span>
                <p className="text-xs text-foreground/60">Higher = more important when multiple rules match</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <code className="text-xs px-2 py-0.5 bg-background rounded font-mono text-primary shrink-0">
                email:id
              </code>
              <div>
                <span className="font-w-medium text-foreground">Hint Target</span>
                <p className="text-xs text-foreground/60">What the yellow dot points to</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs px-2 py-0.5 bg-background border border-border/50 text-foreground/60 rounded font-mono shrink-0">
                reviewStage
              </span>
              <div>
                <span className="font-w-medium text-foreground">Condition</span>
                <p className="text-xs text-foreground/60">State requirement for this hint to show</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded shrink-0">
                custom()
              </span>
              <div>
                <span className="font-w-medium text-foreground">Custom Function</span>
                <p className="text-xs text-foreground/60">Complex conditional logic</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <h3 className="text-sm font-w-medium text-foreground mb-2">About This Registry</h3>
          <p className="text-sm text-foreground/70 leading-relaxed">
            This registry replaces the old 110-line conditional hint logic with a declarative pattern.
            Each rule is self-documenting and includes conditions, priority, and target.
            The system automatically selects the highest-priority matching rule.
            To add new hints, add a new HintRule object to <code className="text-xs px-1 py-0.5 bg-background rounded font-mono">src/app/lib/hintRegistry.ts</code>
          </p>
        </div>
      </div>
    </div>
  );
}
