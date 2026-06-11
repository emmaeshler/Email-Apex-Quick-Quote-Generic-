import type { EmailEntry, EmailCategory } from './types';
import type { Email } from './emails';
import { WORKFLOWS } from './workflows';
import {
  eis1Jawinder, eis1Response, csr1CC,
  eis6Dave, eis6Response, csr2CC,
  eis5Stonite, eisStoniteResponse, csrReview1, csrSteveClarification, csrReviewReplyEmail, csrStoniteFinalCc,
  eis7MidwestPower, csrApprovalHold, csrApprovalSentCc,
  eis10NortheastRequest, eis10NortheastResponse, csr4NortheastCc,
  eis11GulfCoastRequest, eis11GulfCoastResponse, csr5GulfCoastCc,
  eis8Rush, eis8RushResponse, csr3RushCc,
  eis9QtyBreak, eis9QtyBreakResponse, csrQtyBreakCc,
  csrDailySummary,
} from './emails';

const entries: [string, EmailEntry][] = [
  // ── Adhesive (simple auto-quote) ──
  ['eis-1',          { email: eis1Jawinder,     folder: 'eis', category: null,             sortPriority: 10,  workflowId: 'wf-adhesive',       role: 'request' }],
  ['eis-1-response', { email: eis1Response,     folder: 'eis', category: 'Simple Quote',   sortPriority: 11,  workflowId: 'wf-adhesive',       role: 'response' }],
  ['csr-ai-1',       { email: csr1CC,           folder: 'csr', category: 'Simple Quote',   sortPriority: 114, workflowId: 'wf-adhesive',       role: 'cc' }],

  // ── Tapered Reels (product variation auto-quote) ──
  ['eis-6',          { email: eis6Dave,         folder: 'eis', category: null,              sortPriority: 20,  workflowId: 'wf-tapered-reels',  role: 'request' }],
  ['eis-6-response', { email: eis6Response,     folder: 'eis', category: 'Product Variants', sortPriority: 21, workflowId: 'wf-tapered-reels', role: 'response' }],
  ['csr-ai-2',       { email: csr2CC,           folder: 'csr', category: 'Product Variants', sortPriority: 115, workflowId: 'wf-tapered-reels', role: 'cc' }],

  // ── Northeast Motor (customer-specific pricing) ──
  ['eis-10-northeast',          { email: eis10NortheastRequest,  folder: 'eis', category: null,                      sortPriority: 30,  workflowId: 'wf-northeast', role: 'request' }],
  ['eis-10-northeast-response', { email: eis10NortheastResponse, folder: 'eis', category: 'Client-Specific Pricing', sortPriority: 31,  workflowId: 'wf-northeast', role: 'response' }],
  ['csr-ai-4',                  { email: csr4NortheastCc,        folder: 'csr', category: 'Client-Specific Pricing', sortPriority: 117, workflowId: 'wf-northeast', role: 'cc' }],

  // ── Gulf Coast (customer-specific pricing) ──
  ['eis-11-gulfcoast',          { email: eis11GulfCoastRequest,  folder: 'eis', category: null,                      sortPriority: 40,  workflowId: 'wf-gulfcoast', role: 'request' }],
  ['eis-11-gulfcoast-response', { email: eis11GulfCoastResponse, folder: 'eis', category: 'Client-Specific Pricing', sortPriority: 41,  workflowId: 'wf-gulfcoast', role: 'response' }],
  ['csr-ai-5',                  { email: csr5GulfCoastCc,        folder: 'csr', category: 'Client-Specific Pricing', sortPriority: 118, workflowId: 'wf-gulfcoast', role: 'cc' }],

  // ── Rush Re-Quote ──
  ['eis-8-rush',          { email: eis8Rush,         folder: 'eis', category: null,            sortPriority: 50,  workflowId: 'wf-rush', role: 'request' }],
  ['eis-8-rush-response', { email: eis8RushResponse, folder: 'eis', category: 'Rush Re-Quote', sortPriority: 51,  workflowId: 'wf-rush', role: 'response' }],
  ['csr-rush-cc',         { email: csr3RushCc,       folder: 'csr', category: 'Rush Re-Quote', sortPriority: 105, workflowId: 'wf-rush', role: 'cc' }],

  // ── Qty-Break / Volume Pricing ──
  ['eis-9-qtybreak',          { email: eis9QtyBreak,         folder: 'eis', category: null,              sortPriority: 60,  workflowId: 'wf-qtybreak', role: 'request' }],
  ['eis-9-qtybreak-response', { email: eis9QtyBreakResponse, folder: 'eis', category: 'Volume Pricing', sortPriority: 61,  workflowId: 'wf-qtybreak', role: 'response' }],
  ['csr-ai-3',                { email: csrQtyBreakCc,        folder: 'csr', category: 'Volume Pricing', sortPriority: 116, workflowId: 'wf-qtybreak', role: 'cc' }],

  // ── Review (Stonite magnet wire) ──
  ['eis-5',                   { email: eis5Stonite,          folder: 'eis', category: null,                  sortPriority: 70,  workflowId: 'wf-review-stonite', role: 'request' }],
  ['eis-5-response',          { email: eisStoniteResponse,   folder: 'eis', category: 'Resolved Quote',     sortPriority: 71,  workflowId: 'wf-review-stonite', role: 'response' }],
  ['csr-review-1',            { email: csrReview1,           folder: 'csr', category: 'Needs Clarification', sortPriority: 55, workflowId: 'wf-review-stonite', role: 'review-flag' }],
  ['csr-review-reply',        { email: csrReviewReplyEmail,  folder: 'csr', category: null,                  sortPriority: 60,  workflowId: 'wf-review-stonite', role: 'review-reply' }],
  ['csr-steve-clarification', { email: csrSteveClarification, folder: 'csr', category: 'Needs Clarification', sortPriority: 65,  workflowId: 'wf-review-stonite', role: 'clarification' }],
  ['csr-stonite-final-cc',    { email: csrStoniteFinalCc,    folder: 'csr', category: 'Needs Clarification', sortPriority: 70,  workflowId: 'wf-review-stonite', role: 'cc' }],

  // ── Approval (Midwest Power motor rewind) ──
  ['eis-7-midwest',      { email: eis7MidwestPower,  folder: 'eis', category: null,                 sortPriority: 80,  workflowId: 'wf-approval-midwest', role: 'request' }],
  ['csr-approval-hold',  { email: csrApprovalHold,   folder: 'csr', category: 'Approval Threshold', sortPriority: 75,  workflowId: 'wf-approval-midwest', role: 'approval-hold' }],
  ['csr-approval-cc',    { email: csrApprovalSentCc,  folder: 'csr', category: 'Approval Threshold', sortPriority: 80, workflowId: 'wf-approval-midwest', role: 'approval-cc' }],

  // ── Daily Summary ──
  ['csr-daily-summary',  { email: csrDailySummary,   folder: 'csr', category: 'Daily Summary',      sortPriority: 120, workflowId: 'wf-daily-summary',    role: 'summary' }],
];

