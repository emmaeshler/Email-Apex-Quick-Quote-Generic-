import { WORKFLOWS } from '../data/workflows';
import type { WorkflowTrigger } from '../data/types';

interface TriggerContext {
  markEmailArrived: (id: string, batch: number) => void;
  setStage: (key: string, value: string) => void;
  currentBatch: number;
  onComplete?: () => void;
}

export function executeTriggers(
  workflowId: string,
  action: 'send' | 'approve',
  variant: 'reply' | 'forward' | null,
  ctx: TriggerContext,
): () => void {
  const wf = WORKFLOWS.find(w => w.id === workflowId);
  if (!wf?.triggers) return () => {};

  const triggers = wf.triggers.filter(t => {
    if (t.action !== action) return false;
    if (t.variant && t.variant !== variant) return false;
    if (!t.variant && variant && wf.type === 'review') return false;
    return true;
  });

  const timeoutIds: number[] = [];
  let cumulativeDelay = 0;

  for (let i = 0; i < triggers.length; i++) {
    const trigger = triggers[i];
    const delay = Array.isArray(trigger.delay)
      ? trigger.delay[0] + Math.random() * (trigger.delay[1] - trigger.delay[0])
      : trigger.delay;

    cumulativeDelay += delay;

    const isLast = i === triggers.length - 1;
    const tid = window.setTimeout(() => {
      for (const targetId of trigger.targetIds) {
        ctx.markEmailArrived(targetId, ctx.currentBatch);
      }
      if (trigger.stageTransition) {
        ctx.setStage(trigger.stageTransition.key, trigger.stageTransition.value);
      }
      if (isLast && ctx.onComplete) {
        ctx.onComplete();
      }
    }, cumulativeDelay);

    timeoutIds.push(tid);
  }

  return () => timeoutIds.forEach(clearTimeout);
}
