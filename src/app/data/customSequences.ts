export interface CustomSequenceBatch {
  emailIds: string[];
  name?: string;
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

export type { AvailableEmail } from './emailRegistry';
export { getAvailableEmails } from './emailRegistry';
