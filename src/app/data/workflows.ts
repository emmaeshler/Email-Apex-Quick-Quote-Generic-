import type { WorkflowDef } from './types';

export const WORKFLOWS: WorkflowDef[] = [
  {
    id: 'wf-adhesive',
    type: 'auto-quote',
    emailIds: ['eis-1', 'eis-1-response', 'csr-ai-1'],
  },
  {
    id: 'wf-tapered-reels',
    type: 'auto-quote',
    emailIds: ['eis-6', 'eis-6-response', 'csr-ai-2'],
  },
  {
    id: 'wf-northeast',
    type: 'auto-quote',
    emailIds: ['eis-10-northeast', 'eis-10-northeast-response', 'csr-ai-4'],
  },
  {
    id: 'wf-gulfcoast',
    type: 'auto-quote',
    emailIds: ['eis-11-gulfcoast', 'eis-11-gulfcoast-response', 'csr-ai-5'],
  },
  {
    id: 'wf-rush',
    type: 'auto-quote',
    emailIds: ['eis-8-rush', 'eis-8-rush-response', 'csr-rush-cc'],
  },
  {
    id: 'wf-qtybreak',
    type: 'auto-quote',
    emailIds: ['eis-9-qtybreak', 'eis-9-qtybreak-response', 'csr-ai-3'],
  },
  {
    id: 'wf-review-stonite',
    type: 'review',
    emailIds: ['eis-5', 'csr-review-1', 'csr-review-reply', 'csr-steve-clarification', 'eis-5-response', 'csr-stonite-final-cc'],
    stageKey: 'reviewStage',
    triggers: [
      // Reply path: Morgan provides details internally
      { action: 'send', variant: 'reply', targetIds: ['csr-review-reply'], delay: 500 },
      { action: 'send', variant: 'reply', targetIds: ['eis-5'], delay: 1000 },
      { action: 'send', variant: 'reply', targetIds: ['eis-5-response'], delay: [2000, 5000] },
      { action: 'send', variant: 'reply', targetIds: ['csr-stonite-final-cc'], delay: [700, 1500] },

      // Forward path: Morgan asks Steve for clarification
      { action: 'send', variant: 'forward', targetIds: ['csr-steve-clarification'], delay: [3000, 7000], stageTransition: { key: 'reviewForwardStage', value: 'processing' } },
      { action: 'send', variant: 'forward', targetIds: ['eis-5'], delay: 500 },
      { action: 'send', variant: 'forward', targetIds: ['eis-5-response', 'csr-stonite-final-cc'], delay: [2000, 5000], stageTransition: { key: 'reviewForwardStage', value: 'quoted' } },
    ],
  },
  {
    id: 'wf-approval-midwest',
    type: 'approval',
    emailIds: ['eis-7-midwest', 'csr-approval-hold', 'csr-approval-cc'],
    stageKey: 'approvalStage',
    triggers: [
      { action: 'approve', targetIds: ['csr-approval-cc', 'eis-7-midwest'], delay: 1500, stageTransition: { key: 'approvalStage', value: 'sent' } },
    ],
  },
  {
    id: 'wf-daily-summary',
    type: 'summary',
    emailIds: ['csr-daily-summary'],
  },
];

export function getWorkflowForEmail(emailId: string): WorkflowDef | undefined {
  return WORKFLOWS.find(wf => wf.emailIds.includes(emailId));
}
