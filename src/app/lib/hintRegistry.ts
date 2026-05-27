/**
 * Workflow Hint Registry
 *
 * Declarative system for managing workflow indicators (yellow dots) throughout the demo.
 * Each HintRule defines when a hint should appear and what it should point to.
 */

/* ── Types ── */

export type HintTarget = `email:${string}` | `action:${string}` | null;

export interface HintConditions {
  // Email arrival state
  emailsArrived?: string[];
  emailsNotArrived?: string[];

  // Workflow state
  reviewResolved?: boolean;
  reviewStage?: 'pending' | 'composing' | 'sending' | 'resolved';
  reviewForwardStage?: 'pending' | 'composing' | 'sent' | 'processing' | 'quoted';
  forwardStage?: 'pending' | 'composing' | 'sent' | 'processing' | 'quoted';
  approvalStage?: 'pending' | 'composing' | 'approved' | 'sent';

  // UI state
  activeFolder?: 'csr' | 'eis' | 'review';
  selectedEmailId?: string | string[]; // single ID or array of acceptable IDs
  selectedEmailIdNot?: string[]; // must NOT be any of these IDs

  // Other
  hasNewMessages?: boolean;
  isRefreshing?: boolean;

  // Custom function for complex conditions
  customCondition?: (state: WorkflowState) => boolean;
}

export interface HintRule {
  id: string; // unique identifier for debugging
  priority: number; // higher = more important (used for conflict resolution)
  phase: string; // human-readable phase description
  conditions: HintConditions;
  target: HintTarget;
}

export interface WorkflowState {
  demoVisible: boolean;
  selectedEmailId: string | null;
  activeFolder: 'csr' | 'eis' | 'review';
  reviewResolved: boolean;
  reviewStage: 'pending' | 'composing' | 'sending' | 'resolved';
  reviewForwardStage: 'pending' | 'composing' | 'sent' | 'processing' | 'quoted';
  forwardStage: 'pending' | 'composing' | 'sent' | 'processing' | 'quoted';
  approvalStage: 'pending' | 'composing' | 'approved' | 'sent';
  arrivedEmails: Set<string>;
  readIds: Set<string>;
  hasNewMessages: boolean;
  isRefreshing: boolean;
  nextBatchIndex: number;
}

/* ── Hint Rules Registry ── */

