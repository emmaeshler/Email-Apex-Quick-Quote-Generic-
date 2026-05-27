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
                           'csr-ai-1', 'csr-ai-2', 'csr-forward-1', 'csr-daily-summary'],
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
  //  PHASE 1B: STEVE'S CLARIFICATION - FORWARD TO QUOTES@
  // ═══════════════════════════════════════════════════════════
  {
    id: 'steve-clarification-email',
    priority: 870,
    phase: 'Phase 1b: Guide to Steve\'s clarification email',
    conditions: {
      reviewResolved: false,
      reviewForwardStage: 'pending',
      emailsArrived: ['csr-steve-clarification'],
      selectedEmailIdNot: ['csr-steve-clarification'],
    },
    target: 'email:csr-steve-clarification',
  },

  {
    id: 'steve-clarification-forward-button',
    priority: 860,
    phase: 'Phase 1b: Guide to Forward button on Steve\'s clarification',
    conditions: {
      reviewForwardStage: 'pending',
      selectedEmailId: 'csr-steve-clarification',
      emailsArrived: ['csr-steve-clarification'],
    },
    target: 'action:forward',
  },

  {
    id: 'steve-clarification-send-button',
    priority: 850,
    phase: 'Phase 1b: Guide to Send button when forwarding to quotes@',
    conditions: {
      reviewForwardStage: 'composing',
      selectedEmailId: 'csr-steve-clarification',
    },
    target: 'action:send',
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
    id: 'approval-to-herman-refresh',
    priority: 730,
    phase: 'Phase 2→3: After approval sent, guide to refresh for Herman',
    conditions: {
      approvalStage: 'sent',
      selectedEmailId: ['csr-approval-hold', 'csr-approval-cc'],
      emailsNotArrived: ['csr-forward-1'],
      hasNewMessages: true,
    },
    target: 'action:refresh',
  },

  {
    id: 'approval-to-herman',
    priority: 725,
    phase: 'Phase 2→3: After approval, guide to Herman if already loaded',
    conditions: {
      approvalStage: 'sent',
      selectedEmailId: ['csr-approval-hold', 'csr-approval-cc'],
      emailsArrived: ['csr-forward-1'],
    },
    target: 'email:csr-forward-1',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 3: HERMAN WORKFLOW
  // ═══════════════════════════════════════════════════════════
  {
    id: 'herman-email',
    priority: 700,
    phase: 'Phase 3: Guide to Herman\'s direct email',
    conditions: {
      reviewResolved: true,
      approvalStage: 'sent',
      forwardStage: 'pending',
      activeFolder: 'csr',
      emailsArrived: ['csr-forward-1'],
      selectedEmailIdNot: ['csr-forward-1', 'csr-herman-reply', 'csr-ai-1', 'csr-ai-2', 'csr-daily-summary', 'csr-rush-cc'],
    },
    target: 'email:csr-forward-1',
  },

  {
    id: 'herman-forward-button',
    priority: 690,
    phase: 'Phase 3: Guide to Forward button on Herman email',
    conditions: {
      selectedEmailId: 'csr-forward-1',
      forwardStage: 'pending',
    },
    target: 'action:forward',
  },

  {
    id: 'herman-send-button',
    priority: 680,
    phase: 'Phase 3: Guide to Send button when forwarding Herman\'s email',
    conditions: {
      reviewResolved: true,
      forwardStage: 'composing',
    },
    target: 'action:send',
  },

  {
    id: 'herman-reply-arrived',
    priority: 675,
    phase: 'Phase 3: When Herman reply arrives, guide to it immediately',
    conditions: {
      emailsArrived: ['csr-herman-reply'],
      emailsNotArrived: ['csr-rush-cc'],
      selectedEmailIdNot: ['csr-herman-reply'],
    },
    target: 'email:csr-herman-reply',
  },

  {
    id: 'herman-reply-email',
    priority: 670,
    phase: 'Phase 3: After Herman quote, guide to his reply',
    conditions: {
      forwardStage: 'quoted',
      emailsArrived: ['csr-herman-reply'],
      emailsNotArrived: ['csr-rush-cc'],
      selectedEmailIdNot: ['csr-herman-reply', 'csr-daily-summary', 'csr-rush-cc'],
    },
    target: 'email:csr-herman-reply',
  },

  {
    id: 'herman-to-rush-refresh',
    priority: 660,
    phase: 'Phase 3→4: After Herman reply, guide to refresh for rush re-quote',
    conditions: {
      selectedEmailId: 'csr-herman-reply',
      emailsNotArrived: ['csr-rush-cc'],
      hasNewMessages: true,
      isRefreshing: false,
    },
    target: 'action:refresh',
  },

  {
    id: 'herman-to-rush-cc',
    priority: 655,
    phase: 'Phase 3→4: After Herman reply, guide to rush CC if already loaded',
    conditions: {
      selectedEmailId: 'csr-herman-reply',
      emailsArrived: ['csr-rush-cc'],
    },
    target: 'email:csr-rush-cc',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 4: RUSH RE-QUOTE
  // ═══════════════════════════════════════════════════════════
  {
    id: 'rush-cc-email',
    priority: 620,
    phase: 'Phase 4: Guide to rush re-quote CC',
    conditions: {
      forwardStage: 'quoted',
      emailsArrived: ['csr-rush-cc'],
      selectedEmailIdNot: ['csr-rush-cc', 'csr-ai-1', 'csr-ai-2', 'csr-daily-summary'],
    },
    target: 'email:csr-rush-cc',
  },

  {
    id: 'rush-to-autoquotes-refresh',
    priority: 610,
    phase: 'Phase 4→5: After viewing rush CC, guide to refresh for auto-quotes',
    conditions: {
      selectedEmailId: 'csr-rush-cc',
      emailsNotArrived: ['csr-ai-1'],
      hasNewMessages: true,
      isRefreshing: false,
    },
    target: 'action:refresh',
  },

  {
    id: 'rush-to-first-autoquote',
    priority: 605,
    phase: 'Phase 4→5: After rush CC, guide to first auto-quote if already loaded',
    conditions: {
      selectedEmailId: 'csr-rush-cc',
      emailsArrived: ['csr-ai-1'],
    },
    target: 'email:csr-ai-1',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 5: AUTO-QUOTED EMAILS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'autoquote-1-email',
    priority: 550,
    phase: 'Phase 5: Guide to first auto-quote',
    conditions: {
      reviewResolved: true,
      forwardStage: 'quoted',
      activeFolder: 'csr',
      emailsArrived: ['csr-ai-1'],
      selectedEmailIdNot: ['csr-ai-1', 'csr-ai-2', 'csr-daily-summary'],
    },
    target: 'email:csr-ai-1',
  },

  {
    id: 'autoquote-2-email',
    priority: 540,
    phase: 'Phase 5: After viewing first auto-quote, guide to second',
    conditions: {
      selectedEmailId: 'csr-ai-1',
      emailsArrived: ['csr-ai-2'],
    },
    target: 'email:csr-ai-2',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 6: DAILY SUMMARY
  // ═══════════════════════════════════════════════════════════
  {
    id: 'daily-summary-refresh',
    priority: 530,
    phase: 'Phase 6: Guide to refresh for daily summary',
    conditions: {
      emailsNotArrived: ['csr-daily-summary'],
      hasNewMessages: true,
      isRefreshing: false,
      customCondition: (state) =>
        state.reviewResolved && state.selectedEmailId === 'csr-ai-2',
    },
    target: 'action:refresh',
  },

  {
    id: 'daily-summary-email',
    priority: 520,
    phase: 'Phase 6: Guide to daily summary email',
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
  const phases = ['Phase 0', 'Phase 1a', 'Phase 1b', 'Phase 1c', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6'];

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
