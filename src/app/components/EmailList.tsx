import { Zap, ChevronsLeft, ChevronsRight, Flag, Trash2, RefreshCw, Loader2 } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { DemoDot } from './DemoGuide';

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
  inlineQuoteTable?: object;
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
  hintTarget?: string | null;
  scrollTrigger?: number;
  newEmailIds?: Set<string>;
  hasNewMessages?: boolean;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

/* Outlook-style category tag */
function CategoryTag({ label, color }: { label: string; color: string }) {
  const colors: Record<string, string> = {
    orange: 'bg-secondary text-secondary-foreground',
    blue: 'bg-accent text-accent-foreground',
    green: 'bg-chart-3 text-primary-foreground',
  };
  return (
    <span className={`inline-block px-1.5 py-px font-w-medium ${colors[color] || colors.blue}`} style={{ fontSize: '10px', lineHeight: '16px' }}>
      {label}
    </span>
  );
}

const STATUS_TAG: Record<string, { label: string; color: string }> = {
  processing: { label: 'Processing', color: 'blue' },
  quoted: { label: 'Quoted', color: 'green' },
  review: { label: 'Needs Review', color: 'orange' },
};

export function EmailList({ emails, selectedEmailId, onSelectEmail, onDeleteEmail, folderType = 'csr', folderLabel, collapsed, onToggleCollapse, reviewResolved = false, forwardStage = 'pending', hintTarget = null, scrollTrigger = 0, newEmailIds = new Set(), hasNewMessages = false, onRefresh, isRefreshing = false }: EmailListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <div ref={scrollRef} className="w-80 flex-shrink-0 border-r border-border bg-card overflow-y-auto transition-all duration-200">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
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

      {/* Email rows */}
      <div className="divide-y divide-border">
        {emails.length === 0 && (
          <div className="p-6 text-center">
            <p className="text-size-sm text-muted-foreground">No items to review</p>
          </div>
        )}
        {emails.map((email) => {
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
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-size-sm bg-primary text-primary-foreground">
                {(email.isCcFromAi || email.isReviewRequest || email.fromEmail === 'quotes@apex-corp.com') ? 'Q' : email.from.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-size-sm text-foreground ${!email.read ? 'font-w-medium' : 'font-w-normal'}`}>
                    {email.from}
                  </span>
                  <span className="text-size-xs text-muted-foreground whitespace-nowrap">
                    {email.date !== 'Jan 28, 2026' ? email.date.replace(', 2026', '') + ' ' : ''}{email.time}
                  </span>
                </div>
                <div className={`text-size-sm text-foreground mb-1 truncate ${!email.read ? 'font-w-medium' : 'font-w-normal'}`}>
                  {email.subject}
                </div>
                <div className="text-size-xs text-muted-foreground truncate">{email.preview}</div>
                {(folderType === 'eis' || folderType === 'review') && email.quoteStatus && (() => {
                  const effectiveStatus = email.quoteStatus === 'review' && reviewResolved ? 'quoted' : email.quoteStatus;
                  return (
                    <div className="mt-1.5">
                      <CategoryTag {...STATUS_TAG[effectiveStatus!]} />
                    </div>
                  );
                })()}
                {(folderType === 'csr' || folderType === 'review') && email.isCcFromAi && (
                  <div className="mt-1.5">
                    <CategoryTag label="Auto-Quoted" color="green" />
                  </div>
                )}
                {(folderType === 'csr' || folderType === 'review') && email.isReviewRequest && reviewResolved && (
                  <div className="mt-1.5">
                    <CategoryTag label="Quoted" color="green" />
                  </div>
                )}
                {(folderType === 'csr' || folderType === 'review') && email.isReviewRequest && !reviewResolved && (
                  <div className="mt-1.5">
                    <CategoryTag label="Needs Review" color="orange" />
                  </div>
                )}
                {(folderType === 'csr' || folderType === 'review') && email.isDirectQuoteRequest && (() => {
                  if (forwardStage === 'quoted') return (
                    <div className="mt-1.5"><CategoryTag label="Forwarded & Quoted" color="green" /></div>
                  );
                  if (forwardStage === 'processing' || forwardStage === 'sent') return (
                    <div className="mt-1.5"><CategoryTag label="Forwarded" color="blue" /></div>
                  );
                  if (forwardStage === 'composing') return (
                    <div className="mt-1.5"><CategoryTag label="Forwarding..." color="blue" /></div>
                  );
                  return (
                    <div className="mt-1.5"><CategoryTag label="Quote Request" color="orange" /></div>
                  );
                })()}
              </div>
              {!email.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
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
        })}
      </div>
    </div>
  );
}