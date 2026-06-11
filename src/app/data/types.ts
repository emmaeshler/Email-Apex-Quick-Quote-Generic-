import type { Email } from './emails';

export type FolderType = 'csr' | 'eis';

export type EmailCategory =
  | 'Simple Quote'
  | 'Product Variants'
  | 'Client-Specific Pricing'
  | 'Rush Re-Quote'
  | 'Volume Pricing'
  | 'Needs Clarification'
  | 'Customer Response'
  | 'Resolved Quote'
  | 'Approval Threshold'
  | 'Daily Summary'
  | 'Quote Request'
  | null;

export type EmailRole =
  | 'request'
  | 'response'
  | 'cc'
  | 'review-flag'
  | 'clarification'
  | 'review-reply'
  | 'approval-hold'
  | 'approval-cc'
  | 'summary';

export interface EmailEntry {
  email: Email;
  folder: FolderType;
  category: EmailCategory;
  sortPriority: number;
  workflowId: string;
  role: EmailRole;
}

export interface WorkflowTrigger {
  action: 'send' | 'approve';
  variant?: 'reply' | 'forward';
  targetIds: string[];
  delay: [number, number] | number;
  stageTransition?: { key: string; value: string };
}

export interface WorkflowDef {
  id: string;
  type: 'auto-quote' | 'review' | 'approval' | 'summary';
  emailIds: string[];
  triggers?: WorkflowTrigger[];
  stageKey?: string;
}

export interface DemoBatch {
  emailIds: string[];
  fullOnly?: boolean;
}