export const EMAIL_REGISTRY: Map<string, EmailEntry> = new Map(entries);

export function getEntry(id: string): EmailEntry | undefined {
  return EMAIL_REGISTRY.get(id);
}

export function getEmailCategory(id: string): EmailCategory {
  return EMAIL_REGISTRY.get(id)?.category ?? null;
}

export interface AvailableEmail {
  id: string;
  label: string;
  subject: string;
  from: string;
  folder: 'csr' | 'eis';
  typeChip?: string;
  role?: string;
  workflowType?: string;
}

export function getAvailableEmails(): AvailableEmail[] {
  return [...EMAIL_REGISTRY.entries()].map(([id, entry]) => ({
    id,
    label: deriveLabel(id, entry),
    subject: entry.email.subject,
    from: entry.email.from,
    folder: entry.folder,
    typeChip: entry.category ?? undefined,
    role: entry.role,
    workflowType: WORKFLOWS.find(wf => wf.id === entry.workflowId)?.type,
  }));
}

export interface EmailBundle {
  bundleId: string;
  label: string;
  emailIds: string[];
  emails: AvailableEmail[];
  typeChip?: string;
}

export type PaletteItem =
  | { kind: 'single'; email: AvailableEmail }
  | { kind: 'bundle'; bundle: EmailBundle };

