import { useState, useRef, useEffect, Fragment } from 'react';
import {
  Reply, ReplyAll, Forward,
  ChevronDown, ChevronUp, Info, Inbox,
  CheckCircle, Clock, Loader2, AlertTriangle, Send, X,
  ArrowUpCircle, Bot, Smile, ClipboardList,
} from 'lucide-react';
import type { Email, QuoteTable, ReviewMatchItem, QuotedPrevious } from '../data/emails';
import { DemoDot, ActionHint } from './DemoGuide';
import { getAvatarColor, getInitials, getAvatarImage } from '../lib/avatarUtils';
import imgMorgan from '../../../public/avatars/women/THCiUmVZcgxHodGCK3EyYo.jpg';
import { getEmailCategory, getEntry } from '../data/emailRegistry';

/* ── Helpers ── */

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n);

/* ── Small shared components ── */

function QuoteTableView({ table }: { table: QuoteTable }) {
  const hasAdjustments = table.lineItems.some((item) => item.requestedQty != null);
  const hasQtyBreakDiscount = table.lineItems.some((item) => item.qtyBreakDiscount);
  const hasStockStatus = table.lineItems.some((item) => item.stockStatus);
  const colCount = 4 + (hasQtyBreakDiscount ? 1 : 0) + (hasStockStatus ? 1 : 0);
  return (
    <div className="my-4 border border-border rounded-lg bg-muted/20">
      <div className="px-4 py-3 bg-muted/40 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-size-sm font-w-medium text-foreground">Quote #{table.quoteNumber}</span>
            {table.isRushOrder && (
              <span className="inline-block px-1.5 py-px font-w-medium bg-secondary text-secondary-foreground" style={{ fontSize: '10px', lineHeight: '16px' }}>
                RUSH
              </span>
            )}
          </div>
          <span className="text-size-xs text-muted-foreground">Valid through: {table.validThrough}</span>
        </div>
        <div className="mt-1.5">
          <span className="text-size-sm text-foreground/80"><span className="font-w-medium">Customer Account</span>: {table.customerName}</span>
        </div>
        {table.comparisonNote && (
          <div className="mt-1.5">
            <span className="text-size-xs text-muted-foreground italic">{table.comparisonNote}</span>
          </div>
        )}
      </div>
      <div className="px-4">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-card">
            <tr className="border-b-2 border-foreground/15">
              <th className="py-2.5 text-left pr-4 text-size-sm font-w-medium text-foreground">Item</th>
              <th className="py-2.5 text-right px-4 text-size-sm font-w-medium text-foreground">Qty</th>
              {hasStockStatus && <th className="py-2.5 text-center px-4 text-size-sm font-w-medium text-foreground">Availability</th>}
              <th className="py-2.5 text-right px-4 text-size-sm font-w-medium text-foreground">Unit Price</th>
              {hasQtyBreakDiscount && <th className="py-2.5 text-right px-4 text-size-sm font-w-medium text-foreground">Discount</th>}
              <th className="py-2.5 text-right pl-4 text-size-sm font-w-medium text-foreground">Total</th>
            </tr>
          </thead>
          <tbody>
            {table.lineItems.map((item, i) => {
              const isAdjusted = item.requestedQty != null;
              const moq = item.minOrderQty ?? 1;
              return (
                <tr key={i} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 pr-4 text-size-sm text-foreground/80">
                    <span className="font-w-medium">{item.sku}</span>
                    {item.description && (
                      <span className="block text-size-xs text-muted-foreground mt-0.5">{item.description}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right text-size-sm text-foreground/80 align-top">
                    <span>{item.quantity.toLocaleString()}</span>
                  </td>
                  {hasStockStatus && (
                    <td className="py-3 px-4 text-center text-size-sm align-top">
                      {item.stockStatus === 'in-stock' && (
                        <span className="font-w-medium" style={{ fontSize: '13px', lineHeight: '18px', color: '#16a34a' }}>In Stock</span>
                      )}
                      {item.stockStatus === 'lead-time' && (
                        <span className="text-muted-foreground" style={{ fontSize: '13px', lineHeight: '18px' }}>
                          Est. {item.leadTime ?? 'lead time'}
                        </span>
                      )}
                    </td>
                  )}
                  <td className="py-3 px-4 text-right text-size-sm text-foreground/80 align-top">
                    {fmt(item.unitPrice)}
                  </td>
                  {hasQtyBreakDiscount && (
                    <td className="py-3 px-4 text-right text-size-sm align-top">
                      <span style={{ color: '#16a34a' }}>{item.qtyBreakDiscount || '—'}</span>
                      {item.qtyBreakNote && (
                        <span className="block text-size-xs text-muted-foreground mt-0.5" style={{ fontSize: '10px', lineHeight: '14px' }}>{item.qtyBreakNote}</span>
                      )}
                    </td>
                  )}
                  <td className="py-3 pl-4 text-right text-size-sm text-foreground/80 align-top">{fmt(item.totalPrice)}</td>
                </tr>
              );
            })}
          </tbody>
          {!table.isQtyBreakComparison && (
          <tfoot>
            {table.shipping && (
              <>
                <tr className="border-t border-foreground/10">
                  <td colSpan={colCount - 1} className="pt-4 pb-2 pr-4 text-size-sm text-foreground/70">Subtotal</td>
                  <td className="pt-4 pb-2 pl-4 text-right text-size-sm text-foreground/70">{fmt(table.total + (table.discount?.amount ?? 0) - table.shipping.cost - (table.rushFee?.amount ?? 0))}</td>
                </tr>
                <tr>
                  <td colSpan={colCount - 1} className="py-2 pr-4 text-size-sm text-foreground/70">
                    <span>{table.shipping.method}</span>
                  </td>
                  <td className="py-2 pl-4 text-right text-size-sm text-foreground/70">{fmt(table.shipping.cost)}</td>
                </tr>
              </>
            )}
            {table.rushFee && (
              <tr>
                <td colSpan={colCount - 1} className="py-2 pr-4 text-size-sm text-foreground/70">
                  <span>{table.rushFee.label}</span>
                  {table.rushFee.note && (
                    <span className="block text-size-xs text-muted-foreground mt-0.5">{table.rushFee.note}</span>
                  )}
                </td>
                <td className="py-2 pl-4 text-right text-size-sm text-foreground/70">{fmt(table.rushFee.amount)}</td>
              </tr>
            )}
            {table.discount && (
              <tr>
                <td colSpan={colCount - 1} className="py-2 pr-4 text-size-sm text-foreground/70">
                  <span>{table.discount.label} ({table.discount.percentage}%)</span>
                  {table.discount.note && (
                    <span className="block text-size-xs text-muted-foreground mt-0.5">{table.discount.note}</span>
                  )}
                </td>
                <td className="py-2 pl-4 text-right text-size-sm" style={{ color: '#16a34a' }}>−{fmt(table.discount.amount)}</td>
              </tr>
            )}
            <tr className="border-t-2 border-foreground/20">
              <td colSpan={colCount - 1} className="py-3 pr-4 text-size-base font-w-medium text-foreground">TOTAL</td>
              <td className="py-3 pl-4 text-right text-size-base font-w-medium text-foreground">{fmt(table.total)}</td>
            </tr>
          </tfoot>
          )}
        </table>
      </div>
      {(table.pricingNote || table.standardTotal != null || hasAdjustments) && (
        <div className="px-4 py-3 bg-muted/30 border-t border-border space-y-2">
          {table.pricingNote && (
            <div className="text-size-xs text-muted-foreground italic">
              * {table.pricingNote}
            </div>
          )}
          {table.standardTotal != null && (
            <div>
              <span className="text-size-xs text-foreground/60">
                <span className="font-w-medium">Price comparison:</span>{' '}
                Standard {fmt(table.standardTotal)} → Rush {fmt(table.total)} (+{(((table.total - table.standardTotal) / table.standardTotal) * 100).toFixed(1)}%)
              </span>
            </div>
          )}
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
    <div className={`p-3.5 ${bg} rounded-lg mb-4`} style={{ border: `1px solid color-mix(in srgb, ${border} 40%, transparent)`, borderLeft: `3px solid ${border}` }}>
      <div className="flex items-start gap-2.5">
        <Icon size={16} className={`${iconColor} flex-shrink-0 mt-0.5 ${animate ? 'animate-spin' : ''}`} />
        <span className="text-size-sm text-foreground/80 flex-1">{children}</span>
      </div>
    </div>
  );
}

function CategoryTag({ label, color }: { label: string; color: string }) {
  const colors: Record<string, string> = {
    orange: 'bg-secondary text-secondary-foreground',
    blue: 'bg-accent text-accent-foreground',
    green: 'bg-chart-3 text-primary-foreground',
    grey: 'bg-muted text-muted-foreground',
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
  'auto-quoted': { label: 'Auto-Quote', color: 'green', icon: CheckCircle, iconColor: 'text-chart-3', bg: 'bg-chart-3/6', border: 'var(--chart-3)', desc: 'This quote was automatically generated and sent to the customer. The assigned CSR has been CC\'d.' },
  review: { label: 'Needs Review', color: 'orange', icon: AlertTriangle, iconColor: 'text-secondary', bg: 'bg-secondary/6', border: 'var(--secondary)', desc: 'This request was partially quoted but some items could not be resolved automatically. A review request has been sent to the assigned CSR.' },
};

/* ── Email signatures ── */

const APEX_STAFF: Record<string, { name: string; title: string; phone: string }> = {
  'morgan@apex-corp.com': { name: 'Morgan Reisch', title: 'Customer Service Representative', phone: '440.555.7200' },
};

function ApexSignature({ fromEmail }: { fromEmail?: string }) {
  const staff = fromEmail ? APEX_STAFF[fromEmail] : null;
  return (
    <div className="mt-6 pt-4 border-t border-foreground/10">
      <div className="text-size-sm">
        {staff && (
          <>
            <p className="font-w-medium text-foreground">{staff.name}</p>
            <p className="text-foreground/50 mt-0.5" style={{ fontSize: '12px' }}>{staff.title}</p>
          </>
        )}
        <p className={`font-w-medium text-foreground tracking-wide ${staff ? 'mt-2' : ''}`} style={{ fontSize: '18px', lineHeight: '22px' }}>
          <span style={{ color: 'var(--primary)' }}>APEX</span>
        </p>
        <p className="text-foreground/60 mt-1">Apex Supply Corporation</p>
        <p className="text-foreground/40 mt-0.5" style={{ fontSize: '12px' }}>
          {staff ? `${staff.phone} | ` : ''}quotes@apex-corp.com | www.apex-corp.com
        </p>
      </div>
    </div>
  );
}

const CUSTOMER_SIGNATURES: Record<string, { name: string; title: string; company: string; phone: string; website: string }> = {
  'jschahal@rcsca.com': { name: 'Jawinder Schahal', title: 'Purchasing Manager', company: 'RCSCA', phone: '905.555.2140', website: 'www.rcsca.com' },
  'dmorrison@tristatecoil.com': { name: 'Dave Morrison', title: 'Operations Manager', company: 'Tri-State Coil Winding', phone: '614.555.8732', website: 'www.tristatecoil.com' },
  'slanders@stonitecoil.com': { name: 'Steve Landers', title: 'Procurement Specialist', company: 'Stonite Coil Corp', phone: '330.555.6194', website: 'www.stonitecoil.com' },
  'gtillman@midwestpower.com': { name: 'Gary Tillman', title: 'Maintenance Manager', company: 'Midwest Power Generators', phone: '816.555.0473', website: 'www.midwestpower.com' },
  'kwalsh@northeastmotor.com': { name: 'Karen Walsh', title: 'Purchasing Coordinator', company: 'Northeast Motor Supply', phone: '203.555.3891', website: 'www.northeastmotor.com' },
  'mhernandez@gulfcoastindustrial.com': { name: 'Mike Hernandez', title: 'Warehouse Supervisor', company: 'Gulf Coast Industrial', phone: '713.555.4205', website: 'www.gulfcoastindustrial.com' },
  'ltorres@consolidated-electric.com': { name: 'Lisa Torres', title: 'Supply Chain Analyst', company: 'Consolidated Electric', phone: '312.555.7168', website: 'www.consolidated-electric.com' },
  'hemnant@motion.com': { name: 'Herman Nant', title: 'Regional Buyer', company: 'Motion Industries Inc.', phone: '205.555.9430', website: 'www.motion.com' },
};

function CustomerSignature({ email: fromEmail }: { email: string }) {
  const sig = CUSTOMER_SIGNATURES[fromEmail];
  if (!sig) return null;
  return (
    <div className="mt-6 pt-4 border-t border-foreground/10">
      <div className="text-size-sm">
        <p className="font-w-medium text-foreground">{sig.name}</p>
        <p className="text-foreground/50 mt-0.5" style={{ fontSize: '12px' }}>{sig.title}</p>
        <p className="font-w-medium text-foreground/70 mt-1" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>{sig.company.toUpperCase()}</p>
        <p className="text-foreground/40 mt-0.5" style={{ fontSize: '12px' }}>
          {sig.phone} | {sig.website}
        </p>
      </div>
    </div>
  );
}

function EmailSignature({ fromEmail }: { fromEmail: string }) {
  if (fromEmail.endsWith('@apex-corp.com')) return <ApexSignature fromEmail={fromEmail} />;
  return <CustomerSignature email={fromEmail} />;
}

/* ── Outlook-style quoted previous message ── */

function QuotedPreviousBlock({ quoted }: { quoted: QuotedPrevious }) {
  const avatarImg = getAvatarImage(quoted.from, false);
  return (
    <div className="mt-6 -mx-6 -mb-3">
      <div className="mx-6 border-t-2 border-foreground/25 mb-4" />
      <div className="px-6 flex items-start gap-3 mb-3">
        {avatarImg ? (
          <img src={avatarImg} alt={quoted.from} className="w-10 h-10 rounded-full flex-shrink-0 object-cover mt-0.5" />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white mt-0.5"
            style={{ backgroundColor: getAvatarColor(quoted.from, false), fontSize: '12px', fontWeight: 600 }}
          >
            {getInitials(quoted.from, false)}
          </div>
        )}
        <div className="space-y-0.5">
        <p className="text-size-sm">
          <span className="font-w-semibold text-foreground">From:</span>{' '}
          <span className="text-foreground/80">{quoted.from} &lt;{quoted.fromEmail}&gt;</span>
        </p>
        <p className="text-size-sm">
          <span className="font-w-semibold text-foreground">Sent:</span>{' '}
          <span className="text-foreground/80">{quoted.date} {quoted.time}</span>
        </p>
        {quoted.to && (
          <p className="text-size-sm">
            <span className="font-w-semibold text-foreground">To:</span>{' '}
            <span className="text-foreground/80">{quoted.to}</span>
          </p>
        )}
        {quoted.subject && (
          <p className="text-size-sm">
            <span className="font-w-semibold text-foreground">Subject:</span>{' '}
            <span className="text-foreground/80">{quoted.subject}</span>
          </p>
        )}
        </div>
      </div>
      <div className="px-6 py-3">
        <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{quoted.body}</p>
        {quoted.fromEmail && <EmailSignature fromEmail={quoted.fromEmail} />}
      </div>
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
  const colCount = hasAnyPricing ? 4 : 2;

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
            <th className="py-2 text-left pr-4 text-size-sm font-w-medium text-foreground">Item</th>
            <th className="py-2 text-right px-4 text-size-sm font-w-medium text-foreground">Qty</th>
            {hasAnyPricing && <th className="py-2 text-right px-4 text-size-sm font-w-medium text-foreground">Unit Price</th>}
            {hasAnyPricing && <th className="py-2 text-right pl-4 text-size-sm font-w-medium text-foreground">Est. Total</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            const qtyBelowMOQ = item.quantity != null && item.minOrderQty != null && item.quantity < item.minOrderQty;

            return (
              <tr key={i} className="border-b border-border">
                <td className="py-1.5 pr-4 text-size-sm">
                  <span className="font-w-medium text-foreground/80">{item.matchedItem || item.requestedItem}</span>
                  {item.description && (
                    <span className="block text-size-xs text-muted-foreground mt-0.5">{item.description}</span>
                  )}
                  {item.details && (
                    <span className="block text-size-xs text-secondary mt-1">{item.details}</span>
                  )}
                </td>
                <td className="py-1.5 px-4 text-right text-size-sm align-top">
                  {item.quantity != null ? (
                    <span className={qtyBelowMOQ ? 'text-secondary font-w-medium' : 'text-foreground/80'}>{item.quantity.toLocaleString()}</span>
                  ) : (
                    <span className="text-muted-foreground italic">—</span>
                  )}
                  {item.minOrderQty != null && (
                    <span className="block text-size-xs text-muted-foreground">
                      min {item.minOrderQty}
                    </span>
                  )}
                </td>
                {hasAnyPricing && (
                  <td className="py-1.5 px-4 text-right text-size-sm text-foreground/80 align-top">
                    {item.unitPrice != null ? fmt(item.unitPrice) : <span className="text-muted-foreground italic">—</span>}
                  </td>
                )}
                {hasAnyPricing && (
                  <td className="py-1.5 pl-4 text-right text-size-sm text-foreground/80 align-top">
                    {item.totalPrice != null ? fmt(item.totalPrice) : <span className="text-muted-foreground italic">—</span>}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
        {hasAnyPricing && (() => {
          const estimatedTotal = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
          return (
            <tfoot>
              <tr className="border-t-2 border-foreground/20">
                <td colSpan={colCount - 1} className="py-2.5 pr-4 text-size-sm font-w-medium text-foreground">Estimated Total</td>
                <td className="py-1.5 pl-4 text-right text-size-sm font-w-medium text-foreground">{fmt(estimatedTotal)}</td>
              </tr>
            </tfoot>
          );
        })()}
      </table>

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
        <div
          className="mb-3 p-3 border border-border rounded-[var(--radius)] bg-card min-h-[100px] whitespace-pre-wrap text-size-sm text-foreground/80 focus:outline-none focus:ring-1 focus:ring-primary/30"
          contentEditable
          suppressContentEditableWarning
        >
          {prefillBody}
        </div>
        <div className="flex items-center gap-2 pt-3 border-t border-border">
          {hintSend ? (
            <ActionHint>
              <button
                onClick={onSend}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2 text-size-sm"
              >
                <Send size={14} /> Send
              </button>
            </ActionHint>
          ) : (
            <button
              onClick={onSend}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2 text-size-sm"
            >
              <Send size={14} /> Send
            </button>
          )}
          <button
            onClick={onDiscard}
            className="px-4 py-2 bg-card border border-border text-foreground rounded-full hover:bg-muted transition-colors text-size-sm"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Message header (single email, not threaded) ── */

function PresenceDot({ status }: { status: 'available' | 'busy' | 'away' | 'offline' }) {
  const colors = { available: '#92c353', busy: '#c4314b', away: '#eaa300', offline: '#d1d1d1' };
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0 border border-white"
      style={{ backgroundColor: colors[status] }}
    />
  );
}

function hashPresence(name: string): 'available' | 'busy' | 'away' | 'offline' {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  const statuses: ('available' | 'busy' | 'away' | 'offline')[] = ['available', 'busy', 'away', 'offline'];
  return statuses[Math.abs(h) % statuses.length];
}

function MessageHeader({ email }: { email: Email }) {
  const isSystemEmail = email.fromEmail === 'quotes@apex-corp.com' || email.isCcFromAi || email.isReviewRequest;
  const avatarImg = getAvatarImage(email.from, isSystemEmail);

  const toRecipients = email.to.split(/[,;]\s*/).map(r => r.trim()).filter(Boolean);
  const ccRecipients = email.cc ? email.cc.split(/[,;]\s*/).map(r => r.trim()).filter(Boolean) : [];

  return (
    <div className="flex items-start gap-3 px-5 py-3 border-b border-border">
      {isSystemEmail ? (
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10 border border-primary/20 mt-0.5">
          <Bot size={18} className="text-primary" />
        </div>
      ) : avatarImg ? (
        <img
          src={avatarImg}
          alt={email.from}
          className="w-10 h-10 rounded-full flex-shrink-0 object-cover mt-0.5"
        />
      ) : (
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white mt-0.5"
          style={{ backgroundColor: getAvatarColor(email.from, isSystemEmail), fontSize: '12px', fontWeight: 600 }}
        >
          {getInitials(email.from, isSystemEmail)}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <PresenceDot status={isSystemEmail ? 'available' : hashPresence(email.from)} />
            <span className="text-size-sm font-w-medium text-foreground truncate">{email.from}</span>
            <span className="text-size-xs text-muted-foreground truncate">&lt;{email.fromEmail}&gt;</span>
          </div>
          <span className="text-size-xs text-muted-foreground flex-shrink-0 ml-3">{email.date} {email.time}</span>
        </div>
        <div className="flex items-center gap-1 mt-1 flex-wrap text-size-xs">
          <span className="text-muted-foreground flex-shrink-0">To:</span>
          {toRecipients.map((r, i) => (
            <span key={i} className="inline-flex items-center gap-1 text-foreground/70">
              <PresenceDot status={hashPresence(r)} />
              <span>{r}{i < toRecipients.length - 1 || ccRecipients.length > 0 ? ';' : ''}</span>
            </span>
          ))}
          {ccRecipients.length > 0 && (
            <>
              <span className="text-muted-foreground flex-shrink-0 ml-1">Cc:</span>
              {ccRecipients.map((r, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-foreground/70">
                  <PresenceDot status={hashPresence(r)} />
                  <span>{r}{i < ccRecipients.length - 1 ? ';' : ''}</span>
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Main component — Flat email detail (one email per view)
   ══════════════════════════════════════════════════════════════════════════ */

export function EmailDetail({ email, folderType, reviewResolved, onReviewResolve, reviewStage, onReviewStageChange, reviewComposeMode, onReviewComposeModeChange, onReviewSend, reviewForwardStage, forwardStage, onForwardCompose, onForwardSend, onForwardDiscard, approvalStage, onApprovalCompose, onApprovalSend, onApprovalDiscard, onDeleteEmail, hintTarget }: {
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
  forwardStage?: 'pending' | 'composing' | 'sent' | 'processing' | 'quoted';
  onForwardCompose?: () => void;
  onForwardSend?: () => void;
  onForwardDiscard?: () => void;
  approvalStage?: 'pending' | 'composing' | 'approved' | 'sent';
  onApprovalCompose?: () => void;
  onApprovalSend?: () => void;
  onApprovalDiscard?: () => void;
  onDeleteEmail?: (id: string) => void;
  hintTarget?: string | null;
}) {
  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center bg-card rounded-lg shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-14 mb-4 flex items-center justify-center">
            <div className="w-14 h-11 border-2 border-dashed rounded-lg flex items-center justify-center" style={{ borderColor: 'rgba(0,68,106,0.25)' }}>
              <Inbox size={22} className="text-primary/20" />
            </div>
          </div>
          <p className="text-size-base font-w-medium text-foreground/80 mb-0.5">No Conversation Selected</p>
          <p className="text-size-xs text-muted-foreground">Select a conversation to read.</p>
        </div>
      </div>
    );
  }

  // Ref for the scrollable content area — used to auto-scroll to compose box
  const contentScrollRef = useRef<HTMLDivElement>(null);

  const [topFade, setTopFade] = useState(0);
  const [bottomFade, setBottomFade] = useState(0);
  const [showOlderReplies, setShowOlderReplies] = useState(false);

  useEffect(() => {
    const el = contentScrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 10) { setTopFade(0); setBottomFade(0); return; }
      const fadeThreshold = 350;
      setTopFade(Math.max(0, Math.min(1, scrollTop / fadeThreshold)));
      const distFromBottom = maxScroll - scrollTop;
      setBottomFade(Math.max(0, Math.min(1, distFromBottom / fadeThreshold)));
    };
    el.addEventListener('scroll', handleScroll);
    const ro = new ResizeObserver(handleScroll);
    ro.observe(el);
    setTimeout(handleScroll, 200);
    return () => { el.removeEventListener('scroll', handleScroll); ro.disconnect(); };
  }, [email.id]);

  // Auto-scroll to top when compose box appears (review reply or forward compose)
  useEffect(() => {
    if ((reviewStage === 'composing' || effectiveForwardStage === 'composing' || reviewForwardStage === 'composing' || approvalStage === 'composing') && contentScrollRef.current) {
      // Small delay to ensure compose box has rendered before scrolling
      setTimeout(() => {
        contentScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    }
  }, [reviewStage, forwardStage, reviewForwardStage, approvalStage]);

  // Auto-scroll to bottom when email changes (show original request first for demo)
  useEffect(() => {
    setShowOlderReplies(false);
    if (contentScrollRef.current) {
      setTimeout(() => {
        contentScrollRef.current?.scrollTo({ top: contentScrollRef.current.scrollHeight, behavior: 'auto' });
      }, 150);
    }
  }, [email.id]);

  const isReview = email.isReviewRequest;
  const isDirectQuote = email.isDirectQuoteRequest;
  const isCc = email.isCcFromAi;
  const entry = getEntry(email.id);
  const isSteveClarification = entry?.role === 'clarification';
  const isApprovalHold = email.isApprovalHold;

  // Use reviewForwardStage for Steve's clarification (auto-processed), forwardStage for others
  const effectiveForwardStage = isSteveClarification ? reviewForwardStage : forwardStage;
  const effectiveOnForwardCompose = isSteveClarification ? undefined : onForwardCompose;
  const effectiveOnForwardSend = isSteveClarification ? undefined : onForwardSend;
  const effectiveOnForwardDiscard = isSteveClarification ? undefined : onForwardDiscard;
  const hasInlineQuote = !!email.inlineQuoteTable;
  const hasCcQuote = !!email.isCcFromAiQuoteTable;


  /* ── Email type chip (faint grey, always visible) ── */

  const getTypeChip = (): string | null => {
    const category = getEmailCategory(email.id);
    if (category) return category;
    if (isDirectQuote) return 'Direct Quote Request';
    if (isCc || email.quoteStatus === 'auto-quoted' || email.quoteStatus === 'quoted') return 'Auto-Quote';
    return null;
  };

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
    if (isCc) {
      // Check if this was reviewed by a rep before being sent
      const wasReviewed = email.quotedPrevious?.fromEmail?.includes('@apex-corp.com');
      return <CategoryTag label={wasReviewed ? "Reviewed & Quoted" : "Auto-Quoted"} color={wasReviewed ? "grey" : "green"} />;
    }
    // CSR review request
    if (isReview) {
      if (reviewStage === 'sending') return <CategoryTag label="Sending" color="blue" />;
      if (reviewStage === 'resolved') return <CategoryTag label="Sent" color="grey" />;
      return <CategoryTag label="Draft Ready" color="orange" />;
    }
    // CSR direct quote
    if (isDirectQuote) {
      if (effectiveForwardStage === 'quoted') return <CategoryTag label="Forwarded & Quoted" color="grey" />;
      if (effectiveForwardStage === 'processing' || effectiveForwardStage === 'sent') return <CategoryTag label="Forwarded" color="blue" />;
      if (effectiveForwardStage === 'composing') return <CategoryTag label="Forwarding..." color="blue" />;
      return <CategoryTag label="Quote Request" color="orange" />;
    }
    // Approval hold
    if (isApprovalHold) {
      if (approvalStage === 'sent') return <CategoryTag label="Approved & Sent" color="grey" />;
      if (approvalStage === 'approved') return <CategoryTag label="Sending..." color="blue" />;
      return <CategoryTag label="Pending Approval" color="orange" />;
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
    // Steve's clarification info bars — auto-processed since quotes@ was CC'd
    if (isSteveClarification) {
      if (effectiveForwardStage === 'quoted') {
        return (
          <InfoBar icon={CheckCircle} iconColor="text-chart-3" bg="bg-chart-3/6" border="var(--chart-3)">
            Customer response auto-processed. A quote has been generated and sent to{' '}
            <span className="font-w-medium">Steve Landers (Stonite Coil Corp)</span>. You've been CC'd on the response.
          </InfoBar>
        );
      }
      if (effectiveForwardStage === 'processing' || effectiveForwardStage === 'sent') {
        return (
          <InfoBar icon={Loader2} iconColor="text-accent" bg="bg-accent/6" border="var(--accent)" animate>
            Customer reply CC'd <span className="font-w-medium">quotes@apex-corp.com</span>. Automatically generating quote with updated details...
          </InfoBar>
        );
      }
      return (
        <InfoBar icon={Loader2} iconColor="text-accent" bg="bg-accent/6" border="var(--accent)" animate>
          Customer reply CC'd <span className="font-w-medium">quotes@apex-corp.com</span>. Automatically generating quote with updated details...
        </InfoBar>
      );
    }
    // Approval hold info bars
    if (isApprovalHold) {
      if (approvalStage === 'sent') {
        return (
          <InfoBar icon={CheckCircle} iconColor="text-chart-3" bg="bg-chart-3/6" border="var(--chart-3)">
            Quote approved and sent to{' '}
            <span className="font-w-medium">{email.approvalCustomerName || 'the customer'}</span>. You've been CC'd on the response.
          </InfoBar>
        );
      }
      if (approvalStage === 'approved') {
        return (
          <InfoBar icon={Loader2} iconColor="text-accent" bg="bg-accent/6" border="var(--accent)" animate>
            Sending approved quote to{' '}
            <span className="font-w-medium">{email.approvalCustomerName || 'the customer'}</span>...
          </InfoBar>
        );
      }
      return (
        <InfoBar icon={AlertTriangle} iconColor="text-secondary" bg="bg-secondary/6" border="var(--secondary)">
          {email.approvalReason || 'This quote requires approval before sending.'}. Review the quote below and approve or edit before sending to{' '}
          <span className="font-w-medium">{email.approvalCustomerName || 'the customer'}</span>.
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
    // Approval hold: show quote table for review
    if (isApprovalHold && email.approvalQuoteTable) {
      return (
        <>
          <p className="text-size-sm mb-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-accent underline hover:text-accent/80 cursor-pointer">
              Click here to view decision support analytics
            </a>
          </p>
          {email.bodyBefore && <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{email.bodyBefore}</p>}
          <QuoteTableView table={email.approvalQuoteTable} />
          {email.bodyAfter && <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{email.bodyAfter}</p>}
          {email.quotedPrevious && <QuotedPreviousBlock quoted={email.quotedPrevious} />}
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
          <EmailSignature fromEmail={email.fromEmail} />
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
          <EmailSignature fromEmail={email.fromEmail} />
          {email.quotedPrevious && <QuotedPreviousBlock quoted={email.quotedPrevious} />}
        </>
      );
    }
    // Plain email
    return (
      <>
        <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{email.body}</p>
        <EmailSignature fromEmail={email.fromEmail} />
        {email.quotedPrevious && <QuotedPreviousBlock quoted={email.quotedPrevious} />}

        {/* WF3: Show the auto-generated quote inline once the forward is complete */}
        {isDirectQuote && effectiveForwardStage === 'quoted' && email.forwardAiResponse && (
          <div className="mt-8 border-t-2 border-foreground/15 pt-6">
            <div className="flex items-center gap-2 mb-4">
              {(() => {
                return (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10 border border-primary/20">
                    <Bot size={16} className="text-primary" />
                  </div>
                );
              })()}
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
            <EmailSignature fromEmail={email.forwardAiResponse.fromEmail} />
          </div>
        )}
      </>
    );
  };

  /* ── Actions ── */

  return (
    <div className="flex-1 min-w-0 min-h-0 flex flex-col bg-card rounded-lg shadow-lg overflow-hidden">
      {/* Subject + tags + header actions */}
      <div className="px-5 pt-2 pb-1.5 border-b border-border">
        <div className="flex items-center gap-1.5">
          <h1 className="text-size-base font-w-medium text-foreground flex-1 min-w-0 truncate">{email.subject}</h1>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <button className="flex items-center gap-1 px-1.5 py-0.5 text-foreground/50 hover:text-foreground/70 hover:bg-muted rounded transition-colors" style={{ fontSize: '11px' }}>
              <ClipboardList size={12} /> Summarize
            </button>
            <button className="p-1 text-foreground/40 hover:text-foreground/60 hover:bg-muted rounded transition-colors">
              <Smile size={13} />
            </button>
            {/* Workflow-aware action buttons */}
            {(() => {
              const isProcessing = (isReview && (reviewStage === 'composing' || reviewStage === 'sending'))
                || ((isSteveClarification || isDirectQuote) && (effectiveForwardStage === 'composing' || effectiveForwardStage === 'sent' || effectiveForwardStage === 'processing'))
                || (isApprovalHold && (approvalStage === 'approved' || approvalStage === 'composing'));
              const replyHighlighted = isApprovalHold && approvalStage === 'pending' && hintTarget === 'action:reply';
              const forwardHighlighted = (
                (isReview && reviewStage === 'pending' && hintTarget === 'action:forward')
                || ((isSteveClarification || isDirectQuote) && effectiveForwardStage === 'pending' && hintTarget === 'action:forward')
              );
              const replyClick = () => {
                if (isReview && reviewStage === 'pending') {
                  onReviewComposeModeChange('reply');
                  onReviewStageChange('composing');
                } else if (isApprovalHold && approvalStage === 'pending') {
                  onApprovalCompose?.();
                }
              };
              const forwardClick = () => {
                if (isReview && reviewStage === 'pending') {
                  onReviewComposeModeChange('forward');
                  onReviewStageChange('composing');
                } else if ((isSteveClarification || isDirectQuote) && effectiveForwardStage === 'pending') {
                  effectiveOnForwardCompose?.();
                }
              };
              if (isProcessing) {
                return (
                  <div className="flex items-center gap-1 ml-1">
                    <Loader2 size={12} className="text-accent animate-spin" />
                    <span className="text-muted-foreground" style={{ fontSize: '10px' }}>
                      {isReview && reviewStage === 'sending' ? 'Sending...'
                        : isReview && reviewStage === 'composing' ? 'Composing...'
                        : isApprovalHold && approvalStage === 'approved' ? 'Sending...'
                        : isApprovalHold && approvalStage === 'composing' ? 'Composing...'
                        : (isSteveClarification || isDirectQuote) && effectiveForwardStage === 'composing' ? 'Composing...'
                        : 'Processing...'}
                    </span>
                  </div>
                );
              }
              return (
                <>
                  {replyHighlighted ? (
                    <ActionHint>
                      <button onClick={replyClick} className="ml-1 px-3 py-1 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors flex items-center gap-1.5 text-size-sm font-w-medium">
                        <Reply size={13} /> Reply
                      </button>
                    </ActionHint>
                  ) : (
                    <button onClick={replyClick} className="p-1 text-foreground/40 hover:text-foreground/60 hover:bg-muted rounded transition-colors">
                      <Reply size={13} />
                    </button>
                  )}
                  <button className="p-1 text-foreground/40 hover:text-foreground/60 hover:bg-muted rounded transition-colors">
                    <ReplyAll size={13} />
                  </button>
                  {forwardHighlighted ? (
                    <ActionHint>
                      <button onClick={forwardClick} className="ml-1 px-3 py-1 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors flex items-center gap-1.5 text-size-sm font-w-medium">
                        <Forward size={13} /> Forward
                      </button>
                    </ActionHint>
                  ) : (
                    <button onClick={forwardClick} className="p-1 text-foreground/40 hover:text-foreground/60 hover:bg-muted rounded transition-colors">
                      <Forward size={13} />
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 relative">
      {topFade > 0 && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            pointerEvents: 'none',
            height: '30%',
            background: `linear-gradient(to bottom, rgba(255,255,255,${topFade * 0.92}) 0%, rgba(255,255,255,${topFade * 0.6}) 40%, transparent 100%)`,
          }}
        />
      )}
      {bottomFade > 0 && (reviewStage === 'composing' || effectiveForwardStage === 'composing' || approvalStage === 'composing') && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            pointerEvents: 'none',
            height: '25%',
            background: `linear-gradient(to top, rgba(255,255,255,${bottomFade * 0.92}) 0%, rgba(255,255,255,${bottomFade * 0.6}) 40%, transparent 100%)`,
          }}
        />
      )}
      <div className="absolute inset-0 overflow-y-auto" ref={contentScrollRef} data-scroll-sync="email-detail">
        {/* ── Approval hold composing: Reply with "Approved" ── */}
        {isApprovalHold && approvalStage === 'composing' && (
          <ComposeBox
            toEmail="quotes@apex-corp.com"
            subject={email.subject}
            prefillBody="Approved, go ahead and send the client the quote."
            onSend={() => onApprovalSend?.()}
            onDiscard={() => onApprovalDiscard?.()}
            hintSend={hintTarget === 'action:send'}
          />
        )}

        {/* ── Review composing (reply mode): Show compose box above message ── */}
        {isReview && reviewStage === 'composing' && reviewComposeMode === 'reply' && email.reviewReply && (
          <ComposeBox
            toEmail="quotes@apex-corp.com"
            subject={email.subject}
            prefillBody={email.reviewReply.body}
            onSend={onReviewSend}
            onDiscard={() => onReviewStageChange('pending')}
            hintSend={hintTarget === 'action:send'}
          />
        )}

        {/* ── Review composing (forward mode): Compose box with quote + signature, thread below ── */}
        {isReview && reviewStage === 'composing' && reviewComposeMode === 'forward' && (
          <div className="border-b border-border">
            <div className="flex items-center justify-between px-6 py-2 bg-muted border-b border-border">
              <div className="flex items-center gap-2">
                <Forward size={14} className="text-muted-foreground" />
                <span className="text-size-xs text-muted-foreground">Forwarding to customer</span>
              </div>
              <button
                onClick={() => onReviewStageChange('pending')}
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
                  <span className="text-size-sm text-foreground">{email.reviewOriginalEmail?.fromEmail || ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-size-xs text-muted-foreground w-10 flex-shrink-0">Subj:</span>
                  <span className="text-size-sm text-foreground">Re: {email.reviewOriginalEmail?.subject || email.subject}</span>
                </div>
              </div>
              <div className="p-4 border border-border rounded-[var(--radius)] bg-card">
                <p
                  className="whitespace-pre-wrap text-size-sm text-foreground/80 focus:outline-none"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Hi {email.originalSender?.split(' ')[0] || 'there'},{'\n\n'}Thank you for your quote request. We need a few additional details to finalize your quote. Could you please confirm the items noted below?
                </p>

                {email.reviewMatchItems && email.reviewQuoteNumber && email.reviewCustomerAccount && (
                  <ReviewMatchTable
                    items={email.reviewMatchItems}
                    quoteNumber={email.reviewQuoteNumber}
                    customerAccount={email.reviewCustomerAccount}
                  />
                )}

                <div className="mt-6 pt-4 border-t border-foreground/10">
                  <div className="flex items-start gap-3">
                    <img
                      src={imgMorgan}
                      alt="Morgan Reisch"
                      className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                    />
                    <div className="text-size-sm">
                      <p className="font-w-medium text-foreground">Morgan Reisch</p>
                      <p className="text-foreground/50 mt-0.5" style={{ fontSize: '12px' }}>Customer Service Representative</p>
                      <p className="font-w-medium text-foreground tracking-wide mt-2" style={{ fontSize: '18px', lineHeight: '22px' }}>
                        <span style={{ color: 'var(--primary)' }}>APEX</span>
                      </p>
                      <p className="text-foreground/60 mt-1">Apex Supply Corporation</p>
                      <p className="text-foreground/40 mt-0.5" style={{ fontSize: '12px' }}>
                        440.555.7200 | quotes@apex-corp.com | www.apex-corp.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3">
                {hintTarget === 'action:send' ? (
                  <ActionHint>
                    <button
                      onClick={onReviewSend}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2 text-size-sm"
                    >
                      <Send size={14} /> Send
                    </button>
                  </ActionHint>
                ) : (
                  <button
                    onClick={onReviewSend}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2 text-size-sm"
                  >
                    <Send size={14} /> Send
                  </button>
                )}
                <button
                  onClick={() => onReviewStageChange('pending')}
                  className="px-4 py-2 bg-card border border-border text-foreground rounded-full hover:bg-muted transition-colors text-size-sm"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}

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
                  <div
                    className="mt-3 mb-3 p-3 border border-border rounded-[var(--radius)] bg-card min-h-[80px] whitespace-pre-wrap text-size-sm text-foreground/80 focus:outline-none focus:ring-1 focus:ring-primary/30"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    {email.forwardNote || ''}
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-border">
                    {hintTarget === 'action:send' ? (
                      <ActionHint>
                        <button
                          onClick={() => effectiveOnForwardSend?.()}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2 text-size-sm"
                        >
                          <Send size={14} /> Send
                        </button>
                      </ActionHint>
                    ) : (
                      <button
                        onClick={() => effectiveOnForwardSend?.()}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2 text-size-sm"
                      >
                        <Send size={14} /> Send
                      </button>
                    )}
                    <button
                      onClick={() => effectiveOnForwardDiscard?.()}
                      className="px-4 py-2 bg-card border border-border text-foreground rounded-full hover:bg-muted transition-colors text-size-sm"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Thread: newer messages above main email (agent responses) */}
            {email.threadHistory && (() => {
              const newer = effectiveForwardStage === 'quoted'
                ? [...email.threadHistory].filter(m => m.quoteTable).reverse()
                : [];
              const older = [...email.threadHistory].filter(m => !m.quoteTable).reverse();
              const renderThreadMsg = (msg: typeof email.threadHistory[number], idx: number) => {
                const isSystem = msg.fromEmail === 'quotes@apex-corp.com';
                const avatarImg = getAvatarImage(msg.from, isSystem);
                const toRecips = msg.to.split(/[,;]\s*/).map(r => r.trim()).filter(Boolean);
                const ccRecips = msg.cc ? msg.cc.split(/[,;]\s*/).map(r => r.trim()).filter(Boolean) : [];
                return (
                  <div key={idx} className="border-t-2 border-foreground/10">
                    <div className="flex items-start gap-3 px-5 py-3 border-b border-border">
                      {isSystem ? (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10 border border-primary/20 mt-0.5">
                          <Bot size={18} className="text-primary" />
                        </div>
                      ) : avatarImg ? (
                        <img src={avatarImg} alt={msg.from} className="w-10 h-10 rounded-full flex-shrink-0 object-cover mt-0.5" />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white mt-0.5"
                          style={{ backgroundColor: getAvatarColor(msg.from, isSystem), fontSize: '12px', fontWeight: 600 }}
                        >
                          {getInitials(msg.from, isSystem)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <PresenceDot status={isSystem ? 'available' : hashPresence(msg.from)} />
                            <span className="text-size-sm font-w-medium text-foreground truncate">{msg.from}</span>
                            <span className="text-size-xs text-muted-foreground truncate">&lt;{msg.fromEmail}&gt;</span>
                          </div>
                          <span className="text-size-xs text-muted-foreground flex-shrink-0 ml-3">{msg.date} {msg.time}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 flex-wrap text-size-xs">
                          <span className="text-muted-foreground flex-shrink-0">To:</span>
                          {toRecips.map((r, i) => (
                            <span key={i} className="inline-flex items-center gap-1 text-foreground/70">
                              <PresenceDot status={hashPresence(r)} />
                              <span>{r}{i < toRecips.length - 1 || ccRecips.length > 0 ? ';' : ''}</span>
                            </span>
                          ))}
                          {ccRecips.length > 0 && (
                            <>
                              <span className="text-muted-foreground flex-shrink-0 ml-1">Cc:</span>
                              {ccRecips.map((r, i) => (
                                <span key={i} className="inline-flex items-center gap-1 text-foreground/70">
                                  <PresenceDot status={hashPresence(r)} />
                                  <span>{r}{i < ccRecips.length - 1 ? ';' : ''}</span>
                                </span>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-4">
                      {msg.quoteTable ? (
                        <>
                          {msg.bodyBefore && <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{msg.bodyBefore}</p>}
                          <QuoteTableView table={msg.quoteTable} />
                          {msg.bodyAfter && <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{msg.bodyAfter}</p>}
                        </>
                      ) : (
                        <p className="whitespace-pre-wrap text-size-sm text-foreground/80">{msg.body}</p>
                      )}
                      <EmailSignature fromEmail={msg.fromEmail} />
                    </div>
                  </div>
                );
              };
              return (
                <>
                  {newer.map(renderThreadMsg)}
                  {newer.length > 0 && <div className="border-t-2 border-foreground/15" />}
                  <MessageHeader email={email} />
                  <div className="px-6 py-4">
                    {getInfoBar()}
                    {renderBody()}
                  </div>
                  {older.length > 0 && (
                    <>
                      <button
                        onClick={() => setShowOlderReplies(!showOlderReplies)}
                        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors group"
                      >
                        <div className="flex-1 h-px bg-foreground/10" />
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted/50 group-hover:bg-muted group-hover:border-foreground/20 transition-colors text-size-xs text-muted-foreground group-hover:text-foreground/70 flex-shrink-0">
                          {showOlderReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          {older.length} earlier {older.length === 1 ? 'reply' : 'replies'}
                        </span>
                        <div className="flex-1 h-px bg-foreground/10" />
                      </button>
                      {showOlderReplies && older.map(renderThreadMsg)}
                    </>
                  )}
                </>
              );
            })()}

            {/* Standard layout when no thread history */}
            {!email.threadHistory && (
              <>
                <MessageHeader email={email} />
                <div className="px-6 py-4">
                  {getInfoBar()}
                  {renderBody()}
                </div>
              </>
            )}

            {/* Threaded quote response — renders as a separate message in the conversation */}
            {email.threadedQuoteResponse && (() => {
              const thr = email.threadedQuoteResponse;
              return (
                <div className="border-t-2 border-foreground/10">
                  {/* Thread message header */}
                  <div className="flex items-start gap-3 px-6 py-4 border-b border-border">
                    {(() => {
                      const thrSystem = thr.fromEmail === 'quotes@apex-corp.com';
                      if (thrSystem) return (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10 border border-primary/20">
                          <Bot size={20} className="text-primary" />
                        </div>
                      );
                      const thrAvatarImg = getAvatarImage(thr.from, false);
                      return thrAvatarImg ? (
                        <img src={thrAvatarImg} alt={thr.from} className="w-10 h-10 rounded-full flex-shrink-0 object-cover" />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                          style={{ backgroundColor: getAvatarColor(thr.from, false), fontSize: '13px', fontWeight: 600 }}
                        >
                          {getInitials(thr.from, false)}
                        </div>
                      );
                    })()}
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
                    <EmailSignature fromEmail={thr.fromEmail} />
                    {thr.quotedPrevious && <QuotedPreviousBlock quoted={thr.quotedPrevious} />}
                  </div>
                </div>
              );
            })()}
          </>
        )}
      </div>
      </div>

    </div>
  );
}