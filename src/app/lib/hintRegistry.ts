/**
 * Workflow Hint Registry
 *
 * Declarative system for managing workflow indicators (yellow dots) throughout the demo.
 * Each HintRule defines when a hint should appear and what it should point to.
 *
 * Demo order: Auto-quotes → (Rush+QtyBreak in long) → Review → Approval → Daily Summary
 */

/* ── Types ── */

export type HintTarget = `email:${string}` | `action:${string}` | null;

export interface HintConditions {
  emailsArrived?: string[];
  emailsNotArrived?: string[];
  reviewResolved?: boolean;
  reviewStage?: 'pending' | 'composing' | 'sending' | 'resolved';
  reviewForwardStage?: 'pending' | 'composing' | 'sent' | 'processing' | 'quoted';
  forwardStage?: 'pending' | 'composing' | 'sent' | 'processing' | 'quoted';
  approvalStage?: 'pending' | 'composing' | 'approved' | 'sent';
  activeFolder?: 'csr' | 'eis' | 'review';
  selectedEmailId?: string | string[];
  selectedEmailIdNot?: string[];
  hasNewMessages?: boolean;
  isRefreshing?: boolean;
  customCondition?: (state: WorkflowState) => boolean;
}

export interface HintRule {
  id: string;
  priority: number;
  phase: string;
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
    phase: 'Phase 0: Guide to first refresh',
    conditions: {
      customCondition: (state) => state.nextBatchIndex === 0,
    },
    target: 'action:refresh',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 1: SIMPLE AUTO-QUOTE (adhesive — CSR CC)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'autoquote-cc-email',
    priority: 950,
    phase: 'Phase 1: Guide to adhesive auto-quote CC email',
    conditions: {
      emailsArrived: ['csr-ai-1'],
      selectedEmailIdNot: ['csr-ai-1'],
      emailsNotArrived: ['eis-6-response'],
    },
    target: 'email:csr-ai-1',
  },

  {
    id: 'autoquote-to-tapered-refresh',
    priority: 940,
    phase: 'Phase 1→2: After viewing adhesive CC, refresh for tapered reels',
    conditions: {
      emailsArrived: ['csr-ai-1'],
      selectedEmailId: 'csr-ai-1',
      emailsNotArrived: ['eis-6-response'],
      hasNewMessages: true,
    },
    target: 'action:refresh',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 2: MULTI-PRODUCT AUTO-QUOTE (tapered reels + CC)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'tapered-reels-cc-email',
    priority: 935,
    phase: 'Phase 2: Guide to tapered reels CC email',
    conditions: {
      emailsArrived: ['csr-ai-2'],
      selectedEmailIdNot: ['csr-ai-2'],
      emailsNotArrived: ['csr-review-1', 'csr-rush-cc'],
    },
    target: 'email:csr-ai-2',
  },

  {
    id: 'tapered-reels-to-next-refresh',
    priority: 930,
    phase: 'Phase 2→3: After viewing tapered reels CC, refresh for next batch',
    conditions: {
      emailsArrived: ['csr-ai-2'],
      selectedEmailId: 'csr-ai-2',
      emailsNotArrived: ['csr-review-1', 'csr-rush-cc'],
      hasNewMessages: true,
    },
    target: 'action:refresh',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 3: RUSH + QTY-BREAK (long demo only)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'rush-cc-email',
    priority: 920,
    phase: 'Phase 3: Guide to rush re-quote CC',
    conditions: {
      emailsArrived: ['csr-rush-cc'],
      selectedEmailIdNot: ['csr-rush-cc'],
      emailsNotArrived: ['csr-review-1'],
    },
    target: 'email:csr-rush-cc',
  },

  {
    id: 'rush-to-qtybreak',
    priority: 915,
    phase: 'Phase 3: After viewing rush CC, guide to qty-break CC',
    conditions: {
      emailsArrived: ['csr-rush-cc', 'csr-ai-3'],
      selectedEmailId: 'csr-rush-cc',
      selectedEmailIdNot: ['csr-ai-3'],
      emailsNotArrived: ['csr-review-1'],
    },
    target: 'email:csr-ai-3',
  },

  {
    id: 'qtybreak-cc-email',
    priority: 910,
    phase: 'Phase 3: Guide to qty-break CC email',
    conditions: {
      emailsArrived: ['csr-ai-3'],
      selectedEmailIdNot: ['csr-ai-3', 'csr-rush-cc'],
      emailsNotArrived: ['csr-review-1'],
    },
    target: 'email:csr-ai-3',
  },

  {
    id: 'qtybreak-to-review-refresh',
    priority: 905,
    phase: 'Phase 3→4: After viewing rush/qty-break, refresh for review',
    conditions: {
      emailsArrived: ['csr-ai-3'],
      selectedEmailId: 'csr-ai-3',
      emailsNotArrived: ['csr-review-1'],
      hasNewMessages: true,
    },
    target: 'action:refresh',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 4A: REVIEW EMAIL — FORWARD TO STEVE
  // ═══════════════════════════════════════════════════════════
  {
    id: 'review-email-unopened',
    priority: 900,
    phase: 'Phase 4a: Guide to review email',
    conditions: {
      reviewResolved: false,
      reviewStage: 'pending',
      activeFolder: 'csr',
      emailsArrived: ['csr-review-1'],
      emailsNotArrived: ['csr-steve-clarification'],
      selectedEmailIdNot: ['csr-review-1'],
    },
    target: 'email:csr-review-1',
  },

  {
    id: 'review-forward-button',
    priority: 850,
    phase: 'Phase 4a: Guide to Forward button on review email',
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
    phase: 'Phase 4a: Guide to Send button when composing review forward',
    conditions: {
      reviewResolved: false,
      reviewStage: 'composing',
      selectedEmailId: 'csr-review-1',
      emailsNotArrived: ['csr-steve-clarification'],
    },
    target: 'action:send',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 4B: STEVE'S CLARIFICATION — AUTO-PROCESSED
  // ═══════════════════════════════════════════════════════════
  {
    id: 'steve-clarification-email',
    priority: 870,
    phase: 'Phase 4b: Guide to Steve\'s clarification email',
    conditions: {
      reviewResolved: false,
      emailsArrived: ['csr-steve-clarification'],
      selectedEmailIdNot: ['csr-steve-clarification'],
      customCondition: (state) => !state.readIds.has('csr-steve-clarification'),
    },
    target: 'email:csr-steve-clarification',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 4C: FINAL QUOTE GENERATED
  // ═══════════════════════════════════════════════════════════
  {
    id: 'stonite-final-email',
    priority: 800,
    phase: 'Phase 4c: Guide to final quote email',
    conditions: {
      reviewForwardStage: 'quoted',
      reviewResolved: false,
      emailsArrived: ['csr-stonite-final-cc'],
      selectedEmailIdNot: ['csr-stonite-final-cc'],
    },
    target: 'email:csr-stonite-final-cc',
  },

  {
    id: 'stonite-transition-refresh',
    priority: 790,
    phase: 'Phase 4c→5: After viewing quote, refresh for approval hold',
    conditions: {
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
    phase: 'Phase 4c→5: Guide to approval hold if already loaded',
    conditions: {
      selectedEmailId: 'csr-stonite-final-cc',
      emailsArrived: ['csr-approval-hold'],
    },
    target: 'email:csr-approval-hold',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 5: APPROVAL HOLD WORKFLOW
  // ═══════════════════════════════════════════════════════════
  {
    id: 'approval-hold-email',
    priority: 750,
    phase: 'Phase 5: Guide to approval hold email',
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
    phase: 'Phase 5: Guide to Reply button on approval hold',
    conditions: {
      approvalStage: 'pending',
      selectedEmailId: 'csr-approval-hold',
    },
    target: 'action:reply',
  },

  {
    id: 'approval-send-button',
    priority: 735,
    phase: 'Phase 5: Guide to Send button in approval reply',
    conditions: {
      approvalStage: 'composing',
      selectedEmailId: 'csr-approval-hold',
    },
    target: 'action:send',
  },

  {
    id: 'approval-to-daily-refresh',
    priority: 730,
    phase: 'Phase 5→6: After approval sent, refresh for daily summary',
    conditions: {
      approvalStage: 'sent',
      selectedEmailId: ['csr-approval-hold', 'csr-approval-cc'],
      emailsNotArrived: ['csr-daily-summary'],
      hasNewMessages: true,
    },
    target: 'action:refresh',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 6: DAILY SUMMARY
  // ═══════════════════════════════════════════════════════════
  {
    id: 'daily-summary-refresh',
    priority: 530,
    phase: 'Phase 6: Guide to refresh for daily summary',
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
    phase: 'Phase 6: Guide to daily summary email',
    conditions: {
      emailsArrived: ['csr-daily-summary'],
      selectedEmailIdNot: ['csr-daily-summary'],
    },
    target: 'email:csr-daily-summary',
  },
];

/* ── Evaluation Functions ── */

function evaluateConditions(conditions: HintConditions, state: WorkflowState): boolean {
  if (conditions.emailsArrived) {
    if (!conditions.emailsArrived.every(id => state.arrivedEmails.has(id))) return false;
  }
  if (conditions.emailsNotArrived) {
    if (conditions.emailsNotArrived.some(id => state.arrivedEmails.has(id))) return false;
  }

  if (conditions.reviewResolved !== undefined && conditions.reviewResolved !== state.reviewResolved) return false;
  if (conditions.reviewStage !== undefined && conditions.reviewStage !== state.reviewStage) return false;
  if (conditions.reviewForwardStage !== undefined && conditions.reviewForwardStage !== state.reviewForwardStage) return false;
  if (conditions.forwardStage !== undefined && conditions.forwardStage !== state.forwardStage) return false;
  if (conditions.approvalStage !== undefined && conditions.approvalStage !== state.approvalStage) return false;
  if (conditions.activeFolder !== undefined && conditions.activeFolder !== state.activeFolder) return false;
  if (conditions.hasNewMessages !== undefined && conditions.hasNewMessages !== state.hasNewMessages) return false;
  if (conditions.isRefreshing !== undefined && conditions.isRefreshing !== state.isRefreshing) return false;

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

  if (conditions.customCondition && !conditions.customCondition(state)) return false;

  return true;
}

export function selectHint(state: WorkflowState): HintTarget {
  if (!state.demoVisible) return null;

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

  matches.sort((a, b) => b.priority - a.priority);

  if (import.meta.env.DEV) {
    console.log(`[Hint System] Selected: ${matches[0].id} (${matches[0].phase}) from ${matches.length} matches`);
  }

  return matches[0].target;
}

export function validateHintCoverage(): void {
  if (!import.meta.env.DEV) return;

  const validTargetPatterns = [
    /^action:(refresh|forward|send|reply)$/,
    /^email:[\w-]+$/,
    /^folder:[\w-]+$/,
  ];

  const phases = ['Phase 0', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6'];

  console.group('[Hint Coverage Validation]');
  phases.forEach(phase => {
    const phaseRules = hintRules.filter(r => r.phase.startsWith(phase));
    const status = phaseRules.length > 0 ? '✓' : '⚠';
    console.log(`${status} ${phase}: ${phaseRules.length} rules`);
  });

  const issues: string[] = [];
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
