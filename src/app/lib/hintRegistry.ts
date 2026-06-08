/**
 * Workflow Hint Registry
 *
 * Declarative system for managing workflow indicators (yellow dots) throughout the demo.
 * Each HintRule defines when a hint should appear and what it should point to.
 *
 * Demo order: Pre-loaded auto-quotes → Needs Approval (review → approval) → Daily Summary
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
  activeFolder?: string;
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
  activeFolder: string;
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
  //  PHASE 1: PRE-LOADED AUTO-QUOTES — GUIDE THROUGH EACH CC
  //  All auto-quote CCs are visible on load. Guide the presenter
  //  through them in order based on read status.
  // ═══════════════════════════════════════════════════════════
  {
    id: 'view-adhesive-cc',
    priority: 1000,
    phase: 'Phase 1: Guide to adhesive auto-quote CC',
    conditions: {
      emailsArrived: ['csr-ai-1'],
      customCondition: (state) => !state.readIds.has('csr-ai-1'),
    },
    target: 'email:csr-ai-1',
  },

  {
    id: 'view-tapered-cc',
    priority: 950,
    phase: 'Phase 1: Guide to tapered reels auto-quote CC',
    conditions: {
      emailsArrived: ['csr-ai-2'],
      customCondition: (state) =>
        state.readIds.has('csr-ai-1') && !state.readIds.has('csr-ai-2'),
    },
    target: 'email:csr-ai-2',
  },

  {
    id: 'view-rush-cc',
    priority: 940,
    phase: 'Phase 1: Guide to rush auto-quote CC (full only)',
    conditions: {
      emailsArrived: ['csr-rush-cc'],
      customCondition: (state) =>
        state.readIds.has('csr-ai-2') && !state.readIds.has('csr-rush-cc'),
    },
    target: 'email:csr-rush-cc',
  },

  {
    id: 'view-qtybreak-cc',
    priority: 930,
    phase: 'Phase 1: Guide to qty-break auto-quote CC (full only)',
    conditions: {
      emailsArrived: ['csr-ai-3'],
      customCondition: (state) =>
        state.readIds.has('csr-rush-cc') && !state.readIds.has('csr-ai-3'),
    },
    target: 'email:csr-ai-3',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 2: TRANSITION TO NEEDS APPROVAL — REVIEW EMAIL
  //  After all auto-quotes are read, guide to review email.
  // ═══════════════════════════════════════════════════════════
  {
    id: 'autoquotes-done-to-review',
    priority: 920,
    phase: 'Phase 2: All auto-quotes read, guide to review email',
    conditions: {
      reviewResolved: false,
      reviewStage: 'pending',
      emailsArrived: ['csr-review-1'],
      selectedEmailIdNot: ['csr-review-1'],
      customCondition: (state) => {
        const required = ['csr-ai-1', 'csr-ai-2'];
        if (state.arrivedEmails.has('csr-rush-cc')) required.push('csr-rush-cc');
        if (state.arrivedEmails.has('csr-ai-3')) required.push('csr-ai-3');
        return required.every(id => state.readIds.has(id));
      },
    },
    target: 'email:csr-review-1',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 3A: REVIEW EMAIL — FORWARD TO STEVE
  // ═══════════════════════════════════════════════════════════
  {
    id: 'review-forward-button',
    priority: 850,
    phase: 'Phase 3a: Guide to Forward button on review email',
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
    phase: 'Phase 3a: Guide to Send button when composing review forward',
    conditions: {
      reviewResolved: false,
      reviewStage: 'composing',
      selectedEmailId: 'csr-review-1',
      emailsNotArrived: ['csr-steve-clarification'],
    },
    target: 'action:send',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 3B: STEVE'S CLARIFICATION — AUTO-PROCESSED
  // ═══════════════════════════════════════════════════════════
  {
    id: 'steve-clarification-email',
    priority: 870,
    phase: "Phase 3b: Guide to Steve's clarification email",
    conditions: {
      reviewResolved: false,
      emailsArrived: ['csr-steve-clarification'],
      selectedEmailIdNot: ['csr-steve-clarification'],
      customCondition: (state) => !state.readIds.has('csr-steve-clarification'),
    },
    target: 'email:csr-steve-clarification',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 3C: FINAL QUOTE GENERATED
  // ═══════════════════════════════════════════════════════════
  {
    id: 'stonite-final-email',
    priority: 800,
    phase: 'Phase 3c: Guide to final quote email in Auto-Quotes',
    conditions: {
      reviewForwardStage: 'quoted',
      reviewResolved: false,
      emailsArrived: ['csr-stonite-final-cc'],
      selectedEmailIdNot: ['csr-stonite-final-cc'],
    },
    target: 'email:csr-stonite-final-cc',
  },

  // ═══════════════════════════════════════════════════════════
  //  PHASE 4: APPROVAL HOLD WORKFLOW
  // ═══════════════════════════════════════════════════════════
  {
    id: 'approval-hold-email',
    priority: 750,
    phase: 'Phase 4: Guide to approval hold email',
    conditions: {
      reviewResolved: true,
      approvalStage: 'pending',
      emailsArrived: ['csr-approval-hold'],
      selectedEmailIdNot: ['csr-approval-hold'],
    },
    target: 'email:csr-approval-hold',
  },

  {
    id: 'approval-reply-button',
    priority: 740,
    phase: 'Phase 4: Guide to Reply button on approval hold',
    conditions: {
      approvalStage: 'pending',
      selectedEmailId: 'csr-approval-hold',
    },
    target: 'action:reply',
  },

  {
    id: 'approval-send-button',
    priority: 735,
    phase: 'Phase 4: Guide to Send button in approval reply',
    conditions: {
      approvalStage: 'composing',
      selectedEmailId: 'csr-approval-hold',
    },
    target: 'action:send',
  },

  {
    id: 'approval-to-daily-refresh',
    priority: 730,
    phase: 'Phase 4→5: After approval sent, refresh for daily summary',
    conditions: {
      approvalStage: 'sent',
      selectedEmailId: ['csr-approval-hold', 'csr-approval-cc'],
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
        activeFolder: state.activeFolder,
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

  const phases = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5'];

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
    console.error('Target Format Issues:', issues);
  } else {
    console.log('✓ All targets use valid formats');
  }
  console.groupEnd();
}
