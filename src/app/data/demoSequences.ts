import type { DemoBatch } from './types';

export const DEMO_DEFAULTS: Record<string, DemoBatch[]> = {
  full: [
    { emailIds: ['eis-1', 'eis-1-response', 'csr-ai-1'] },
    { emailIds: ['eis-6', 'eis-6-response', 'csr-ai-2'] },
    { emailIds: ['eis-8-rush', 'eis-8-rush-response', 'csr-rush-cc', 'eis-9-qtybreak', 'eis-9-qtybreak-response', 'csr-ai-3'], fullOnly: true },
    { emailIds: ['csr-review-1'] },
    { emailIds: ['csr-approval-hold'] },
    { emailIds: ['csr-daily-summary'] },
  ],
  short: [
    { emailIds: ['eis-1', 'eis-1-response', 'csr-ai-1'] },
    { emailIds: ['eis-6', 'eis-6-response', 'csr-ai-2'] },
    { emailIds: ['csr-review-1'] },
    { emailIds: ['csr-approval-hold'] },
    { emailIds: ['csr-daily-summary'] },
  ],
};

const OVERRIDES_KEY = 'apex-demo-preset-overrides';

export function loadPresetOverrides(): Record<string, DemoBatch[]> {
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function savePresetOverride(presetId: string, batches: DemoBatch[]): void {
  const overrides = loadPresetOverrides();
  overrides[presetId] = batches;
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
}

export function resetPresetOverride(presetId: string): void {
  const overrides = loadPresetOverrides();
  delete overrides[presetId];
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
}

export function getPresetBatches(presetId: string): DemoBatch[] {
  const overrides = loadPresetOverrides();
  return overrides[presetId] ?? DEMO_DEFAULTS[presetId] ?? [];
}

export function isPresetCustomized(presetId: string): boolean {
  const overrides = loadPresetOverrides();
  return presetId in overrides;
}