export const hintRules: HintRule[] = [
  // ═══════════════════════════════════════════════════════════
  //  PHASE 0: INITIAL REFRESH
  // ═══════════════════════════════════════════════════════════
  {
    id: 'initial-refresh',
    priority: 1000,
    phase: 'Phase 0: Guide to refresh if inbox is empty',
    conditions: {
      emailsNotArrived: ['csr-review-1'],
      customCondition: (state) => state.nextBatchIndex === 0,
    },
    target: 'action:refresh',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 1A: REVIEW EMAIL - FORWARD TO STEVE
  // ═══════════════════════════════════════════════════════════
  {
    id: 'review-email-unopened',
    priority: 900,
    phase: 'Phase 1a: Guide to review email',
    conditions: {
      reviewResolved: false,
      forwardStage: 'pending',
      reviewStage: 'pending',
      activeFolder: 'csr',
      emailsArrived: ['csr-review-1'],
      emailsNotArrived: ['csr-steve-clarification'],
      selectedEmailIdNot: ['csr-review-1', 'csr-steve-clarification', 'csr-stonite-final-cc',
                           'csr-ai-1', 'csr-ai-2', 'csr-daily-summary'],
    },
    target: 'email:csr-review-1',
  },

  {
    id: 'review-forward-button',
    priority: 850,
    phase: 'Phase 1a: Guide to Forward button on review email',
    conditions: {
      reviewResolved: false,
      forwardStage: 'pending',
      reviewStage: 'pending',
      selectedEmailId: 'csr-review-1',
      emailsNotArrived: ['csr-steve-clarification'],
    },
    target: 'action:forward',
  },

  {
    id: 'review-send-button',
    priority: 840,
    phase: 'Phase 1a: Guide to Send button when composing review forward',
    conditions: {
      reviewResolved: false,
      forwardStage: 'pending',
      reviewStage: 'composing',
      selectedEmailId: 'csr-review-1',
      emailsNotArrived: ['csr-steve-clarification'],
    },
    target: 'action:send',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 1B: STEVE'S CLARIFICATION - AUTO-PROCESSED
  //  (Steve CC'd quotes@, so the agent picks it up automatically)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'steve-clarification-email',
    priority: 870,
    phase: 'Phase 1b: Guide to Steve\'s clarification email (auto-processing)',
    conditions: {
      reviewResolved: false,
      emailsArrived: ['csr-steve-clarification'],
      selectedEmailIdNot: ['csr-steve-clarification'],
      customCondition: (state) => !state.readIds.has('csr-steve-clarification'),
    },
    target: 'email:csr-steve-clarification',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 1C: QUOTE GENERATION - CRITICAL BUG FIX ZONE
  // ═══════════════════════════════════════════════════════════
  {
    id: 'stonite-final-email',
    priority: 800,
    phase: 'Phase 1c: Guide to final quote email (THE BUG FIX)',
    conditions: {
      reviewForwardStage: 'quoted',
      reviewResolved: false, // ← Critical: Now works because we don't set reviewResolved in timeout
      emailsArrived: ['csr-stonite-final-cc'],
      selectedEmailIdNot: ['csr-stonite-final-cc'],
    },
    target: 'email:csr-stonite-final-cc',
  },

  {
    id: 'stonite-transition-refresh',
    priority: 790,
    phase: 'Phase 1c→2: After viewing quote, guide to refresh for approval hold',
    conditions: {
      reviewForwardStage: 'quoted',
      reviewResolved: true,
      selectedEmailId: 'csr-stonite-final-cc',
      emailsNotArrived: ['csr-approval-hold'],
      hasNewMessages: true,
    },
    target: 'action:refresh',
  },

  {
    id: 'stonite-to-approval',
    priority: 780,
    phase: 'Phase 1c→2: After viewing quote, guide to approval hold if already loaded',
    conditions: {
      selectedEmailId: 'csr-stonite-final-cc',
      emailsArrived: ['csr-approval-hold'],
    },
    target: 'email:csr-approval-hold',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 2: APPROVAL HOLD WORKFLOW
  // ═══════════════════════════════════════════════════════════
  {
    id: 'approval-hold-email',
    priority: 750,
    phase: 'Phase 2: Guide to approval hold email',
    conditions: {
      reviewResolved: true,
      approvalStage: 'pending',
      activeFolder: 'csr',
      emailsArrived: ['csr-approval-hold'],
      selectedEmailIdNot: ['csr-approval-hold'],
    },
    target: 'email:csr-approval-hold',
  },

  {
    id: 'approval-reply-button',
    priority: 740,
    phase: 'Phase 2: Guide to Reply button on approval hold',
    conditions: {
      approvalStage: 'pending',
      selectedEmailId: 'csr-approval-hold',
      emailsArrived: ['csr-approval-hold'],
    },
    target: 'action:reply',
  },

  {
    id: 'approval-send-button',
    priority: 735,
    phase: 'Phase 2: Guide to Send button in approval reply',
    conditions: {
      approvalStage: 'composing',
      selectedEmailId: 'csr-approval-hold',
    },
    target: 'action:send',
  },

  {
    id: 'approval-to-rush-refresh',
    priority: 730,
    phase: 'Phase 2→3: After approval sent, guide to refresh for rush re-quote',
    conditions: {
      approvalStage: 'sent',
      selectedEmailId: ['csr-approval-hold', 'csr-approval-cc'],
      emailsNotArrived: ['csr-rush-cc'],
      hasNewMessages: true,
    },
    target: 'action:refresh',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 3: RUSH RE-QUOTE
  // ═══════════════════════════════════════════════════════════
  {
    id: 'rush-cc-email',
    priority: 650,
    phase: 'Phase 3: Guide to rush re-quote CC email',
    conditions: {
      approvalStage: 'sent',
      emailsArrived: ['csr-rush-cc'],
      selectedEmailIdNot: ['csr-rush-cc'],
      emailsNotArrived: ['csr-ai-2'],
    },
    target: 'email:csr-rush-cc',
  },

  {
    id: 'rush-to-autoquote-refresh',
    priority: 640,
    phase: 'Phase 3→4: After viewing rush, guide to refresh for auto-quotes',
    conditions: {
      approvalStage: 'sent',
      emailsArrived: ['csr-rush-cc'],
      selectedEmailId: 'csr-rush-cc',
      emailsNotArrived: ['csr-ai-2'],
      hasNewMessages: true,
    },
    target: 'action:refresh',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 4: AUTO-QUOTES
  // ═══════════════════════════════════════════════════════════
  {
    id: 'autoquote-email',
    priority: 600,
    phase: 'Phase 4: Guide to auto-quote CC email',
    conditions: {
      approvalStage: 'sent',
      emailsArrived: ['csr-ai-2'],
      selectedEmailIdNot: ['csr-ai-2'],
      emailsNotArrived: ['csr-daily-summary'],
    },
    target: 'email:csr-ai-2',
  },

  {
    id: 'autoquote-to-daily-refresh',
    priority: 590,
    phase: 'Phase 4→5: After viewing auto-quote, guide to refresh for daily summary',
    conditions: {
      approvalStage: 'sent',
      emailsArrived: ['csr-ai-2'],
      selectedEmailId: 'csr-ai-2',
      emailsNotArrived: ['csr-daily-summary'],
      hasNewMessages: true,
    },
    target: 'action:refresh',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 5: DAILY SUMMARY
  // ═══════════════════════════════════════════════════════════
  {
    id: 'daily-summary-refresh',
    priority: 530,
    phase: 'Phase 5: Guide to refresh for daily summary',
    conditions: {
      approvalStage: 'sent',
      emailsNotArrived: ['csr-daily-summary'],
      hasNewMessages: true,
      isRefreshing: false,
    },
    target: 'action:refresh',
  },

  {
    id: 'daily-summary-email',
    priority: 520,
    phase: 'Phase 5: Guide to daily summary email',
    conditions: {
      emailsArrived: ['csr-daily-summary'],
      selectedEmailIdNot: ['csr-daily-summary'],
    },
    target: 'email:csr-daily-summary',
  },
];

/* ── Evaluation Functions ── */

/**
 * Evaluates whether a single HintRule's conditions match the current workflow state.
 */
function evaluateConditions(conditions: HintConditions, state: WorkflowState): boolean {
  // Email arrival checks
  if (conditions.emailsArrived) {
    if (!conditions.emailsArrived.every(id => state.arrivedEmails.has(id))) return false;
  }
  if (conditions.emailsNotArrived) {
    if (conditions.emailsNotArrived.some(id => state.arrivedEmails.has(id))) return false;
  }

  // State checks (exact match)
  if (conditions.reviewResolved !== undefined && conditions.reviewResolved !== state.reviewResolved) return false;
  if (conditions.reviewStage !== undefined && conditions.reviewStage !== state.reviewStage) return false;
  if (conditions.reviewForwardStage !== undefined && conditions.reviewForwardStage !== state.reviewForwardStage) return false;
  if (conditions.forwardStage !== undefined && conditions.forwardStage !== state.forwardStage) return false;
  if (conditions.approvalStage !== undefined && conditions.approvalStage !== state.approvalStage) return false;
  if (conditions.activeFolder !== undefined && conditions.activeFolder !== state.activeFolder) return false;
  if (conditions.hasNewMessages !== undefined && conditions.hasNewMessages !== state.hasNewMessages) return false;
  if (conditions.isRefreshing !== undefined && conditions.isRefreshing !== state.isRefreshing) return false;

  // Selected email checks
  if (conditions.selectedEmailId !== undefined) {
    if (Array.isArray(conditions.selectedEmailId)) {
      if (!conditions.selectedEmailId.includes(state.selectedEmailId!)) return false;
    } else {
      if (conditions.selectedEmailId !== state.selectedEmailId) return false;
    }
  }
  if (conditions.selectedEmailIdNot !== undefined) {
    if (state.selectedEmailId && conditions.selectedEmailIdNot.includes(state.selectedEmailId)) return false;
  }

  // Custom condition
  if (conditions.customCondition && !conditions.customCondition(state)) return false;

  return true;
}

/**
 * Selects the highest-priority hint that matches the current workflow state.
 * Returns null if no hints match or if demo is not visible.
 */
export function selectHint(state: WorkflowState): HintTarget {
  if (!state.demoVisible) return null;

  // Find all matching rules
  const matches = hintRules.filter(rule => evaluateConditions(rule.conditions, state));

  if (matches.length === 0) {
    if (import.meta.env.DEV) {
      console.warn('[Hint System] No hints match current state:', {
        reviewStage: state.reviewStage,
        reviewForwardStage: state.reviewForwardStage,
        forwardStage: state.forwardStage,
        selectedEmailId: state.selectedEmailId,
        arrivedCount: state.arrivedEmails.size,
      });
    }
    return null;
  }

  // Sort by priority (descending) and return first match
  matches.sort((a, b) => b.priority - a.priority);

  if (import.meta.env.DEV) {
    console.log(`[Hint System] Selected: ${matches[0].id} (${matches[0].phase}) from ${matches.length} matches`);
  }

  return matches[0].target;
}

/**
 * Development-time validation to check hint coverage across workflow phases.
 * Call this on app mount to catch missing hints early.
 */
export function validateHintCoverage(): void {
  if (!import.meta.env.DEV) return;

  const validTargetPatterns = [
    /^action:(refresh|forward|send|reply)$/,
    /^email:[\w-]+$/,
    /^folder:[\w-]+$/,
  ];

  const issues: string[] = [];
  const phases = ['Phase 0', 'Phase 1a', 'Phase 1b', 'Phase 1c', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5'];

  // Check phase coverage
  console.group('[Hint Coverage Validation]');
  phases.forEach(phase => {
    const phaseRules = hintRules.filter(r => r.phase.startsWith(phase));
    const status = phaseRules.length > 0 ? '✓' : '⚠';
    console.log(`${status} ${phase}: ${phaseRules.length} rules`);
  });

  // Check target validity
  hintRules.forEach(rule => {
    const isValid = validTargetPatterns.some(pattern =>
      rule.target && pattern.test(rule.target)
    );
    if (!isValid) {
      issues.push(`Rule "${rule.id}" has invalid target format: "${rule.target}"`);
    }
  });

  console.log(`Total rules: ${hintRules.length}`);

  if (issues.length > 0) {
    console.error('❌ Target Format Issues:', issues);
  } else {
    console.log('✓ All targets use valid formats');
  }

  console.groupEnd();
}
