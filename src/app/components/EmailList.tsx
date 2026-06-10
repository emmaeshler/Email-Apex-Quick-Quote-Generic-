'use client';

import { Zap, ChevronsLeft, ChevronsRight, Flag, Trash2, RefreshCw, Loader2, ChevronDown, ChevronRight, ChevronLeft, Inbox } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { DemoDot } from './DemoGuide';
import { getAvatarColor, getInitials } from '../lib/avatarUtils';

interface Email {
  id: string;
  from: string;
  fromEmail?: string;
  subject: string;
  preview: string;
  date: string;
  time: string;
  read: boolean;
  quoteStatus?: 'processing' | 'quoted' | 'review';
  isCcFromAi?: boolean;
  isReviewRequest?: boolean;
  isDirectQuoteRequest?: boolean;
  isApprovalHold?: boolean;
  inlineQuoteTable?: { isRushOrder?: boolean; isQtyBreakComparison?: boolean };
  isCcFromAiQuoteTable?: { isRushOrder?: boolean; isQtyBreakComparison?: boolean };
}

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  onSelectEmail: (id: string) => void;
  onDeleteEmail?: (id: string) => void;
  folderType?: 'csr' | 'eis' | 'review';
  folderLabel?: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  reviewResolved?: boolean;
  forwardStage?: 'pending' | 'composing' | 'sent' | 'processing' | 'quoted';
  approvalStage?: 'pending' | 'composing' | 'approved' | 'sent';
  hintTarget?: string | null;
  scrollTrigger?: number;
  newEmailIds?: Set<string>;
  hasNewMessages?: boolean;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  emailBatchMap?: Map<string, number>;
  currentBatch?: number;
  onBack?: () => void;
  canGoBack?: boolean;
}

/* Outlook-style category tag */
function CategoryTag({ label, color }: { label: string; color: string }) {
  const colors: Record<string, string> = {
    orange: 'bg-secondary text-secondary-foreground',
    blue: 'bg-accent text-accent-foreground',
    green: 'bg-chart-3 text-primary-foreground',
    grey: 'bg-muted text-muted-foreground',
  };
  return (
    <span className={`inline-block px-1.5 py-px font-w-medium ${colors[color] || colors.blue}`} style={{ fontSize: '10px', lineHeight: '16px' }}>
      {label}
    </span>
  );
}

function getTypeChip(email: Email): string | null {
  if (email.id === 'csr-daily-summary') return 'Daily Summary';
  if (email.isCcFromAiQuoteTable?.isRushOrder || email.inlineQuoteTable?.isRushOrder) return 'Rush Re-Quote';
  if (email.isCcFromAiQuoteTable?.isQtyBreakComparison || email.inlineQuoteTable?.isQtyBreakComparison) return 'Volume Pricing';
  if (email.id === 'csr-ai-4' || email.id === 'csr-ai-5' || email.id === 'eis-10-northeast-response' || email.id === 'eis-11-gulfcoast-response') return 'Client-Specific Pricing';
  if (email.isApprovalHold) return 'Approval Threshold';
  if (email.isReviewRequest) return 'Needs Clarification';
  if (email.id === 'csr-steve-clarification') return 'Customer Response';
  if (email.id === 'csr-stonite-final-cc' || email.id === 'eis-5-response') return 'Resolved Quote';
  if (email.id === 'csr-ai-1' || email.id === 'eis-1-response') return 'Simple Quote';
  if (email.id === 'csr-ai-2' || email.id === 'eis-6-response') return 'Product Variants';
  if (email.isDirectQuoteRequest) return 'Quote Request';
  if (email.isCcFromAi || email.quoteStatus === 'auto-quoted' || email.quoteStatus === 'quoted') return 'Auto-Quote';
  return null;
}

const STATUS_TAG: Record<string, { label: string; color: string }> = {
  processing: { label: 'Processing', color: 'blue' },
  quoted: { label: 'Quoted', color: 'green' },
  'auto-quoted': { label: 'Auto-Quote', color: 'green' },
  review: { label: 'Needs Review', color: 'orange' },
};

