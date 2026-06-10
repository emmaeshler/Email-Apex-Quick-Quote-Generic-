export interface CustomSequenceBatch {
  emailIds: string[];
}

export interface CustomSequence {
  id: string;
  name: string;
  batches: CustomSequenceBatch[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'apex-demo-custom-sequences';

export function loadCustomSequences(): CustomSequence[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomSequences(sequences: CustomSequence[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sequences));
}

export function addCustomSequence(seq: CustomSequence): void {
  const all = loadCustomSequences();
  const idx = all.findIndex(s => s.id === seq.id);
  if (idx >= 0) {
    all[idx] = seq;
  } else {
    all.push(seq);
  }
  saveCustomSequences(all);
}

export function deleteCustomSequence(id: string): void {
  saveCustomSequences(loadCustomSequences().filter(s => s.id !== id));
}

export interface AvailableEmail {
  id: string;
  label: string;
  subject: string;
  from: string;
  folder: 'csr' | 'eis';
  typeChip?: string;
}

export const AVAILABLE_EMAILS: AvailableEmail[] = [
  { id: 'eis-1', label: 'Adhesive Request', subject: 'Adhesive & Activator Pricing', from: 'Jawinder Singh', folder: 'eis' },
  { id: 'eis-1-response', label: 'Adhesive Quote', subject: 're: Adhesive & Activator Pricing', from: 'Apex Quoting', folder: 'eis', typeChip: 'Simple Quote' },
  { id: 'csr-ai-1', label: 'CC — Adhesive Quote', subject: 're: Adhesive & Activator Pricing', from: 'Apex Quoting', folder: 'csr', typeChip: 'Simple Quote' },

  { id: 'eis-6', label: 'Tapered Reels Request', subject: 'Tapered Reel & Spool Packaging', from: 'Dave Rosenberg', folder: 'eis' },
  { id: 'eis-6-response', label: 'Tapered Reels Quote', subject: 'Re: Tapered Reel & Spool Packaging', from: 'Apex Quoting', folder: 'eis', typeChip: 'Product Variation' },
  { id: 'csr-ai-2', label: 'CC — Tapered Reels', subject: 'Re: Tapered Reel & Spool Packaging', from: 'Apex Quoting', folder: 'csr', typeChip: 'Product Variation' },

  { id: 'eis-10-northeast', label: 'Northeast Motor Request', subject: 'Adhesive & Activator Pricing', from: 'Northeast Motor Co', folder: 'eis' },
  { id: 'eis-10-northeast-response', label: 'Northeast Motor Quote', subject: 're: Adhesive & Activator Pricing', from: 'Apex Quoting', folder: 'eis', typeChip: 'Customer Pricing' },
  { id: 'csr-ai-4', label: 'CC — Northeast Motor', subject: 're: Adhesive & Activator Pricing', from: 'Apex Quoting', folder: 'csr', typeChip: 'Customer Pricing' },

  { id: 'eis-11-gulfcoast', label: 'Gulf Coast Request', subject: 'Adhesive & Activator Pricing', from: 'Gulf Coast Electric', folder: 'eis' },
  { id: 'eis-11-gulfcoast-response', label: 'Gulf Coast Quote', subject: 're: Adhesive & Activator Pricing', from: 'Apex Quoting', folder: 'eis', typeChip: 'Customer Pricing' },
  { id: 'csr-ai-5', label: 'CC — Gulf Coast', subject: 're: Adhesive & Activator Pricing', from: 'Apex Quoting', folder: 'csr', typeChip: 'Customer Pricing' },

  { id: 'eis-8-rush', label: 'Rush Re-quote Request', subject: 'URGENT: Adhesive Re-quote', from: 'Jawinder Singh', folder: 'eis' },
  { id: 'eis-8-rush-response', label: 'Rush Re-quote Response', subject: 'URGENT: Adhesive Re-quote', from: 'Apex Quoting', folder: 'eis', typeChip: 'Rush Re-Quote' },
  { id: 'csr-rush-cc', label: 'CC — Rush Re-quote', subject: 'URGENT: Adhesive Re-quote', from: 'Apex Quoting', folder: 'csr', typeChip: 'Rush Re-Quote' },

  { id: 'eis-9-qtybreak', label: 'Qty Break Request', subject: 'Adhesive Volume Pricing', from: 'Jawinder Singh', folder: 'eis' },
  { id: 'eis-9-qtybreak-response', label: 'Qty Break Quote', subject: 'Adhesive Volume Pricing', from: 'Apex Quoting', folder: 'eis', typeChip: 'Volume Pricing' },
  { id: 'csr-ai-3', label: 'CC — Qty Break', subject: 'Adhesive Volume Pricing', from: 'Apex Quoting', folder: 'csr', typeChip: 'Volume Pricing' },

  { id: 'eis-5', label: 'Stonite Coil Request', subject: 'Magnet Wire Pricing — HPL & SDPZ', from: 'Steve Landers', folder: 'eis' },
  { id: 'eis-7-midwest', label: 'Midwest Power Request', subject: 'Motor Rewind Quote', from: 'Tom Brennan', folder: 'eis' },

  { id: 'csr-review-1', label: 'Review — Magnet Wire', subject: 'Review Needed: Magnet Wire Pricing', from: 'Apex Quoting', folder: 'csr', typeChip: 'Needs Clarification' },
  { id: 'csr-approval-hold', label: 'Approval — Motor Rewind', subject: 'Approval Required: Motor Rewind Quote', from: 'Apex Quoting', folder: 'csr', typeChip: 'Approval Threshold' },
  { id: 'csr-daily-summary', label: 'Daily Summary', subject: 'Apex Quoting — Daily Summary', from: 'Apex Quoting', folder: 'csr', typeChip: 'Daily Summary' },
];
