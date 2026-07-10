import { useState, useCallback, useRef, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  ArrowLeft, Plus, Trash2, GripVertical, Save, Pencil, X,
  ChevronDown, ChevronRight, Undo2, ArrowUp, ArrowDown,
  Mail, Reply, Forward, ShieldCheck, AlertTriangle,
  BarChart3, FileText, MessageSquare, CheckCircle2,
} from 'lucide-react';
import type { CustomSequence } from '../data/customSequences';
import {
  getPaletteItems, groupBatchItems, EMAIL_REGISTRY,
  type AvailableEmail, type EmailBundle,
} from '../data/emailRegistry';
import { getAvatarColor, getInitials } from '../lib/avatarUtils';

/* ── Role-based icons ── */

function EmailRoleIcon({ email, size = 12 }: { email: AvailableEmail; size?: number }) {
  const { role, workflowType } = email;
  switch (role) {
    case 'request':
      return <Mail size={size} className="text-blue-500 flex-shrink-0" />;
    case 'response':
      if (workflowType === 'review') return <CheckCircle2 size={size} className="text-emerald-500 flex-shrink-0" />;
      return <Reply size={size} className="text-violet-500 flex-shrink-0" />;
    case 'cc':
      return <Forward size={size} className="text-slate-400 flex-shrink-0" />;
    case 'review-flag':
      return <AlertTriangle size={size} className="text-amber-500 flex-shrink-0" />;
    case 'review-reply':
      return <MessageSquare size={size} className="text-amber-600 flex-shrink-0" />;
    case 'clarification':
      return <MessageSquare size={size} className="text-amber-500 flex-shrink-0" />;
    case 'approval-hold':
      return <ShieldCheck size={size} className="text-orange-500 flex-shrink-0" />;
    case 'approval-cc':
      return <Forward size={size} className="text-slate-400 flex-shrink-0" />;
    case 'summary':
      return <BarChart3 size={size} className="text-indigo-400 flex-shrink-0" />;
    default:
      return <FileText size={size} className="text-muted-foreground flex-shrink-0" />;
  }
}

function deriveBundleSublabel(bundle: EmailBundle): string {
  const count = bundle.emails.length;
  const hasReview = bundle.emails.some(e => e.role === 'review-flag' || e.role === 'clarification');
  const hasApproval = bundle.emails.some(e => e.role === 'approval-hold');
  if (hasReview) return `Thread · ${count} emails · Request → Review → Resolution`;
  if (hasApproval) return `Thread · ${count} emails · Request → Approval → Sent`;
  return `Thread · ${count} emails · Request → Quote → CC`;
}

function BundleIcon({ workflowType, size = 14 }: { workflowType?: string; size?: number }) {
  switch (workflowType) {
    case 'auto-quote':
      return <Reply size={size} className="text-violet-500/60 flex-shrink-0" />;
    case 'review':
      return <AlertTriangle size={size} className="text-amber-500/60 flex-shrink-0" />;
    case 'approval':
      return <ShieldCheck size={size} className="text-orange-500/60 flex-shrink-0" />;
    default:
      return <FileText size={size} className="text-muted-foreground/60 flex-shrink-0" />;
  }
}

/* ── Email descriptions (persisted in localStorage, shared across sequences) ── */

const DESCRIPTIONS_KEY = 'apex-demo-email-descriptions';

