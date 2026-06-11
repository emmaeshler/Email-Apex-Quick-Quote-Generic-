import { EMAIL_REGISTRY } from './emailRegistry';
import type { Email } from './emails';
import type { FolderType, EmailEntry } from './types';

interface VisibilityContext {
  approvalStage?: string;
  readIds?: Set<string>;
}

export function computeVisibleEmails(
  folder: FolderType,
  arrivedEmails: Set<string>,
  ctx?: VisibilityContext,
): Email[] {
  const entries: EmailEntry[] = [];

  for (const [id, entry] of EMAIL_REGISTRY) {
    if (entry.folder !== folder) continue;

    // Stonite final CC only visible after reading the clarification or review reply
    if (id === 'csr-stonite-final-cc' && ctx?.readIds) {
      if (!ctx.readIds.has('csr-steve-clarification') && !ctx.readIds.has('csr-review-reply')) {
        if (!arrivedEmails.has(id)) continue;
        // Even if arrived, gate on having read the prerequisite
        if (!ctx.readIds.has('csr-steve-clarification') && !ctx.readIds.has('csr-review-reply')) continue;
      }
    }

    // Approval CC is stage-driven, not arrival-driven
    if (id === 'csr-approval-cc') {
      if (ctx?.approvalStage === 'sent') {
        entries.push(entry);
      }
      continue;
    }

    if (!arrivedEmails.has(id)) continue;
    entries.push(entry);
  }

  return entries
    .sort((a, b) => b.sortPriority - a.sortPriority)
    .map(e => e.email);
}