interface SectionHeaderProps {
  label: string;
  count: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function SectionHeader({ label, count, isExpanded, onToggle }: SectionHeaderProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-2 px-4 py-2 text-left hover:bg-muted/30 transition-colors bg-muted/40"
    >
      <div className="flex items-center gap-1.5">
        {isExpanded ? (
          <ChevronDown size={14} className="text-foreground/70" />
        ) : (
          <ChevronRight size={14} className="text-foreground/70" />
        )}
        <span className="text-size-sm font-w-medium text-foreground">{label}</span>
      </div>
      <span className="text-size-xs text-muted-foreground">{count}</span>
    </button>
  );
}

export function EmailList({ emails, selectedEmailId, onSelectEmail, onDeleteEmail, folderType = 'csr', folderLabel, collapsed, onToggleCollapse, reviewResolved = false, forwardStage = 'pending', approvalStage = 'pending', hintTarget = null, scrollTrigger = 0, newEmailIds = new Set(), hasNewMessages = false, onRefresh, isRefreshing = false, emailBatchMap = new Map(), currentBatch = 0, onBack, canGoBack = false }: EmailListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [unreadExpanded, setUnreadExpanded] = useState(true);
  const [readExpanded, setReadExpanded] = useState(true);

  // Auto-scroll the hinted email into view whenever hintTarget changes
  useEffect(() => {
    if (!hintTarget || !scrollRef.current) return;
    // Only handle email hints (e.g. "email:csr-forward-1")
    if (!hintTarget.startsWith('email:')) return;
    const emailId = hintTarget.replace('email:', '');
    // Find the row element with the matching data attribute
    const row = scrollRef.current.querySelector(`[data-email-id="${emailId}"]`);
    if (row) {
      // Small delay so new DOM elements (dynamic emails) have rendered
      setTimeout(() => {
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [hintTarget]);

  // Also scroll to top when new emails are injected (scrollTrigger increments)
  useEffect(() => {
    if (scrollTrigger > 0 && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollTrigger]);

  // Group emails into Unread (current batch only) and Read (previous batches)
  // Emails without batch numbers are treated as batch 0 (initial emails)
  // Unread shows ONLY the current narrative batch
  // Clicking refresh moves current batch to Read and shows next batch in Unread
  const unreadEmails = emails.filter(email => {
    const batch = emailBatchMap.get(email.id) ?? 0;
    return batch === currentBatch;
  });

  const readEmails = emails.filter(email => {
    const batch = emailBatchMap.get(email.id) ?? 0;
    return batch < currentBatch;
  });

  // Helper function to render an individual email row
  const renderEmail = (email: Email) => {
    const isHinted = hintTarget === `email:${email.id}`;
    const isNew = newEmailIds.has(email.id);
    return (
      <div
        key={email.id}
        data-email-id={email.id}
        onClick={() => onSelectEmail(email.id)}
        className={`group relative p-4 cursor-pointer transition-all duration-300 ${
          isNew
            ? 'border-l-4 border-l-accent'
            : selectedEmailId === email.id
              ? 'bg-primary/8 border-l-4 border-l-primary'
              : 'hover:bg-muted'
        }`}
        style={isNew ? {
          animation: 'emailArrival 0.3s ease-out, highlightFade 3s ease-out forwards',
          backgroundColor: 'rgba(51, 105, 135, 0.15)'
        } : undefined}
      >
        {isHinted && <DemoDot className="top-3 left-1.5" />}
        <div className="flex items-start gap-3">
          {!email.read && <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ backgroundColor: getAvatarColor(email.from, !!(email.isCcFromAi || email.isReviewRequest || email.fromEmail === 'quotes@apex-corp.com')), fontSize: '11px', fontWeight: 600 }}
          >
            {getInitials(email.from, !!(email.isCcFromAi || email.isReviewRequest || email.fromEmail === 'quotes@apex-corp.com'))}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-size-sm ${!email.read ? 'font-w-medium text-foreground' : 'font-w-normal text-foreground/70'}`}>
                {email.from}
              </span>
              <span className="text-size-xs text-muted-foreground whitespace-nowrap">
                {email.date !== 'May 28, 2026' ? email.date.replace(', 2026', '') + ' ' : ''}{email.time}
              </span>
            </div>
            <div className={`text-size-sm mb-1 truncate ${!email.read ? 'font-w-semibold text-primary' : 'font-w-normal text-foreground/70'}`}>
              {email.subject}
            </div>
            <div className={`text-size-xs truncate ${!email.read ? 'text-foreground/60' : 'text-muted-foreground'}`}>{email.preview}</div>
            {(() => {
              const typeChip = getTypeChip(email);
              const statusChip = (() => {
                if ((folderType === 'eis' || folderType === 'review') && email.quoteStatus) {
                  const effectiveStatus = email.quoteStatus === 'review' && reviewResolved ? 'quoted' : email.quoteStatus;
                  return <CategoryTag {...STATUS_TAG[effectiveStatus!]} />;
                }
                if ((folderType === 'csr' || folderType === 'review') && email.isCcFromAi) {
                  const wasReviewed = (email as any).quotedPrevious?.fromEmail?.includes('@apex-corp.com');
                  if (wasReviewed) return <CategoryTag label="Reviewed & Quoted" color="grey" />;
                  if (email.id === 'csr-approval-cc') return <CategoryTag label="Approved & Sent" color="grey" />;
                  return <CategoryTag label="Auto-Quoted" color="green" />;
                }
                if ((folderType === 'csr' || folderType === 'review') && email.isReviewRequest && reviewResolved) {
                  return <CategoryTag label="Sent to Customer" color="grey" />;
                }
                if ((folderType === 'csr' || folderType === 'review') && email.isReviewRequest && !reviewResolved) {
                  return <CategoryTag label="Draft Ready" color="orange" />;
                }
                if ((folderType === 'csr' || folderType === 'review') && email.isDirectQuoteRequest) {
                  if (forwardStage === 'quoted') return <CategoryTag label="Forwarded & Quoted" color="grey" />;
                  if (forwardStage === 'processing' || forwardStage === 'sent') return <CategoryTag label="Forwarded" color="blue" />;
                  if (forwardStage === 'composing') return <CategoryTag label="Forwarding..." color="blue" />;
                  return <CategoryTag label="Quote Request" color="orange" />;
                }
                if (folderType === 'csr' && email.isApprovalHold) {
                  if (approvalStage === 'sent') return <CategoryTag label="Approved & Sent" color="grey" />;
                  if (approvalStage === 'approved') return <CategoryTag label="Sending..." color="blue" />;
                  return <CategoryTag label="Pending Approval" color="orange" />;
                }
                return null;
              })();
              if (!statusChip && !typeChip) return null;
              return (
                <div className="mt-1.5 flex items-center gap-1.5">
                  {statusChip}
                  {typeChip && (
                    <span className="text-muted-foreground" style={{ fontSize: '10px', lineHeight: '16px' }}>
                      {statusChip && '·  '}{typeChip}
                    </span>
                  )}
                </div>
              );
            })()}
          </div>
          {onDeleteEmail && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteEmail(email.id);
              }}
              className="p-1 hover:bg-destructive/10 rounded-[var(--radius)] transition-all text-muted-foreground hover:text-destructive flex-shrink-0 opacity-0 group-hover:opacity-100"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    );
  };

  if (collapsed) {
    return (
      <div className="w-10 border-r border-border bg-card flex flex-col items-center transition-all duration-200">
        <button
          onClick={onToggleCollapse}
          className="p-2.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground w-full flex justify-center border-b border-border"
          title="Expand message list"
        >
          <ChevronsRight size={16} />
        </button>
        <div className="flex-1 flex items-start justify-center pt-4">
          <span
            className="text-size-xs font-w-medium text-muted-foreground whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            {folderLabel || 'Inbox'} ({emails.length})
          </span>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="w-80 flex-shrink-0 bg-card overflow-y-auto transition-all duration-200 rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {onBack && (
              <button
                onClick={onBack}
                disabled={!canGoBack}
                className={`p-1 rounded-[var(--radius)] transition-colors flex-shrink-0 ${
                  canGoBack
                    ? 'text-foreground/70 hover:bg-muted hover:text-foreground'
                    : 'text-muted-foreground/30 cursor-not-allowed'
                }`}
                title="Go back one step"
              >
                <ChevronLeft size={16} />
              </button>
            )}
            {folderType === 'eis' && <Zap size={16} className="text-secondary flex-shrink-0" />}
            {folderType === 'review' && <Flag size={16} className="text-secondary flex-shrink-0" />}
            <h2 className="text-size-lg font-w-medium text-foreground truncate">{folderLabel || 'Inbox'}</h2>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={!hasNewMessages || isRefreshing}
                className={`relative p-1 rounded-[var(--radius)] transition-colors flex-shrink-0 ${
                  isRefreshing
                    ? 'text-accent cursor-wait bg-accent/10 border-l-2 border-l-accent'
                    : hasNewMessages
                      ? 'border-l-2 border-l-primary bg-primary/8 text-primary hover:bg-primary/10 hover:text-primary/90'
                      : 'text-muted-foreground/40 cursor-not-allowed'
                }`}
                title={isRefreshing ? 'Loading...' : hasNewMessages ? 'Check for new messages' : 'No new messages'}
              >
                {hintTarget === 'action:refresh' && <DemoDot className="top-0 right-0" />}
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              </button>
            )}
            <button
              onClick={onToggleCollapse}
              className="p-1 hover:bg-muted rounded-[var(--radius)] transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
              title="Collapse message list"
            >
              <ChevronsLeft size={16} />
            </button>
          </div>
        </div>

        {/* Focused/Other toggle */}
        <div className="mt-3 mb-2 inline-flex bg-muted/50 rounded-lg p-1">
          <button className="px-3 py-1.5 text-size-sm font-w-medium bg-background text-primary rounded-md transition-colors">
            Focused
          </button>
          <button className="px-3 py-1.5 text-size-sm font-w-normal text-muted-foreground rounded-md transition-colors hover:text-foreground">
            Other
          </button>
        </div>

        <p className="text-size-sm text-muted-foreground mt-1">
          {emails.length} message{emails.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Loading banner */}
      {isRefreshing && (
        <div className="px-4 py-2.5 bg-accent/10 border-b border-accent/20 flex items-center gap-2.5">
          <Loader2 size={14} className="animate-spin text-accent flex-shrink-0" />
          <span className="text-size-xs font-w-medium text-accent">Checking for new messages...</span>
        </div>
      )}

      {/* Email rows with Unread/Read sections */}
      <div>
        {emails.length === 0 && (
          <div className="py-6" />
        )}

        {/* Unread section */}
        {unreadEmails.length > 0 && (
          <>
            <SectionHeader
              label="Unread"
              count={unreadEmails.length}
              isExpanded={unreadExpanded}
              onToggle={() => setUnreadExpanded(!unreadExpanded)}
            />
            {unreadExpanded && (
              <div className="divide-y divide-border">
                {unreadEmails.map(renderEmail)}
              </div>
            )}
          </>
        )}

        {/* Read section */}
        {readEmails.length > 0 && (
          <>
            <SectionHeader
              label="Read"
              count={readEmails.length}
              isExpanded={readExpanded}
              onToggle={() => setReadExpanded(!readExpanded)}
            />
            {readExpanded && (
              <div className="divide-y divide-border">
                {readEmails.map(renderEmail)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}