function loadDescriptions(): Record<string, string> {
  try {
    const raw = localStorage.getItem(DESCRIPTIONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveDescription(emailId: string, description: string) {
  const all = loadDescriptions();
  if (description.trim()) {
    all[emailId] = description.trim();
  } else {
    delete all[emailId];
  }
  localStorage.setItem(DESCRIPTIONS_KEY, JSON.stringify(all));
}

const ITEM_TYPE = 'email-card';
const BUNDLE_TYPE = 'bundle-card';
const PALETTE_EMAIL = 'palette-email';
const PALETTE_BUNDLE = 'palette-bundle';

interface DragItem {
  kind: 'single';
  emailId: string;
  sourceBatch: number;
  sourceIndex: number;
}

interface BundleDragItem {
  kind: 'bundle';
  bundleId: string;
  emailIds: string[];
  sourceBatch: number;
  sourceStartIndex: number;
  sourceCount: number;
}

type AnyDragItem = DragItem | BundleDragItem;

/* ── Email Preview Panel ── */

function EmailPreviewPanel({
  emailId,
  onClose,
  descriptions,
  onDescriptionChange,
}: {
  emailId: string;
  onClose: () => void;
  descriptions: Record<string, string>;
  onDescriptionChange: (emailId: string, desc: string) => void;
}) {
  const [editingDesc, setEditingDesc] = useState(false);
  const [descDraft, setDescDraft] = useState(descriptions[emailId] || '');

  const entry = EMAIL_REGISTRY.get(emailId);
  if (!entry) return null;

  const email = entry.email;
  const isSystemEmail = email.fromEmail === 'quotes@apex-corp.com' || email.isCcFromAi || email.isReviewRequest;

  const handleSaveDesc = () => {
    onDescriptionChange(emailId, descDraft);
    setEditingDesc(false);
  };

  return (
    <div className="w-[400px] flex-shrink-0 border-l border-border flex flex-col bg-card shadow-[-4px_0_12px_-4px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary/[0.03]">
        <span className="text-size-sm font-w-medium text-foreground">Email Preview</span>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={14} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-start gap-3 px-4 py-3 border-b border-border">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ backgroundColor: getAvatarColor(email.from, !!isSystemEmail), fontSize: '12px', fontWeight: 600 }}
          >
            {getInitials(email.from, isSystemEmail)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5 min-w-0">
              <span className="text-size-sm font-w-medium text-foreground truncate">{email.from}</span>
              <span className="text-size-xs text-muted-foreground truncate">&lt;{email.fromEmail}&gt;</span>
            </div>
            <div className="text-size-xs text-muted-foreground mt-0.5">
              To: {email.to}
              {email.cc && <span> · Cc: {email.cc}</span>}
            </div>
            <div className="text-size-xs text-muted-foreground mt-0.5">
              {email.date} {email.time}
            </div>
          </div>
        </div>
        <div className="px-4 py-2 border-b border-border">
          <div className="flex items-center gap-2">
            <h2 className="text-size-base font-w-medium text-foreground flex-1 min-w-0">{email.subject}</h2>
            {entry.category && (
              <span className="inline-block px-2 py-0.5 font-w-medium rounded-sm bg-primary/8 text-primary/70 flex-shrink-0" style={{ fontSize: '10px', lineHeight: '16px' }}>
                {entry.category}
              </span>
            )}
          </div>
          {editingDesc ? (
            <div className="mt-2">
              <input
                autoFocus
                type="text"
                value={descDraft}
                onChange={(e) => setDescDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveDesc(); if (e.key === 'Escape') setEditingDesc(false); }}
                onBlur={handleSaveDesc}
                placeholder="e.g. Simple auto-quote for two products"
                className="w-full px-2 py-1 text-size-xs border border-primary/40 rounded bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mt-1 group/desc">
              {descriptions[emailId] ? (
                <>
                  <span className="text-size-xs text-foreground/60">{descriptions[emailId]}</span>
                  <button
                    onClick={() => { setDescDraft(descriptions[emailId] || ''); setEditingDesc(true); }}
                    className="p-0.5 rounded text-muted-foreground/0 group-hover/desc:text-muted-foreground/60 hover:!text-foreground transition-colors flex-shrink-0"
                  >
                    <Pencil size={10} />
                  </button>
                  <button
                    onClick={() => onDescriptionChange(emailId, '')}
                    className="p-0.5 rounded text-muted-foreground/0 group-hover/desc:text-muted-foreground/60 hover:!text-destructive transition-colors flex-shrink-0"
                  >
                    <X size={10} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setDescDraft(''); setEditingDesc(true); }}
                  className="p-0.5 rounded text-muted-foreground/40 hover:text-foreground transition-colors"
                  title="Add description"
                >
                  <Pencil size={10} />
                </button>
              )}
            </div>
          )}
        </div>
        <div className="px-4 py-3">
          <p className="whitespace-pre-wrap text-size-sm text-foreground/80 leading-relaxed">{email.body || email.bodyBefore || email.preview}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Single email card in a batch ── */

function EmailCard({
  email,
  batchIndex,
  index,
  onRemove,
  moveItem,
  onSelect,
  isSelected,
  description,
}: {
  email: AvailableEmail;
  batchIndex: number;
  index: number;
  onRemove: () => void;
  moveItem: (drag: AnyDragItem, hoverBatch: number, hoverIndex: number) => void;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
  description?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: (): DragItem => ({ kind: 'single', emailId: email.id, sourceBatch: batchIndex, sourceIndex: index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop<AnyDragItem>({
    accept: [ITEM_TYPE, BUNDLE_TYPE],
    hover(item, monitor) {
      if (!ref.current) return;
      if (item.kind === 'single' && item.sourceBatch === batchIndex && item.sourceIndex === index) return;
      if (item.kind === 'bundle' && item.sourceBatch === batchIndex && item.sourceStartIndex === index) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      const dragIndex = item.kind === 'single' ? item.sourceIndex : item.sourceStartIndex;
      if (item.sourceBatch === batchIndex) {
        if (dragIndex < index && hoverClientY < hoverMiddleY) return;
        if (dragIndex > index && hoverClientY > hoverMiddleY) return;
      }

      moveItem(item, batchIndex, index);
      if (item.kind === 'single') {
        item.sourceBatch = batchIndex;
        item.sourceIndex = index;
      } else {
        item.sourceBatch = batchIndex;
        item.sourceStartIndex = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      onClick={() => onSelect?.(email.id)}
      className={`flex items-center gap-2 px-3 py-2.5 bg-card border rounded-[var(--radius-card)] group transition-all cursor-pointer ${isDragging ? 'opacity-30' : ''} ${isSelected ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'border-border shadow-sm hover:shadow-md hover:border-foreground/25'}`}
    >
      <GripVertical size={14} className="text-muted-foreground flex-shrink-0 cursor-grab" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <EmailRoleIcon email={email} size={13} />
          <span className="text-size-sm font-w-medium text-foreground truncate">{description || email.label}</span>
        </div>
        <span className="text-size-xs text-muted-foreground truncate block ml-[21px]">{description ? email.label : email.from}</span>
      </div>
      {email.typeChip && (
        <span className="inline-block px-2 py-0.5 font-w-medium rounded-sm bg-primary/8 text-primary/70 flex-shrink-0" style={{ fontSize: '10px', lineHeight: '14px' }}>
          {email.typeChip}
        </span>
      )}
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}

/* ── Bundle card in a batch ── */

function BundleCard({
  bundle,
  batchIndex,
  startIndex,
  count,
  onRemove,
  moveItem,
  onSelectEmail,
  selectedEmailId,
}: {
  bundle: EmailBundle;
  batchIndex: number;
  startIndex: number;
  count: number;
  onRemove: () => void;
  moveItem: (drag: AnyDragItem, hoverBatch: number, hoverIndex: number) => void;
  onSelectEmail?: (id: string) => void;
  selectedEmailId?: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isAnySelected = bundle.emailIds.some(id => id === selectedEmailId);

  const [{ isDragging }, drag] = useDrag({
    type: BUNDLE_TYPE,
    item: (): BundleDragItem => ({
      kind: 'bundle',
      bundleId: bundle.bundleId,
      emailIds: bundle.emailIds,
      sourceBatch: batchIndex,
      sourceStartIndex: startIndex,
      sourceCount: count,
    }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop<AnyDragItem>({
    accept: [ITEM_TYPE, BUNDLE_TYPE],
    hover(item, monitor) {
      if (!ref.current) return;
      if (item.kind === 'bundle' && item.sourceBatch === batchIndex && item.sourceStartIndex === startIndex) return;
      if (item.kind === 'single' && item.sourceBatch === batchIndex && item.sourceIndex === startIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      const dragIndex = item.kind === 'single' ? item.sourceIndex : item.sourceStartIndex;
      if (item.sourceBatch === batchIndex) {
        if (dragIndex < startIndex && hoverClientY < hoverMiddleY) return;
        if (dragIndex > startIndex && hoverClientY > hoverMiddleY) return;
      }

      moveItem(item, batchIndex, startIndex);
      if (item.kind === 'single') {
        item.sourceBatch = batchIndex;
        item.sourceIndex = startIndex;
      } else {
        item.sourceBatch = batchIndex;
        item.sourceStartIndex = startIndex;
      }
    },
  });

  drag(drop(ref));

  const bundleSublabel = deriveBundleSublabel(bundle);

  return (
    <div
      ref={ref}
      onClick={() => onSelectEmail?.(bundle.emailIds[0])}
      className={`flex items-center gap-2 px-3 py-2.5 border rounded-[var(--radius-card)] bg-primary/[0.03] group transition-all shadow-sm cursor-pointer ${isDragging ? 'opacity-30' : ''} ${isAnySelected ? 'border-primary/40 ring-2 ring-primary/20 shadow-md' : 'border-primary/20 hover:shadow-md hover:border-foreground/25'}`}
    >
      <GripVertical size={14} className="text-muted-foreground flex-shrink-0 cursor-grab" />
      <BundleIcon workflowType={bundle.emails[0]?.workflowType} size={14} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-size-sm font-w-medium text-foreground truncate">{bundle.label}</span>
        </div>
        <span className="text-size-xs text-muted-foreground truncate block">
          {bundleSublabel}
        </span>
      </div>
      {bundle.typeChip && (
        <span className="inline-block px-2 py-0.5 font-w-medium rounded-sm bg-primary/8 text-primary/70 flex-shrink-0" style={{ fontSize: '10px', lineHeight: '14px' }}>
          {bundle.typeChip}
        </span>
      )}
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}

/* ── Batch drop zone ── */

function BatchZone({
  batchIndex,
  emailIds,
  batchName,
  onBatchNameChange,
  onRemoveEmail,
  onRemoveBundle,
  onRemoveBatch,
  onMoveBatch,
  moveItem,
  onDropNew,
  onDropNewBundle,
  totalBatches,
  onSelectEmail,
  selectedEmailId,
  descriptions,
}: {
  batchIndex: number;
  emailIds: string[];
  batchName: string;
  onBatchNameChange: (batchIndex: number, name: string) => void;
  onRemoveEmail: (batchIndex: number, emailIndex: number) => void;
  onRemoveBundle: (batchIndex: number, startIndex: number, count: number) => void;
  onRemoveBatch: (batchIndex: number) => void;
  onMoveBatch: (batchIndex: number, direction: 'up' | 'down') => void;
  moveItem: (drag: AnyDragItem, hoverBatch: number, hoverIndex: number) => void;
  onDropNew: (emailId: string, batchIndex: number) => void;
  onDropNewBundle: (emailIds: string[], batchIndex: number) => void;
  totalBatches: number;
  onSelectEmail?: (id: string) => void;
  selectedEmailId?: string | null;
  descriptions?: Record<string, string>;
}) {
  const [{ isOver }, drop] = useDrop<
    DragItem | BundleDragItem | { emailId: string; fromPalette: true } | { emailIds: string[]; fromPalette: true; isBundle: true },
    void,
    { isOver: boolean }
  >({
    accept: [ITEM_TYPE, BUNDLE_TYPE, PALETTE_EMAIL, PALETTE_BUNDLE],
    drop(item, monitor) {
      if (monitor.didDrop()) return;
      if ('fromPalette' in item) {
        if ('isBundle' in item) {
          onDropNewBundle(item.emailIds, batchIndex);
        } else {
          onDropNew(item.emailId, batchIndex);
        }
      }
    },
    collect: (monitor) => ({ isOver: monitor.isOver({ shallow: true }) }),
  });

  const displayItems = groupBatchItems(emailIds);

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2.5 gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-[var(--radius)] bg-primary text-primary-foreground font-w-medium whitespace-nowrap flex-shrink-0" style={{ fontSize: '11px', lineHeight: '14px' }}>
            Batch {batchIndex + 1}
          </span>
          {batchName.trim() ? (
            <div className="flex items-center gap-1.5 min-w-0 group/name">
              <span className="text-size-sm font-w-medium text-foreground truncate">
                {batchName.trim()}
              </span>
              <button
                onClick={() => {
                  const el = document.getElementById(`batch-name-input-${batchIndex}`);
                  if (el) (el as HTMLInputElement).focus();
                  onBatchNameChange(batchIndex, batchName);
                }}
                className="p-0.5 rounded text-muted-foreground/0 group-hover/name:text-muted-foreground/60 hover:!text-foreground transition-colors flex-shrink-0"
              >
                <Pencil size={10} />
              </button>
              <button
                onClick={() => onBatchNameChange(batchIndex, '')}
                className="p-0.5 rounded text-muted-foreground/0 group-hover/name:text-muted-foreground/60 hover:!text-destructive transition-colors flex-shrink-0"
              >
                <X size={10} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => {
                const el = document.getElementById(`batch-name-input-${batchIndex}`);
                if (el) (el as HTMLInputElement).focus();
              }}
              className="flex items-center gap-1.5 px-2 py-1 rounded-[var(--radius)] border border-dashed border-foreground/15 hover:border-foreground/30 cursor-text transition-colors group/add"
            >
              <Pencil size={10} className="text-muted-foreground group-hover/add:text-foreground/60 transition-colors" />
              <span className="text-size-xs text-muted-foreground group-hover/add:text-foreground/60 transition-colors">
                Add description...
              </span>
            </div>
          )}
          <input
            id={`batch-name-input-${batchIndex}`}
            type="text"
            value={batchName}
            onChange={(e) => onBatchNameChange(batchIndex, e.target.value)}
            onBlur={(e) => onBatchNameChange(batchIndex, e.target.value.trim())}
            onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
            placeholder="e.g. Customer Specific Pricing"
            className="sr-only focus:not-sr-only focus:relative focus:text-size-xs focus:px-2 focus:py-1 focus:border focus:border-primary/40 focus:rounded focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:min-w-[200px] focus:max-w-xs placeholder:text-muted-foreground/50"
          />
        </div>
        {totalBatches > 1 && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onMoveBatch(batchIndex, 'up')}
              disabled={batchIndex === 0}
              className={`p-1 rounded transition-colors ${batchIndex === 0 ? 'text-muted-foreground/25 cursor-not-allowed' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
              title="Move batch up"
            >
              <ArrowUp size={14} />
            </button>
            <button
              onClick={() => onMoveBatch(batchIndex, 'down')}
              disabled={batchIndex === totalBatches - 1}
              className={`p-1 rounded transition-colors ${batchIndex === totalBatches - 1 ? 'text-muted-foreground/25 cursor-not-allowed' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
              title="Move batch down"
            >
              <ArrowDown size={14} />
            </button>
            <button
              onClick={() => onRemoveBatch(batchIndex)}
              className="text-size-xs text-muted-foreground hover:text-destructive transition-colors px-2 py-1 rounded hover:bg-destructive/5"
            >
              Remove batch
            </button>
          </div>
        )}
      </div>
      <div
        ref={drop as any}
        className={`min-h-[56px] rounded-[var(--radius-card)] border p-2.5 space-y-2 transition-all ${
          isOver ? 'border-primary/50 bg-primary/5 shadow-inner' : 'border-border/60 bg-background/50'
        } ${displayItems.length === 0 ? 'flex items-center justify-center border-dashed border-2' : ''}`}
      >
        {displayItems.length === 0 && (
          <span className="text-size-xs text-muted-foreground">Drag emails here</span>
        )}
        {displayItems.map((item) =>
          item.kind === 'bundle' ? (
            <BundleCard
              key={item.bundle.bundleId}
              bundle={item.bundle}
              batchIndex={batchIndex}
              startIndex={item.startIndex}
              count={item.count}
              onRemove={() => onRemoveBundle(batchIndex, item.startIndex, item.count)}
              moveItem={moveItem}
              onSelectEmail={onSelectEmail}
              selectedEmailId={selectedEmailId}
            />
          ) : (
            <EmailCard
              key={item.email.id}
              email={item.email}
              batchIndex={batchIndex}
              index={item.startIndex}
              onRemove={() => onRemoveEmail(batchIndex, item.startIndex)}
              moveItem={moveItem}
              onSelect={onSelectEmail}
              isSelected={selectedEmailId === item.email.id}
              description={descriptions?.[item.email.id]}
            />
          )
        )}
      </div>
    </div>
  );
}

/* ── Palette: single email ── */

function PaletteEmail({
  email,
  disabled,
  onSelect,
  isSelected,
  description,
}: {
  email: AvailableEmail;
  disabled: boolean;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
  description?: string;
}) {
  const [{ isDragging }, drag] = useDrag({
    type: PALETTE_EMAIL,
    item: { emailId: email.id, fromPalette: true },
    canDrag: !disabled,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <div
      ref={drag as any}
      onClick={() => onSelect?.(email.id)}
      className={`flex items-center gap-2 px-3 py-2.5 rounded-[var(--radius-card)] border transition-all ${
        disabled
          ? 'opacity-35 cursor-not-allowed border-transparent bg-muted/30'
          : isSelected
            ? 'cursor-pointer border-primary ring-2 ring-primary/20 bg-primary/5 shadow-sm'
            : isDragging
              ? 'opacity-30 cursor-grabbing border-primary/30 bg-primary/5'
              : 'cursor-grab border-transparent hover:border-border hover:bg-card hover:shadow-sm'
      }`}
    >
      <EmailRoleIcon email={email} size={13} />
      <div className="flex-1 min-w-0">
        <span className="text-size-sm text-foreground truncate block">{description || email.label}</span>
        <span className="text-size-xs text-muted-foreground truncate block">{description ? email.label : email.from}</span>
      </div>
      {email.typeChip && (
        <span className="inline-block px-2 py-0.5 font-w-medium rounded-sm bg-primary/8 text-primary/70 flex-shrink-0" style={{ fontSize: '10px', lineHeight: '14px' }}>
          {email.typeChip}
        </span>
      )}
    </div>
  );
}

/* ── Palette: bundle ── */

function PaletteBundleItem({
  bundle,
  disabled,
  onSelectEmail,
  selectedEmailId,
  descriptions,
}: {
  bundle: EmailBundle;
  disabled: boolean;
  onSelectEmail?: (id: string) => void;
  selectedEmailId?: string | null;
  descriptions?: Record<string, string>;
}) {
  const [expanded, setExpanded] = useState(true);

  const [{ isDragging }, drag] = useDrag({
    type: PALETTE_BUNDLE,
    item: { emailIds: bundle.emailIds, fromPalette: true, isBundle: true },
    canDrag: !disabled,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <div
      ref={drag as any}
      className={`rounded-[var(--radius-card)] border transition-all ${
        disabled
          ? 'opacity-35 cursor-not-allowed border-transparent bg-muted/30'
          : isDragging
            ? 'opacity-30 cursor-grabbing border-primary/30 bg-primary/5'
            : 'cursor-grab border-primary/15 hover:border-primary/40 bg-primary/[0.03] hover:bg-primary/[0.06] hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <BundleIcon workflowType={bundle.emails[0]?.workflowType} size={13} />
        <div className="flex-1 min-w-0">
          <span className="text-size-sm font-w-medium text-foreground truncate block">{bundle.label}</span>
          <span className="text-size-xs text-muted-foreground">{deriveBundleSublabel(bundle)}</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
        >
          {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>
      </div>
      {expanded && (
        <div className="px-3 pb-2 space-y-1 border-t border-primary/10 pt-2 ml-5">
          {bundle.emails.map((email) => {
            const desc = descriptions?.[email.id];
            return (
              <div
                key={email.id}
                onClick={(e) => { e.stopPropagation(); onSelectEmail?.(email.id); }}
                className={`flex items-center gap-2 px-2 py-1 text-size-xs cursor-pointer rounded transition-colors ${
                  selectedEmailId === email.id ? 'bg-primary/10 ring-1 ring-primary/30' : 'hover:bg-muted/60'
                }`}
              >
                <EmailRoleIcon email={email} size={10} />
                <div className="flex-1 min-w-0">
                  <span className="text-foreground/80 truncate block">{desc || email.label}</span>
                  {desc && <span className="text-foreground/40 truncate block">{email.label}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   Main builder page
   ══════════════════════════════════════════════ */

export interface SequenceEntry {
  id: string;
  name: string;
  type: 'preset' | 'custom';
  batches: { emailIds: string[]; name?: string }[];
  createdAt?: number;
}

export function SequenceBuilder({
  sequences,
  defaultSequenceId,
  onSave,
  onCancel,
}: {
  sequences: SequenceEntry[];
  defaultSequenceId: string | null;
  onSave: (seq: CustomSequence, sourceId: string | null) => void;
  onCancel: () => void;
}) {
  const defaultEntry = sequences.find(s => s.id === defaultSequenceId) || sequences[0];

  const [activeEntryId, setActiveEntryId] = useState<string | null>(defaultEntry?.id || null);
  const [isNewSequence, setIsNewSequence] = useState(false);
  const [name, setName] = useState(defaultEntry?.name || '');
  const [batches, setBatches] = useState<string[][]>(
    defaultEntry?.batches.map(b => [...b.emailIds]) || [[]]
  );
  const [batchNames, setBatchNames] = useState<string[]>(
    defaultEntry?.batches.map(b => b.name || '') || ['']
  );
  const [filterFolder, setFilterFolder] = useState<'all' | 'csr' | 'eis'>('all');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(
    () => defaultEntry?.batches?.[0]?.emailIds?.[0] ?? null
  );
  const [descriptions, setDescriptions] = useState<Record<string, string>>(loadDescriptions);

  const activeEntry = isNewSequence ? undefined : sequences.find(s => s.id === activeEntryId);

  const MAX_UNDO = 50;
  const undoStackRef = useRef<{ batches: string[][]; batchNames: string[] }[]>([]);
  const [undoCount, setUndoCount] = useState(0);

  const pushUndo = useCallback(() => {
    undoStackRef.current.push({
      batches: batches.map(b => [...b]),
      batchNames: [...batchNames],
    });
    if (undoStackRef.current.length > MAX_UNDO) undoStackRef.current.shift();
    setUndoCount(undoStackRef.current.length);
  }, [batches, batchNames]);

  const handleUndo = useCallback(() => {
    const snapshot = undoStackRef.current.pop();
    if (!snapshot) return;
    setBatches(snapshot.batches);
    setBatchNames(snapshot.batchNames);
    setUndoCount(undoStackRef.current.length);
  }, []);

  const usedIds = new Set(batches.flat());

  const paletteItems = getPaletteItems();
  const filteredPalette = paletteItems.filter(item => {
    if (filterFolder === 'all') return true;
    if (item.kind === 'single') return item.email.folder === filterFolder;
    return item.bundle.emails.some(e => e.folder === filterFolder);
  });

  const handleSelectEmail = useCallback((id: string) => {
    setSelectedEmailId(prev => prev === id ? null : id);
  }, []);

  const handleDescriptionChange = useCallback((emailId: string, desc: string) => {
    saveDescription(emailId, desc);
    setDescriptions(loadDescriptions());
  }, []);

  const dragUndoPushedRef = useRef(false);

  const moveItem = useCallback((drag: AnyDragItem, hoverBatch: number, hoverIndex: number) => {
    if (!dragUndoPushedRef.current) {
      pushUndo();
      dragUndoPushedRef.current = true;
    }
    setBatches(prev => {
      const next = prev.map(b => [...b]);
      if (drag.kind === 'single') {
        const [removed] = next[drag.sourceBatch].splice(drag.sourceIndex, 1);
        next[hoverBatch].splice(hoverIndex, 0, removed);
      } else {
        const removed = next[drag.sourceBatch].splice(drag.sourceStartIndex, drag.sourceCount);
        next[hoverBatch].splice(hoverIndex, 0, ...removed);
      }
      return next;
    });
  }, [pushUndo]);

  const handleDropNew = useCallback((emailId: string, batchIndex: number) => {
    pushUndo();
    dragUndoPushedRef.current = false;
    setBatches(prev => {
      if (prev.flat().includes(emailId)) return prev;
      const next = prev.map(b => [...b]);
      next[batchIndex].push(emailId);
      return next;
    });
  }, [pushUndo]);

  const handleDropNewBundle = useCallback((emailIds: string[], batchIndex: number) => {
    pushUndo();
    dragUndoPushedRef.current = false;
    setBatches(prev => {
      const flat = prev.flat();
      if (emailIds.some(id => flat.includes(id))) return prev;
      const next = prev.map(b => [...b]);
      next[batchIndex].push(...emailIds);
      return next;
    });
  }, [pushUndo]);

  const handleRemoveEmail = useCallback((batchIndex: number, emailIndex: number) => {
    pushUndo();
    setBatches(prev => {
      const next = prev.map(b => [...b]);
      next[batchIndex].splice(emailIndex, 1);
      return next;
    });
  }, [pushUndo]);

  const handleRemoveBundle = useCallback((batchIndex: number, startIndex: number, count: number) => {
    pushUndo();
    setBatches(prev => {
      const next = prev.map(b => [...b]);
      next[batchIndex].splice(startIndex, count);
      return next;
    });
  }, [pushUndo]);

  const handleBatchNameChange = useCallback((batchIndex: number, newName: string) => {
    pushUndo();
    setBatchNames(prev => {
      const next = [...prev];
      next[batchIndex] = newName;
      return next;
    });
  }, [pushUndo]);

  const handleAddBatch = useCallback(() => {
    pushUndo();
    setBatches(prev => [...prev, []]);
    setBatchNames(prev => [...prev, '']);
  }, [pushUndo]);

  const handleMoveBatch = useCallback((batchIndex: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? batchIndex - 1 : batchIndex + 1;
    if (target < 0 || target >= batches.length) return;
    pushUndo();
    setBatches(prev => {
      const next = [...prev];
      [next[batchIndex], next[target]] = [next[target], next[batchIndex]];
      return next;
    });
    setBatchNames(prev => {
      const next = [...prev];
      [next[batchIndex], next[target]] = [next[target], next[batchIndex]];
      return next;
    });
  }, [batches.length, pushUndo]);

  const handleRemoveBatch = useCallback((batchIndex: number) => {
    pushUndo();
    setBatches(prev => {
      if (prev.length <= 1) return prev;
      const next = [...prev];
      const removed = next.splice(batchIndex, 1)[0];
      if (removed.length > 0 && next.length > 0) {
        const target = batchIndex > 0 ? batchIndex - 1 : 0;
        next[target] = [...next[target], ...removed];
      }
      return next;
    });
    setBatchNames(prev => {
      const next = [...prev];
      next.splice(batchIndex, 1);
      return next;
    });
  }, [pushUndo]);

  const handleSwitchSequence = useCallback((entryId: string) => {
    const entry = sequences.find(s => s.id === entryId);
    if (!entry) return;
    setActiveEntryId(entryId);
    setIsNewSequence(false);
    setName(entry.name);
    setBatches(entry.batches.map(b => [...b.emailIds]));
    setBatchNames(entry.batches.map(b => b.name || ''));
    undoStackRef.current = [];
    setUndoCount(0);
    setSelectedEmailId(entry.batches[0]?.emailIds[0] ?? null);
  }, [sequences]);

  const handleNewSequence = useCallback(() => {
    setActiveEntryId(null);
    setIsNewSequence(true);
    setName('');
    setBatches([[]]);
    setBatchNames(['']);
    undoStackRef.current = [];
    setUndoCount(0);
    setSelectedEmailId(null);
  }, []);

  const handleSave = () => {
    const isPresetSeq = activeEntry?.type === 'preset';
    const trimmedName = name.trim() || activeEntry?.name || '';
    if (!isPresetSeq && !trimmedName) return;
    const nonEmptyIndices = batches.map((b, i) => ({ b, i })).filter(({ b }) => b.length > 0);
    if (nonEmptyIndices.length === 0) return;

    onSave({
      id: isNewSequence ? crypto.randomUUID() : (activeEntryId || crypto.randomUUID()),
      name: isPresetSeq ? activeEntry!.name : trimmedName,
      batches: nonEmptyIndices.map(({ b, i }) => ({
        emailIds: b,
        name: batchNames[i]?.trim() || undefined,
      })),
      createdAt: activeEntry?.createdAt || Date.now(),
      updatedAt: Date.now(),
    }, isNewSequence ? null : activeEntryId);
  };

  const handleGlobalMouseUp = useCallback(() => {
    dragUndoPushedRef.current = false;
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      handleUndo();
    }
  }, [handleUndo]);

  useEffect(() => {
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleGlobalMouseUp, handleKeyDown]);

  const totalEmails = batches.flat().length;
  const canSave = (activeEntry?.type === 'preset' || name.trim().length > 0) && totalEmails > 0;
  const canUndo = undoCount > 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="size-full flex flex-col bg-background">
        {/* Top bar */}
        <div className="flex items-center gap-4 px-6 py-3 border-b border-border bg-card" data-walkthrough-target="builder-toolbar" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 text-size-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="h-5 w-px bg-border" />
          <h1 className="text-size-lg font-w-semibold text-foreground">Sequence Builder</h1>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span className="text-size-xs text-foreground/50 font-w-medium">
              {totalEmails} email{totalEmails !== 1 ? 's' : ''} · {batches.filter(b => b.length > 0).length} batch{batches.filter(b => b.length > 0).length !== 1 ? 'es' : ''}
            </span>
            <button
              onClick={handleUndo}
              disabled={!canUndo}
              title="Undo last action (Ctrl+Z)"
              className={`px-3 py-1.5 text-size-sm border border-border rounded-[var(--radius-button)] flex items-center gap-1.5 transition-colors ${
                canUndo
                  ? 'hover:bg-muted text-foreground'
                  : 'text-muted-foreground/40 cursor-not-allowed'
              }`}
            >
              <Undo2 size={14} />
              Undo
            </button>
            <button
              onClick={onCancel}
              className="px-3 py-1.5 text-size-sm border border-border rounded-[var(--radius-button)] hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!canSave}
              className={`px-4 py-1.5 text-size-sm rounded-[var(--radius-button)] flex items-center gap-1.5 transition-colors font-w-medium ${
                canSave
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              <Save size={14} />
              Save Sequence
            </button>
          </div>
        </div>

        {/* Sequence selector */}
        <div className="px-6 py-3 border-b border-border bg-card" data-walkthrough-target="builder-selector">
          <div className="flex items-end gap-3">
            <div>
              <label className="text-size-xs font-w-medium text-foreground/50 uppercase tracking-wider block mb-1.5">
                Editing Sequence
              </label>
              {isNewSequence ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-[7px] text-size-sm font-w-medium text-primary bg-primary/5 border border-primary/20 rounded-[var(--radius)]">
                  New Sequence
                  <button
                    onClick={() => handleSwitchSequence(sequences[0]?.id || 'short')}
                    className="p-0.5 rounded-sm hover:bg-primary/10 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ) : (
                <div className="relative">
                  <select
                    value={activeEntryId || ''}
                    onChange={(e) => handleSwitchSequence(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 text-size-sm border border-border rounded-[var(--radius)] bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm cursor-pointer font-w-medium min-w-[180px]"
                  >
                    {sequences.filter(s => s.type === 'preset').map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                    {sequences.some(s => s.type === 'custom') && (
                      <optgroup label="Custom Sequences">
                        {sequences.filter(s => s.type === 'custom').map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              )}
            </div>
            {!isNewSequence && (
              <button
                onClick={handleNewSequence}
                className="flex items-center gap-1.5 px-3 py-2 text-size-sm border border-dashed border-foreground/20 text-muted-foreground rounded-[var(--radius)] hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <Plus size={14} />
                New
              </button>
            )}
            {(isNewSequence || activeEntry?.type === 'custom') && (
              <div className="flex-1 min-w-[200px] max-w-md">
                <label className="text-size-xs font-w-medium text-foreground/50 uppercase tracking-wider block mb-1.5">
                  Sequence Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Customer Pricing Focus, Quick 3-Min Demo..."
                  className="w-full px-3 py-2 text-size-sm border border-border rounded-[var(--radius)] bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Three-column layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Available emails palette */}
          <div className="w-72 flex-shrink-0 border-r border-border flex flex-col bg-card" data-walkthrough-target="builder-palette">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-size-sm font-w-semibold text-foreground mb-2.5">Available Emails</p>
              <div className="flex gap-1 bg-muted/50 p-0.5 rounded-full">
                {(['all', 'csr', 'eis'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilterFolder(f)}
                    className={`flex-1 px-2.5 py-1 text-size-xs rounded-full transition-all ${
                      filterFolder === f
                        ? 'bg-card text-primary font-w-medium shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {f === 'all' ? 'All' : f === 'csr' ? 'CSR' : 'EIS'}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
              {filteredPalette.map(item =>
                item.kind === 'single' ? (
                  <PaletteEmail
                    key={item.email.id}
                    email={item.email}
                    disabled={usedIds.has(item.email.id)}
                    onSelect={handleSelectEmail}
                    isSelected={selectedEmailId === item.email.id}
                    description={descriptions[item.email.id]}
                  />
                ) : (
                  <PaletteBundleItem
                    key={item.bundle.bundleId}
                    bundle={item.bundle}
                    disabled={item.bundle.emailIds.some(id => usedIds.has(id))}
                    onSelectEmail={handleSelectEmail}
                    selectedEmailId={selectedEmailId}
                    descriptions={descriptions}
                  />
                )
              )}
            </div>
          </div>

          {/* Center: Sequence batches */}
          <div className="flex-1 overflow-y-auto p-6" data-walkthrough-target="builder-batches">
            <div className={selectedEmailId ? '' : 'max-w-2xl'}>
              <p className="text-size-sm text-foreground/50 mb-5">
                Drag emails from the left into batches below. Bundled emails move together as a group. Each batch is revealed on a refresh click during the demo.
              </p>
              {batches.map((batchEmails, i) => (
                <BatchZone
                  key={i}
                  batchIndex={i}
                  emailIds={batchEmails}
                  batchName={batchNames[i] || ''}
                  onBatchNameChange={handleBatchNameChange}
                  onRemoveEmail={handleRemoveEmail}
                  onRemoveBundle={handleRemoveBundle}
                  onRemoveBatch={handleRemoveBatch}
                  onMoveBatch={handleMoveBatch}
                  moveItem={moveItem}
                  onDropNew={handleDropNew}
                  onDropNewBundle={handleDropNewBundle}
                  totalBatches={batches.length}
                  onSelectEmail={handleSelectEmail}
                  selectedEmailId={selectedEmailId}
                  descriptions={descriptions}
                />
              ))}
              <button
                onClick={handleAddBatch}
                className="w-full py-3 border-2 border-dashed border-foreground/15 rounded-[var(--radius-card)] text-size-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/[0.03] transition-all flex items-center justify-center gap-2"
              >
                <Plus size={15} />
                Add Batch
              </button>
            </div>
          </div>

          {/* Right: Email preview panel */}
          {selectedEmailId && (
            <EmailPreviewPanel
              key={selectedEmailId}
              emailId={selectedEmailId}
              onClose={() => setSelectedEmailId(null)}
              descriptions={descriptions}
              onDescriptionChange={handleDescriptionChange}
            />
          )}
        </div>
      </div>
    </DndProvider>
  );
}