export function getPaletteItems(): PaletteItem[] {
  const byWorkflow = new Map<string, { ids: string[]; entries: [string, EmailEntry][] }>();
  for (const [id, entry] of EMAIL_REGISTRY.entries()) {
    let group = byWorkflow.get(entry.workflowId);
    if (!group) {
      group = { ids: [], entries: [] };
      byWorkflow.set(entry.workflowId, group);
    }
    group.ids.push(id);
    group.entries.push([id, entry]);
  }

  const allEmails = getAvailableEmails();
  const emailMap = new Map(allEmails.map(e => [e.id, e]));
  const items: PaletteItem[] = [];

  for (const [wfId, group] of byWorkflow) {
    if (group.ids.length <= 1) {
      for (const id of group.ids) {
        const email = emailMap.get(id);
        if (email) items.push({ kind: 'single', email });
      }
    } else {
      const category = group.entries.find(([, e]) => e.category)?.[1].category;
      const label = category ?? wfId.replace('wf-', '').replace(/-/g, ' ');
      items.push({
        kind: 'bundle',
        bundle: {
          bundleId: wfId,
          label,
          emailIds: group.ids,
          emails: group.ids.map(id => emailMap.get(id)!).filter(Boolean),
          typeChip: category ?? undefined,
        },
      });
    }
  }

  return items;
}

export function getBundleForEmail(emailId: string): EmailBundle | null {
  const entry = EMAIL_REGISTRY.get(emailId);
  if (!entry) return null;
  const items = getPaletteItems();
  for (const item of items) {
    if (item.kind === 'bundle' && item.bundle.emailIds.includes(emailId)) {
      return item.bundle;
    }
  }
  return null;
}

export type BatchDisplayItem =
  | { kind: 'single'; email: AvailableEmail; startIndex: number }
  | { kind: 'bundle'; bundle: EmailBundle; startIndex: number; count: number };

export function groupBatchItems(emailIds: string[]): BatchDisplayItem[] {
  const allEmails = getAvailableEmails();
  const emailMap = new Map(allEmails.map(e => [e.id, e]));
  const items: BatchDisplayItem[] = [];
  let i = 0;

  while (i < emailIds.length) {
    const id = emailIds[i];
    const entry = EMAIL_REGISTRY.get(id);
    if (!entry) { i++; continue; }

    const wfId = entry.workflowId;
    const allWfIds = [...EMAIL_REGISTRY.entries()]
      .filter(([, e]) => e.workflowId === wfId)
      .map(([eid]) => eid);

    if (allWfIds.length > 1) {
      let count = 0;
      const bundleEmailIds: string[] = [];
      while (i + count < emailIds.length) {
        const nextId = emailIds[i + count];
        if (allWfIds.includes(nextId)) {
          bundleEmailIds.push(nextId);
          count++;
        } else {
          break;
        }
      }

      if (count > 1) {
        const category = [...EMAIL_REGISTRY.entries()]
          .find(([, e]) => e.workflowId === wfId && e.category)?.[1].category;
        const label = category ?? wfId.replace('wf-', '').replace(/-/g, ' ');
        items.push({
          kind: 'bundle',
          bundle: {
            bundleId: wfId,
            label,
            emailIds: bundleEmailIds,
            emails: bundleEmailIds.map(eid => emailMap.get(eid)!).filter(Boolean),
            typeChip: category ?? undefined,
          },
          startIndex: i,
          count,
        });
        i += count;
        continue;
      }
    }

    const email = emailMap.get(id);
    if (email) items.push({ kind: 'single', email, startIndex: i });
    i++;
  }

  return items;
}

function deriveLabel(id: string, entry: EmailEntry): string {
  const e = entry.email;
  const customerName = e.originalSender?.split(' (')[0];
  if (entry.role === 'cc') return `CC to CSR Inbox — ${customerName || e.subject}`;
  if (entry.role === 'approval-cc') return 'CC to CSR — Approval Sent';
  if (entry.role === 'review-flag') return `Flagged for Review — ${e.subject.replace('Review Needed: ', '')}`;
  if (entry.role === 'approval-hold') return `Held for Approval — ${e.subject.replace('Approval Required: ', '')}`;
  if (entry.role === 'summary') return 'Daily Summary';
  if (entry.role === 'clarification') return `${e.from} — Clarification Reply`;
  if (entry.role === 'review-reply') return `${e.from} — CSR Review Reply`;
  if (entry.role === 'response') return `Quote Sent to ${e.to.split('@')[0]}`;
  if (entry.role === 'request') return `${e.from} — Quote Request`;
  return `${e.from} — ${e.subject}`;
}
