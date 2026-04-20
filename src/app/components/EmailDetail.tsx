import { useState, useRef, useEffect } from 'react';
import {
  Reply, ReplyAll, Forward, Archive, Trash2, MoreVertical,
  ChevronDown, ChevronUp, Pin, Printer, Mail, Info,
  CheckCircle, Clock, Loader2, AlertTriangle, Send, X,
  ArrowUpCircle, ExternalLink,
} from 'lucide-react';
import type { Email, QuoteTable, ReviewMatchItem, QuotedPrevious } from '../data/emails';
import { DemoDot } from './DemoGuide';

/* ── Helpers ── */

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n);

/* ── Small shared components ── */

function QuoteTableView({ table }: { table: QuoteTable }) {
  const hasAdjustments = table.lineItems.some((item) => item.requestedQty != null);
  const hasDescriptions = table.lineItems.some((item) => item.description);
  const hasStock = table.lineItems.some((item) => item.stockStatus);
  const baseColCount = hasDescriptions ? 7 : 6;
  const colCount = hasStock ? baseColCount + 1 : baseColCount;
  return (
    <div className="my-4">
      <div className="mb-3 pb-2 border-b-2 border-foreground/20">
        <div className="flex items-center justify-between">
          <span className="text-size-sm font-w-medium text-foreground">Quote #{table.quoteNumber}</span>
          <span className="text-size-xs text-muted-foreground">Valid through: {table.validThrough}</span>
        </div>
        <div className="mt-1">
          <span className="text-size-sm text-foreground/80"><span className="font-w-medium">Customer Account</span>: {table.customerName}</span>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-foreground/20">
            <th className="py-2 text-left pr-4 text-size-sm font-w-medium text-foreground">Item Number</th>
            {hasDescriptions && <th className="py-2 text-left pr-4 text-size-sm font-w-medium text-foreground">Item Description</th>}
            <th className="py-2 text-right px-4 text-size-sm font-w-medium text-foreground">Quantity</th>
            <th className="py-2 text-right px-4 text-size-sm font-w-medium text-foreground">MOQ</th>
            <th className="py-2 text-right px-4 text-size-sm font-w-medium text-foreground">Qty Break</th>
            {hasStock && <th className="py-2 text-left px-4 text-size-sm font-w-medium text-foreground">Availability</th>}
            <th className="py-2 text-right px-4 text-size-sm font-w-medium text-foreground">Unit Price</th>
            <th className="py-2 text-right pl-4 text-size-sm font-w-medium text-foreground">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {table.lineItems.map((item, i) => {
            const isAdjusted = item.requestedQty != null;
            const moq = item.minOrderQty ?? 1;
            const brk = item.qtyBreakIncrement ?? 1;
            return (
              <tr key={i} className={`border-b border-border ${isAdjusted ? 'bg-secondary/5' : ''}`}>
                <td className="py-2.5 pr-4 text-size-sm text-foreground/80">{item.sku}</td>
                {hasDescriptions && <td className="py-2.5 pr-4 text-size-sm text-foreground/80">{item.description || '—'}</td>}
                <td className="py-2.5 px-4 text-right text-size-sm text-foreground/80">
                  <span>{item.quantity.toLocaleString()}</span>
                  {isAdjusted && (
                    <span className="block text-size-xs text-secondary" style={{ fontSize: '10px', lineHeight: '14px' }}>
                      req. {item.requestedQty!.toLocaleString()}
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-4 text-right text-size-sm text-foreground/80">{moq.toLocaleString()}</td>
                <td className="py-2.5 px-4 text-right text-size-sm text-foreground/80">{brk.toLocaleString()}</td>
                {hasStock && (
                  <td className="py-2.5 px-4 text-size-sm text-foreground/80">
                    {item.stockStatus === 'in-stock' ? (
                      <span>In Stock | Ready to Ship</span>
                    ) : item.stockStatus === 'lead-time' ? (
                      <span>
                        Available to Order
                        {item.leadTime && (
                          <span className="block text-size-xs text-muted-foreground" style={{ fontSize: '11px', lineHeight: '16px' }}>
                            Est. {item.leadTime}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                )}
                <td className="py-2.5 px-4 text-right text-size-sm text-foreground/80">{fmt(item.unitPrice)}</td>
                <td className="py-2.5 pl-4 text-right text-size-sm text-foreground/80">{fmt(item.totalPrice)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {table.shipping && (
            <>
              <tr className="border-t border-foreground/10">
                <td colSpan={colCount - 1} className="py-2 pr-4 text-size-sm text-foreground/70">Subtotal</td>
                <td className="py-2 pl-4 text-right text-size-sm text-foreground/70">{fmt(table.total - table.shipping.cost)}</td>
              </tr>
              <tr>
                <td colSpan={colCount - 1} className="py-2 pr-4 text-size-sm text-foreground/70">
                  <span>Shipping — {table.shipping.method}</span>
                  {table.shipping.note && (
                    <span className="block text-size-xs text-muted-foreground mt-0.5">{table.shipping.note}</span>
                  )}
                </td>
                <td className="py-2 pl-4 text-right text-size-sm text-foreground/70">{fmt(table.shipping.cost)}</td>
              </tr>
            </>
          )}
          <tr className="border-t-2 border-foreground/20">
            <td colSpan={colCount - 1} className="py-2.5 pr-4 text-size-sm font-w-medium text-foreground">TOTAL</td>
            <td className="py-2.5 pl-4 text-right text-size-sm font-w-medium text-foreground">{fmt(table.total)}</td>
          </tr>
        </tfoot>
      </table>
      {hasAdjustments && (
        <div className="mt-3 flex items-start gap-2 px-3 py-2 rounded-[var(--radius)] bg-secondary/6" style={{ borderLeft: '3px solid var(--secondary)' }}>
          <ArrowUpCircle size={14} className="text-secondary flex-shrink-0 mt-0.5" />
          <span className="text-size-xs text-foreground/70">
            Highlighted rows indicate quantities adjusted to the next valid order break. All items must be ordered in multiples of their Qty Break, with a minimum of the MOQ shown.
          </span>
        </div>
      )}
    </div>
  );
}

function InfoBar({ icon: Icon, iconColor, bg, border, children, animate }: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
  bg: string;
  border: string;
  children: React.ReactNode;
  animate?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2.5 px-4 py-2.5 ${bg} border-b border-border`} style={{ borderLeft: `3px solid ${border}` }}>
      <Icon size={15} className={`${iconColor} flex-shrink-0 ${animate ? 'animate-spin' : ''}`} />
      <span className="text-size-sm text-foreground/80 flex-1">{children}</span>
    </div>
  );
}

function CategoryTag({ label, color }: { label: string; color: string }) {
  const colors: Record<string, string> = {
    orange: 'bg-secondary text-secondary-foreground',
    blue: 'bg-accent text-accent-foreground',
    green: 'bg-chart-3 text-primary-foreground',
  };
  return (
    <span className={`inline-block px-1.5 py-px font-w-medium flex-shrink-0 ${colors[color] || colors.blue}`} style={{ fontSize: '10px', lineHeight: '16px' }}>
      {label}
    </span>
  );
}

const STATUS_CFG: Record<string, { label: string; color: string; icon: typeof Clock; iconColor: string; bg: string; border: string; desc: string; animate?: boolean }> = {
  processing: { label: 'Processing', color: 'blue', icon: Loader2, iconColor: 'text-accent', bg: 'bg-accent/6', border: 'var(--accent)', desc: 'This request is being analyzed and a quote is being generated. The response will be sent automatically.', animate: true },
  quoted: { label: 'Quoted', color: 'green', icon: CheckCircle, iconColor: 'text-chart-3', bg: 'bg-chart-3/6', border: 'var(--chart-3)', desc: 'A quote has been generated and sent to the customer. The assigned CSR has been CC\'d.' },
  review: { label: 'Needs Review', color: 'orange', icon: AlertTriangle, iconColor: 'text-secondary', bg: 'bg-secondary/6', border: 'var(--secondary)', desc: 'This request was partially quoted but some items could not be resolved automatically. A review request has been sent to the assigned CSR.' },
};

/* ── Outlook-style quoted previous message ── */

function QuotedPreviousBlock({ quoted }: { quoted: QuotedPrevious }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mt-6 border-t border-border pt-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-size-xs text-muted-foreground hover:text-foreground/70 transition-colors"
      >
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        <span>
          On {quoted.date} at {quoted.time}, {quoted.from} &lt;{quoted.fromEmail}&gt; wrote:
        </span>
      </button>
      {expanded && (
        <div className="mt-2 pl-4 border-l-2 border-foreground/10">
          {quoted.subject && (
            <p className="text-size-xs text-muted-foreground mb-1">Subject: {quoted.subject}</p>
          )}
          <p className="whitespace-pre-wrap text-size-sm text-foreground/50">{quoted.body}</p>
        </div>
      )}
    </div>
  );
}

/* ── Review match table ── */

function ReviewMatchTable({ items, quoteNumber, customerAccount }: {
  items: ReviewMatchItem[];
  quoteNumber: string;
  customerAccount: string;
}) {
  const hasAnyPricing = items.some((item) => item.unitPrice != null || item.totalPrice != null);
  const hasAnyDescription = items.some((item) => item.description);

  return (
    <div className="mt-3">
      <div className="mb-3 pb-2 border-b-2 border-foreground/20">
        <div className="flex items-center justify-between">
          <span className="text-size-sm font-w-medium text-foreground">Quote #{quoteNumber}</span>
        </div>
        <div className="mt-1">
          <span className="text-size-sm text-foreground/80"><span className="font-w-medium">Customer Account</span>: {customerAccount}</span>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-foreground/20">
            <th className="py-2 text-left pr-4 text-size-sm font-w-medium text-foreground">Requested Item</th>
            <th className="py-2 text-left pr-4 text-size-sm font-w-medium text-foreground">Item Number</th>
            {hasAnyDescription && <th className="py-2 text-left pr-4 text-size-sm font-w-medium text-foreground">Item Description</th>}
            <th className="py-2 text-right px-4 text-size-sm font-w-medium text-foreground">Quantity</th>
            <th className="py-2 text-left px-4 text-size-sm font-w-medium text-foreground">MOQ</th>
            <th className="py-2 text-left px-4 text-size-sm font-w-medium text-foreground">Qty Break</th>
            <th className="py-2 text-left px-4 text-size-sm font-w-medium text-foreground">Details Needed</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            const lowConfidence = item.confidence !== '-' && parseFloat(item.confidence) < 90;
            const qtyBelowMOQ = item.quantity != null && item.minOrderQty != null && item.quantity < item.minOrderQty;

            return (
              <tr key={i} className="border-b border-border">
                <td className="py-2.5 pr-4 text-size-sm text-foreground/80">{item.requestedItem}</td>
                <td className="py-2.5 pr-4 text-size-sm">
                  {item.matchedItem ? (
                    item.catalogUrl ? (
                      <a
                        href={item.catalogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 underline underline-offset-2 transition-colors ${lowConfidence ? 'text-secondary hover:text-secondary/80' : 'text-accent hover:text-accent/80'}`}
                      >
                        {item.matchedItem}
                        <ExternalLink size={12} className="flex-shrink-0" />
                      </a>
                    ) : (
                      <span className={lowConfidence ? 'text-secondary font-w-medium' : 'text-foreground/80'}>{item.matchedItem}</span>
                    )
                  ) : (
                    <span className="text-muted-foreground italic">—</span>
                  )}
                </td>
                {hasAnyDescription && (
                  <td className="py-2.5 pr-4 text-size-sm text-foreground/80">
                    {item.description || <span className="text-muted-foreground italic">—</span>}
                  </td>
                )}
                <td className="py-2.5 px-4 text-right text-size-sm">
                  {item.quantity != null ? (
                    <span className={qtyBelowMOQ ? 'text-secondary font-w-medium' : 'text-foreground/80'}>{item.quantity.toLocaleString()}</span>
                  ) : (
                    <span className="text-muted-foreground italic">—</span>
                  )}
                </td>
                <td className="py-2.5 px-4 text-size-sm">
                  {item.minOrderQty != null ? (
                    <span className="text-foreground/80">{item.minOrderQty.toLocaleString()}</span>
                  ) : (
                    <span className="text-muted-foreground italic">—</span>
                  )}
                </td>
                <td className="py-2.5 px-4 text-size-sm">
                  {item.qtyBreakIncrement != null ? (
                    <span className="text-foreground/80">{item.qtyBreakIncrement.toLocaleString()}</span>
                  ) : (
                    <span className="text-muted-foreground italic">—</span>
                  )}
                </td>
                <td className="py-2.5 px-4 text-size-sm">
                  {item.details ? (
                    <span className="text-secondary font-w-medium">{item.details}</span>
                  ) : (
                    <span className="text-muted-foreground italic">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-3 flex items-start gap-2 px-3 py-2 rounded-[var(--radius)] bg-accent/6" style={{ borderLeft: '3px solid var(--accent)' }}>
        <AlertTriangle size={14} className="text-accent flex-shrink-0 mt-0.5" />
        <div className="text-size-xs text-foreground/70">
          <p className="font-w-medium mb-1">Draft ready to send:</p>
          <p className="text-muted-foreground">Review the customer request above. You can either <strong>provide the missing details yourself</strong> if you know them (reply with details), or <strong>forward this message to the customer</strong> asking for clarification. Once details are provided, the system will generate a complete quote.</p>
        </div>
      </div>
    </div>
  );
}

/* ── Compose box for review reply ── */

function ComposeBox({ toEmail, subject, prefillBody, onSend, onDiscard, hintSend }: {
  toEmail: string;
  subject: string;
  prefillBody: string;
  onSend: () => void;
  onDiscard: () => void;
  hintSend?: boolean;
}) {
  return (
    <div className="border-b border-border">
      <div className="flex items-center justify-between px-6 py-2 bg-muted border-b border-border">
        <div className="flex items-center gap-2">
          <Reply size={14} className="text-muted-foreground" />
          <span className="text-size-xs text-muted-foreground">Replying</span>
        </div>
        <button
          onClick={onDiscard}
          className="p-1 hover:bg-border/40 rounded-[var(--radius)] transition-colors"
          title="Discard"
        >
          <X size={14} className="text-muted-foreground" />
        </button>
      </div>
      <div className="px-6 py-4">
        <div className="mb-3 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-size-xs text-muted-foreground w-10 flex-shrink-0">To:</span>
            <span className="text-size-sm text-foreground">{toEmail}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-size-xs text-muted-foreground w-10 flex-shrink-0">Subj:</span>
            <span className="text-size-sm text-foreground">Re: {subject}</span>
          </div>
        </div>
        <div className="mb-3 p-3 border border-border rounded-[var(--radius)] bg-card min-h-[100px]">
          <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{prefillBody}</p>
        </div>
        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <div className="relative">
            <button
              onClick={onSend}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-primary/90 transition-colors flex items-center gap-2 text-size-sm"
            >
              <Send size={14} /> Send
            </button>
            {hintSend && <DemoDot />}
          </div>
          <button
            onClick={onDiscard}
            className="px-4 py-2 bg-card border border-border text-foreground rounded-[var(--radius-button)] hover:bg-muted transition-colors text-size-sm"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Message header (single email, not threaded) ── */

function MessageHeader({ email }: { email: Email }) {
  const isSystemEmail = email.fromEmail === 'quotes@apex-corp.com' || email.isCcFromAi || email.isReviewRequest;
  return (
    <div className="flex items-start gap-3 px-6 py-4 border-b border-border">
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-size-base bg-primary text-primary-foreground">
        {isSystemEmail ? 'Q' : email.from.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-size-sm font-w-medium text-foreground truncate">{email.from}</span>
            <span className="text-size-xs text-muted-foreground truncate">&lt;{email.fromEmail}&gt;</span>
          </div>
          <span className="text-size-xs text-muted-foreground flex-shrink-0 ml-3">{email.date} {email.time}</span>
        </div>
        <div className="text-size-xs text-muted-foreground mt-0.5">
          To: {email.to}
          {email.cc && <span> · Cc: {email.cc}</span>}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Main component — Flat email detail (one email per view)
   ══════════════════════════════════════════════════════════════════════════ */

export function EmailDetail({ email, folderType, reviewResolved, onReviewResolve, reviewStage, onReviewStageChange, reviewComposeMode, onReviewComposeModeChange, onReviewSend, reviewForwardStage, onReviewForwardCompose, onReviewForwardSend, onReviewForwardDiscard, forwardStage, onForwardCompose, onForwardSend, onForwardDiscard, onDeleteEmail, hintTarget }: {
  email: Email | null;
  folderType: 'csr' | 'eis';
  reviewResolved?: boolean;
  onReviewResolve?: () => void;
  reviewStage: 'pending' | 'composing' | 'sending' | 'resolved';
  onReviewStageChange: (stage: 'pending' | 'composing' | 'sending' | 'resolved') => void;
  reviewComposeMode: 'reply' | 'forward';
  onReviewComposeModeChange: (mode: 'reply' | 'forward') => void;
  onReviewSend: () => void;
  reviewForwardStage?: 'pending' | 'composing' | 'sent' | 'processing' | 'quoted';
  onReviewForwardCompose?: () => void;
  onReviewForwardSend?: () => void;
  onReviewForwardDiscard?: () => void;
  forwardStage?: 'pending' | 'composing' | 'sent' | 'processing' | 'quoted';
  onForwardCompose?: () => void;
  onForwardSend?: () => void;
  onForwardDiscard?: () => void;
  onDeleteEmail?: (id: string) => void;
  hintTarget?: string | null;
}) {
  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted">
        <div className="text-center">
          <Mail size={48} className="mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-size-sm text-muted-foreground">Select an email to view</p>
        </div>
      </div>
    );
  }

  // Ref for the scrollable content area — used to auto-scroll to compose box
  const contentScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top when compose box appears (review reply or forward compose)
  useEffect(() => {
    if ((reviewStage === 'composing' || effectiveForwardStage === 'composing' || reviewForwardStage === 'composing') && contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [reviewStage, forwardStage, reviewForwardStage]);

  const isReview = email.isReviewRequest;
  const isDirectQuote = email.isDirectQuoteRequest;
  const isCc = email.isCcFromAi;
  const isSteveClarification = email.id === 'csr-steve-clarification';

  // Use reviewForwardStage for Steve's clarification, forwardStage for others
  const effectiveForwardStage = isSteveClarification ? reviewForwardStage : forwardStage;
  const effectiveOnForwardCompose = isSteveClarification ? onReviewForwardCompose : onForwardCompose;
  const effectiveOnForwardSend = isSteveClarification ? onReviewForwardSend : onForwardSend;
  const effectiveOnForwardDiscard = isSteveClarification ? onReviewForwardDiscard : onForwardDiscard;
  const hasInlineQuote = !!email.inlineQuoteTable;
  const hasCcQuote = !!email.isCcFromAiQuoteTable;

  /* ── Status tag logic ── */

  const getTag = () => {
    // EIS inbox emails with quoteStatus
    if (email.quoteStatus) {
      // Special: review status changes to quoted when resolved
      const effectiveStatus = email.quoteStatus === 'review' && reviewResolved ? 'quoted' : email.quoteStatus;
      const cfg = STATUS_CFG[effectiveStatus];
      if (cfg) return <CategoryTag label={cfg.label} color={cfg.color} />;
    }
    // CSR CC
    if (isCc) return <CategoryTag label="Auto-Quoted" color="green" />;
    // CSR review request
    if (isReview) {
      if (reviewStage === 'sending') return <CategoryTag label="Sending" color="blue" />;
      if (reviewStage === 'resolved') return <CategoryTag label="Sent" color="green" />;
      return <CategoryTag label="Draft Ready" color="orange" />;
    }
    // CSR direct quote
    if (isDirectQuote) {
      if (effectiveForwardStage === 'quoted') return <CategoryTag label="Forwarded & Quoted" color="green" />;
      if (effectiveForwardStage === 'processing' || effectiveForwardStage === 'sent') return <CategoryTag label="Forwarded" color="blue" />;
      if (effectiveForwardStage === 'composing') return <CategoryTag label="Forwarding..." color="blue" />;
      return <CategoryTag label="Quote Request" color="orange" />;
    }
    return null;
  };

  /* ── Info bar logic ── */

  const getInfoBar = () => {
    // EIS inbox status bars
    if (email.quoteStatus && !isReview && !isDirectQuote) {
      const effectiveStatus = email.quoteStatus === 'review' && reviewResolved ? 'quoted' : email.quoteStatus;
      const cfg = STATUS_CFG[effectiveStatus];
      if (cfg) {
        return (
          <InfoBar icon={cfg.icon} iconColor={cfg.iconColor} bg={cfg.bg} border={cfg.border} animate={cfg.animate}>
            {cfg.desc}
          </InfoBar>
        );
      }
    }
    // CSR CC info bar
    if (isCc) {
      return (
        <InfoBar icon={Info} iconColor="text-accent" bg="bg-accent/5" border="var(--accent)">
          You were CC'd on this quote response sent to{' '}
          <span className="font-w-medium">{email.originalSender}</span>. No action required unless adjustments are needed.
        </InfoBar>
      );
    }
    // CSR review info bars
    if (isReview) {
      if (reviewStage === 'sending') {
        return (
          <InfoBar icon={Loader2} iconColor="text-accent" bg="bg-accent/6" border="var(--accent)" animate>
            Sending clarification request to{' '}
            <span className="font-w-medium">{email.originalSender}</span>...
          </InfoBar>
        );
      }
      if (reviewStage === 'resolved') {
        return (
          <InfoBar icon={CheckCircle} iconColor="text-chart-3" bg="bg-chart-3/6" border="var(--chart-3)">
            Clarification request sent. Waiting for response from{' '}
            <span className="font-w-medium">{email.originalSender}</span> with additional details.
          </InfoBar>
        );
      }
      return (
        <InfoBar icon={AlertTriangle} iconColor="text-secondary" bg="bg-secondary/6" border="var(--secondary)">
          Draft message ready. Request from{' '}
          <span className="font-w-medium">{email.originalSender}</span> needs clarification. You can provide the details yourself or forward the draft to the customer.
        </InfoBar>
      );
    }
    // Steve's clarification info bars
    if (isSteveClarification) {
      if (effectiveForwardStage === 'quoted') {
        return (
          <InfoBar icon={CheckCircle} iconColor="text-chart-3" bg="bg-chart-3/6" border="var(--chart-3)">
            Customer clarification forwarded. A quote has been generated and sent to{' '}
            <span className="font-w-medium">Steve Landers (Stonite Coil Corp)</span>. You've been CC'd on the response.
          </InfoBar>
        );
      }
      if (effectiveForwardStage === 'processing') {
        return (
          <InfoBar icon={Loader2} iconColor="text-accent" bg="bg-accent/6" border="var(--accent)" animate>
            Forwarded to quotes@apex-corp.com. Generating a quote with customer clarifications...
          </InfoBar>
        );
      }
      if (effectiveForwardStage === 'sent') {
        return (
          <InfoBar icon={CheckCircle} iconColor="text-accent" bg="bg-accent/6" border="var(--accent)">
            Forwarded to quotes@apex-corp.com. Waiting for processing...
          </InfoBar>
        );
      }
      return (
        <InfoBar icon={Info} iconColor="text-secondary" bg="bg-secondary/6" border="var(--secondary)">
          Customer provided clarification details. Forward this to <span className="font-w-medium">quotes@apex-corp.com</span> for quoting.
        </InfoBar>
      );
    }
    // CSR direct quote info bars
    if (isDirectQuote) {
      if (effectiveForwardStage === 'quoted') {
        return (
          <InfoBar icon={CheckCircle} iconColor="text-chart-3" bg="bg-chart-3/6" border="var(--chart-3)">
            Forwarded to quotes@apex-corp.com. A quote has been generated and sent to{' '}
            <span className="font-w-medium">{email.originalSender}</span>. You've been CC'd on the response.
          </InfoBar>
        );
      }
      if (effectiveForwardStage === 'processing') {
        return (
          <InfoBar icon={Loader2} iconColor="text-accent" bg="bg-accent/6" border="var(--accent)" animate>
            Forwarded to quotes@apex-corp.com. Generating a quote for{' '}
            <span className="font-w-medium">{email.originalSender}</span>...
          </InfoBar>
        );
      }
      if (effectiveForwardStage === 'sent') {
        return (
          <InfoBar icon={CheckCircle} iconColor="text-accent" bg="bg-accent/6" border="var(--accent)">
            Forwarded to quotes@apex-corp.com. Waiting for processing...
          </InfoBar>
        );
      }
      return (
        <InfoBar icon={Info} iconColor="text-secondary" bg="bg-secondary/6" border="var(--secondary)">
          This customer sent a quote request directly to your inbox. Forward it to <span className="font-w-medium">quotes@apex-corp.com</span> for quoting.
        </InfoBar>
      );
    }
    return null;
  };

  /* ── Body content ── */

  const renderBody = () => {
    // Review request: show match table + original email as quoted
    if (isReview && email.reviewMatchItems && email.reviewQuoteNumber && email.reviewCustomerAccount) {
      return (
        <>
          {email.bodyBefore && <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{email.bodyBefore}</p>}
          <ReviewMatchTable items={email.reviewMatchItems} quoteNumber={email.reviewQuoteNumber} customerAccount={email.reviewCustomerAccount} />
          {email.reviewOriginalEmail && (
            <QuotedPreviousBlock quoted={{
              from: email.reviewOriginalEmail.from,
              fromEmail: email.reviewOriginalEmail.fromEmail,
              date: email.reviewOriginalEmail.date,
              time: email.reviewOriginalEmail.time,
              subject: email.reviewOriginalEmail.subject,
              body: email.reviewOriginalEmail.body,
            }} />
          )}
        </>
      );
    }
    // Email with inline quote table (AI quote responses)
    if (hasInlineQuote) {
      return (
        <>
          {email.bodyBefore && <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{email.bodyBefore}</p>}
          <QuoteTableView table={email.inlineQuoteTable!} />
          {email.bodyAfter && <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{email.bodyAfter}</p>}
          {email.quotedPrevious && <QuotedPreviousBlock quoted={email.quotedPrevious} />}
        </>
      );
    }
    // CC email with quote table
    if (hasCcQuote) {
      return (
        <>
          {email.bodyBefore && <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{email.bodyBefore}</p>}
          <QuoteTableView table={email.isCcFromAiQuoteTable!} />
          {email.bodyAfter && <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{email.bodyAfter}</p>}
          {email.quotedPrevious && <QuotedPreviousBlock quoted={email.quotedPrevious} />}
        </>
      );
    }
    // Plain email
    return (
      <>
        <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{email.body}</p>
        {email.quotedPrevious && <QuotedPreviousBlock quoted={email.quotedPrevious} />}

        {/* WF3: Show the auto-generated quote inline once the forward is complete */}
        {isDirectQuote && effectiveForwardStage === 'quoted' && email.forwardAiResponse && (
          <div className="mt-8 border-t-2 border-foreground/15 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-size-sm">
                Q
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-size-sm font-w-medium text-foreground">{email.forwardAiResponse.from}</span>
                    <span className="text-size-xs text-muted-foreground">&lt;{email.forwardAiResponse.fromEmail}&gt;</span>
                  </div>
                  <span className="text-size-xs text-muted-foreground">{email.forwardAiResponse.date} {email.forwardAiResponse.time}</span>
                </div>
                <div className="text-size-xs text-muted-foreground mt-0.5">
                  To: {email.forwardAiResponse.to}
                  {email.forwardAiResponse.cc && <span> · Cc: {email.forwardAiResponse.cc}</span>}
                </div>
              </div>
            </div>
            {email.forwardAiResponse.bodyBefore && (
              <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{email.forwardAiResponse.bodyBefore}</p>
            )}
            {email.forwardAiResponse.quoteTable && (
              <QuoteTableView table={email.forwardAiResponse.quoteTable} />
            )}
            {email.forwardAiResponse.bodyAfter && (
              <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{email.forwardAiResponse.bodyAfter}</p>
            )}
          </div>
        )}
      </>
    );
  };

  /* ── Actions ── */

  const renderActions = () => {
    // Review pending: Forward highlighted to send draft to customer
    if (isReview && reviewStage === 'pending') {
      return (
        <>
          <button
            onClick={() => {
              onReviewComposeModeChange('reply');
              onReviewStageChange('composing');
            }}
            className="px-4 py-2 bg-card border border-border text-foreground rounded-[var(--radius-button)] hover:bg-muted transition-colors flex items-center gap-2 text-size-sm"
          >
            <Reply size={16} /> Reply
          </button>
          <button className="px-4 py-2 bg-card border border-border text-foreground rounded-[var(--radius-button)] hover:bg-muted transition-colors flex items-center gap-2 text-size-sm">
            <ReplyAll size={16} /> Reply All
          </button>
          <div className="relative">
            <button
              onClick={() => {
                onReviewComposeModeChange('forward');
                onReviewStageChange('composing');
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-primary/90 transition-colors flex items-center gap-2 text-size-sm"
            >
              <Forward size={16} /> Forward
            </button>
            {hintTarget === 'action:reply' && <DemoDot />}
          </div>
        </>
      );
    }
    if (isReview && (reviewStage === 'composing' || reviewStage === 'sending')) {
      return (
        <div className="flex items-center gap-2">
          {reviewStage === 'sending' && <Loader2 size={14} className="text-accent animate-spin" />}
          <span className="text-size-xs text-muted-foreground">{reviewStage === 'sending' ? 'Sending to customer...' : 'Composing message...'}</span>
        </div>
      );
    }
    // Steve's clarification or Direct quote pending: Forward highlighted
    if ((isSteveClarification || isDirectQuote) && effectiveForwardStage === 'pending') {
      return (
        <>
          <button className="px-4 py-2 bg-card border border-border text-foreground rounded-[var(--radius-button)] hover:bg-muted transition-colors flex items-center gap-2 text-size-sm">
            <Reply size={16} /> Reply
          </button>
          <button className="px-4 py-2 bg-card border border-border text-foreground rounded-[var(--radius-button)] hover:bg-muted transition-colors flex items-center gap-2 text-size-sm">
            <ReplyAll size={16} /> Reply All
          </button>
          <div className="relative">
            <button
              onClick={() => effectiveOnForwardCompose?.()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-primary/90 transition-colors flex items-center gap-2 text-size-sm"
            >
              <Forward size={16} /> Forward
            </button>
            {hintTarget === 'action:forward' && <DemoDot />}
          </div>
        </>
      );
    }
    if ((isSteveClarification || isDirectQuote) && effectiveForwardStage === 'composing') {
      return <span className="text-size-xs text-muted-foreground">Composing forward...</span>;
    }
    if ((isSteveClarification || isDirectQuote) && (effectiveForwardStage === 'sent' || effectiveForwardStage === 'processing')) {
      return (
        <div className="flex items-center gap-2">
          <Loader2 size={14} className="text-accent animate-spin" />
          <span className="text-size-xs text-muted-foreground">{effectiveForwardStage === 'processing' ? 'Processing the quote...' : 'Forwarded. Waiting for processing...'}</span>
        </div>
      );
    }
    // Default actions
    return (
      <>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-primary/90 transition-colors flex items-center gap-2 text-size-sm">
          <Reply size={16} /> Reply
        </button>
        {[{ icon: ReplyAll, label: 'Reply All' }, { icon: Forward, label: 'Forward' }].map(({ icon: Icon, label }) => (
          <button key={label} className="px-4 py-2 bg-card border border-border text-foreground rounded-[var(--radius-button)] hover:bg-muted transition-colors flex items-center gap-2 text-size-sm">
            <Icon size={16} /> {label}
          </button>
        ))}
      </>
    );
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col bg-card">
      {/* Toolbar */}
      <div className="border-b border-border bg-muted">
        <div className="flex items-center gap-1 px-4 py-2">
          <button className="p-2 hover:bg-border/40 rounded-[var(--radius)] transition-colors">
            <Archive size={18} className="text-foreground/70" />
          </button>
          <button
            onClick={() => onDeleteEmail?.(email.id)}
            className="p-2 hover:bg-border/40 rounded-[var(--radius)] transition-colors"
            title="Delete"
          >
            <Trash2 size={18} className="text-foreground/70" />
          </button>
          <div className="w-px h-6 bg-border mx-1" />
          {[ChevronDown, Pin].map((Icon, i) => (
            <button key={i} className="p-2 hover:bg-border/40 rounded-[var(--radius)] transition-colors">
              <Icon size={18} className="text-foreground/70" />
            </button>
          ))}
          <div className="w-px h-6 bg-border mx-1" />
          <button className="p-2 hover:bg-border/40 rounded-[var(--radius)] transition-colors">
            <Printer size={18} className="text-foreground/70" />
          </button>
          <div className="w-px h-6 bg-border mx-1" />
          <button className="p-2 hover:bg-border/40 rounded-[var(--radius)] transition-colors">
            <MoreVertical size={18} className="text-foreground/70" />
          </button>
        </div>
      </div>

      {/* Subject + tags */}
      <div className="px-6 pt-5 pb-3 border-b border-border">
        <div className="flex items-center gap-3">
          <h1 className="text-size-xl font-w-medium text-foreground flex-1">{email.subject}</h1>
          {getTag()}
        </div>
      </div>

      {/* Info bar */}
      {getInfoBar()}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" ref={contentScrollRef}>
        {/* ── Review composing: Show compose box above message ── */}
        {isReview && reviewStage === 'composing' && email.reviewReply && (
          <ComposeBox
            toEmail={reviewComposeMode === 'reply' ? 'quotes@apex-corp.com' : 'slanders@stonitecoil.com'}
            subject={email.subject}
            prefillBody={reviewComposeMode === 'reply'
              ? email.reviewReply.body
              : `Hi Steve,\n\nThank you for the quote request. I've reviewed your request and need a few additional details to provide accurate pricing. Please review the below items and outstanding questions:\n\n[Review table items above]\n\n${email.bodyAfter || ''}`}
            onSend={onReviewSend}
            onDiscard={() => onReviewStageChange('pending')}
            hintSend={hintTarget === 'action:send'}
          />
        )}

        {/* ── Review sending: Show spinner ── */}
        {isReview && reviewStage === 'sending' ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 size={32} className="mx-auto mb-3 text-accent animate-spin" />
              {reviewComposeMode === 'reply' ? (
                <>
                  <p className="text-size-sm text-foreground/80 font-w-medium">Processing your corrections...</p>
                  <p className="text-size-xs text-muted-foreground mt-1">Generating the final quote for {email.originalSender}</p>
                </>
              ) : (
                <>
                  <p className="text-size-sm text-foreground/80 font-w-medium">Sending clarification request...</p>
                  <p className="text-size-xs text-muted-foreground mt-1">Waiting for response from {email.originalSender}</p>
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* ── Forward composing: Show forward compose box above message ── */}
            {(isSteveClarification || isDirectQuote) && effectiveForwardStage === 'composing' && (
              <div className="border-b border-border">
                <div className="flex items-center justify-between px-6 py-2 bg-muted border-b border-border">
                  <div className="flex items-center gap-2">
                    <Forward size={14} className="text-muted-foreground" />
                    <span className="text-size-xs text-muted-foreground">Forwarding</span>
                  </div>
                  <button
                    onClick={() => effectiveOnForwardDiscard?.()}
                    className="p-1 hover:bg-border/40 rounded-[var(--radius)] transition-colors"
                    title="Discard"
                  >
                    <X size={14} className="text-muted-foreground" />
                  </button>
                </div>
                <div className="px-6 py-4">
                  <div className="mb-3 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-size-xs text-muted-foreground w-10 flex-shrink-0">To:</span>
                      <span className="text-size-sm text-foreground">{email.forwardTo || 'quotes@apex-corp.com'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-size-xs text-muted-foreground w-10 flex-shrink-0">Subj:</span>
                      <span className="text-size-sm text-foreground">FW: {email.subject}</span>
                    </div>
                  </div>
                  {email.forwardNote && (
                    <div className="mt-3 p-3 bg-muted/30 rounded-[var(--radius)] border border-border">
                      <p className="text-size-sm text-foreground/80 whitespace-pre-wrap">{email.forwardNote}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 pt-3 border-t border-border">
                    <div className="relative">
                      <button
                        onClick={() => effectiveOnForwardSend?.()}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-primary/90 transition-colors flex items-center gap-2 text-size-sm"
                      >
                        <Send size={14} /> Send
                      </button>
                      {hintTarget === 'action:send' && <DemoDot />}
                    </div>
                    <button
                      onClick={() => effectiveOnForwardDiscard?.()}
                      className="px-4 py-2 bg-card border border-border text-foreground rounded-[var(--radius-button)] hover:bg-muted transition-colors text-size-sm"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Message header */}
            <MessageHeader email={email} />

            {/* Message body */}
            <div className="px-6 py-5">
              {renderBody()}
            </div>

            {/* Threaded quote response — renders as a separate message in the conversation */}
            {email.threadedQuoteResponse && (() => {
              const thr = email.threadedQuoteResponse;
              return (
                <div className="border-t-2 border-foreground/10">
                  {/* Thread message header */}
                  <div className="flex items-start gap-3 px-6 py-4 border-b border-border">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-size-sm">
                      Q
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5 min-w-0">
                          <span className="text-size-sm font-w-medium text-foreground truncate">{thr.from}</span>
                          <span className="text-size-xs text-muted-foreground truncate">&lt;{thr.fromEmail}&gt;</span>
                        </div>
                        <span className="text-size-xs text-muted-foreground flex-shrink-0 ml-3">{thr.date} {thr.time}</span>
                      </div>
                      <div className="text-size-xs text-muted-foreground mt-0.5">
                        To: {thr.to}
                        {thr.cc && <span> · Cc: {thr.cc}</span>}
                      </div>
                    </div>
                  </div>
                  {/* Thread message body */}
                  <div className="px-6 py-5">
                    {thr.bodyBefore && <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{thr.bodyBefore}</p>}
                    <QuoteTableView table={thr.quoteTable} />
                    {thr.bodyAfter && <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{thr.bodyAfter}</p>}
                    {thr.quotedPrevious && <QuotedPreviousBlock quoted={thr.quotedPrevious} />}
                  </div>
                </div>
              );
            })()}
          </>
        )}
      </div>

      {/* Actions footer */}
      <div className="border-t border-border p-4 bg-muted">
        <div className="flex items-center gap-2">
          {renderActions()}
        </div>
      </div>
    </div>
  );
}