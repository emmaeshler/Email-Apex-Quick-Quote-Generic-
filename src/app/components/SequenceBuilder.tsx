import { useState, useCallback, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  ArrowLeft, Plus, Trash2, GripVertical, Save,
  ChevronDown, ChevronRight, Inbox, Zap,
} from 'lucide-react';
import type { CustomSequence } from '../data/customSequences';
import { AVAILABLE_EMAILS, type AvailableEmail } from '../data/customSequences';

const ITEM_TYPE = 'email-card';

interface DragItem {
  emailId: string;
  sourceBatch: number;
  sourceIndex: number;
}

/* ── Draggable email card ── */

function EmailCard({
  email,
  batchIndex,
  index,
  onRemove,
  moveCard,
}: {
  email: AvailableEmail;
  batchIndex: number;
  index: number;
  onRemove: () => void;
  moveCard: (dragBatch: number, dragIndex: number, hoverBatch: number, hoverIndex: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: (): DragItem => ({ emailId: email.id, sourceBatch: batchIndex, sourceIndex: index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop<DragItem>({
    accept: ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) return;
      if (item.sourceBatch === batchIndex && item.sourceIndex === index) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (item.sourceBatch === batchIndex) {
        if (item.sourceIndex < index && hoverClientY < hoverMiddleY) return;
        if (item.sourceIndex > index && hoverClientY > hoverMiddleY) return;
      }

      moveCard(item.sourceBatch, item.sourceIndex, batchIndex, index);
      item.sourceBatch = batchIndex;
      item.sourceIndex = index;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg group transition-opacity ${isDragging ? 'opacity-30' : ''}`}
    >
      <GripVertical size={14} className="text-foreground/30 flex-shrink-0 cursor-grab" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {email.folder === 'eis' ? (
            <Zap size={12} className="text-secondary flex-shrink-0" />
          ) : (
            <Inbox size={12} className="text-primary flex-shrink-0" />
          )}
          <span className="text-size-sm font-w-medium text-foreground truncate">{email.label}</span>
        </div>
        <span className="text-size-xs text-muted-foreground truncate block">{email.from}</span>
      </div>
      {email.typeChip && (
        <span className="inline-block px-1.5 py-px font-w-medium border border-foreground/15 text-foreground/40 flex-shrink-0" style={{ fontSize: '9px', lineHeight: '14px' }}>
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

/* ── Batch drop zone ── */

function BatchZone({
  batchIndex,
  emailIds,
  onRemoveEmail,
  onRemoveBatch,
  moveCard,
  onDropNew,
  totalBatches,
}: {
  batchIndex: number;
  emailIds: string[];
  onRemoveEmail: (batchIndex: number, emailIndex: number) => void;
  onRemoveBatch: (batchIndex: number) => void;
  moveCard: (dragBatch: number, dragIndex: number, hoverBatch: number, hoverIndex: number) => void;
  onDropNew: (emailId: string, batchIndex: number) => void;
  totalBatches: number;
}) {
  const [{ isOver }, drop] = useDrop<DragItem | { emailId: string; fromPalette: true }, void, { isOver: boolean }>({
    accept: [ITEM_TYPE, 'palette-email'],
    drop(item, monitor) {
      if (monitor.didDrop()) return;
      if ('fromPalette' in item) {
        onDropNew(item.emailId, batchIndex);
      }
    },
    collect: (monitor) => ({ isOver: monitor.isOver({ shallow: true }) }),
  });

  const emails = emailIds.map(id => AVAILABLE_EMAILS.find(e => e.id === id)).filter(Boolean) as AvailableEmail[];

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-size-xs font-w-medium text-foreground/60 uppercase tracking-wide">
          {batchIndex === 0 ? 'Batch 1 — First Refresh' : `Batch ${batchIndex + 1}`}
        </span>
        {totalBatches > 1 && (
          <button
            onClick={() => onRemoveBatch(batchIndex)}
            className="text-size-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            Remove batch
          </button>
        )}
      </div>
      <div
        ref={drop as any}
        className={`min-h-[48px] rounded-lg border-2 border-dashed p-2 space-y-1.5 transition-colors ${
          isOver ? 'border-primary/40 bg-primary/5' : 'border-border'
        } ${emails.length === 0 ? 'flex items-center justify-center' : ''}`}
      >
        {emails.length === 0 && (
          <span className="text-size-xs text-muted-foreground">Drag emails here</span>
        )}
        {emails.map((email, i) => (
          <EmailCard
            key={email.id}
            email={email}
            batchIndex={batchIndex}
            index={i}
            onRemove={() => onRemoveEmail(batchIndex, i)}
            moveCard={moveCard}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Palette email (drag source only) ── */

function PaletteEmail({ email, disabled }: { email: AvailableEmail; disabled: boolean }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'palette-email',
    item: { emailId: email.id, fromPalette: true },
    canDrag: !disabled,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <div
      ref={drag as any}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
        disabled
          ? 'opacity-40 cursor-not-allowed border-transparent bg-muted/50'
          : isDragging
            ? 'opacity-30 cursor-grabbing border-primary/30 bg-primary/5'
            : 'cursor-grab border-border hover:border-foreground/20 hover:bg-muted/50'
      }`}
    >
      {email.folder === 'eis' ? (
        <Zap size={12} className="text-secondary flex-shrink-0" />
      ) : (
        <Inbox size={12} className="text-primary flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <span className="text-size-sm text-foreground truncate block">{email.label}</span>
        <span className="text-size-xs text-muted-foreground truncate block">{email.from}</span>
      </div>
      {email.typeChip && (
        <span className="inline-block px-1.5 py-px font-w-medium border border-foreground/15 text-foreground/40 flex-shrink-0" style={{ fontSize: '9px', lineHeight: '14px' }}>
          {email.typeChip}
        </span>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   Main builder page
   ══════════════════════════════════════════════ */

export function SequenceBuilder({
  existingSequence,
  onSave,
  onCancel,
}: {
  existingSequence?: CustomSequence | null;
  onSave: (seq: CustomSequence) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(existingSequence?.name || '');
  const [batches, setBatches] = useState<string[][]>(
    existingSequence?.batches.map(b => [...b.emailIds]) || [[]]
  );
  const [filterFolder, setFilterFolder] = useState<'all' | 'csr' | 'eis'>('all');

  const usedIds = new Set(batches.flat());

  const filteredPalette = AVAILABLE_EMAILS.filter(e =>
    filterFolder === 'all' || e.folder === filterFolder
  );

  const moveCard = useCallback((dragBatch: number, dragIndex: number, hoverBatch: number, hoverIndex: number) => {
    setBatches(prev => {
      const next = prev.map(b => [...b]);
      const [removed] = next[dragBatch].splice(dragIndex, 1);
      next[hoverBatch].splice(hoverIndex, 0, removed);
      return next;
    });
  }, []);

  const handleDropNew = useCallback((emailId: string, batchIndex: number) => {
    setBatches(prev => {
      if (prev.flat().includes(emailId)) return prev;
      const next = prev.map(b => [...b]);
      next[batchIndex].push(emailId);
      return next;
    });
  }, []);

  const handleRemoveEmail = useCallback((batchIndex: number, emailIndex: number) => {
    setBatches(prev => {
      const next = prev.map(b => [...b]);
      next[batchIndex].splice(emailIndex, 1);
      return next;
    });
  }, []);

  const handleAddBatch = useCallback(() => {
    setBatches(prev => [...prev, []]);
  }, []);

  const handleRemoveBatch = useCallback((batchIndex: number) => {
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
  }, []);

  const handleSave = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    const nonEmptyBatches = batches.filter(b => b.length > 0);
    if (nonEmptyBatches.length === 0) return;

    onSave({
      id: existingSequence?.id || crypto.randomUUID(),
      name: trimmedName,
      batches: nonEmptyBatches.map(ids => ({ emailIds: ids })),
      createdAt: existingSequence?.createdAt || Date.now(),
      updatedAt: Date.now(),
    });
  };

  const totalEmails = batches.flat().length;
  const canSave = name.trim().length > 0 && totalEmails > 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="size-full flex flex-col bg-background">
        {/* Top bar */}
        <div className="flex items-center gap-4 px-6 py-3 border-b border-border bg-card">
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 text-size-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="h-5 w-px bg-border" />
          <h1 className="text-size-lg font-w-medium text-foreground">Sequence Builder</h1>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span className="text-size-xs text-muted-foreground">
              {totalEmails} email{totalEmails !== 1 ? 's' : ''} · {batches.filter(b => b.length > 0).length} batch{batches.filter(b => b.length > 0).length !== 1 ? 'es' : ''}
            </span>
            <button
              onClick={onCancel}
              className="px-3 py-1.5 text-size-sm border border-border rounded-[var(--radius-button)] hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!canSave}
              className={`px-4 py-1.5 text-size-sm rounded-[var(--radius-button)] flex items-center gap-1.5 transition-colors ${
                canSave
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              <Save size={14} />
              Save Sequence
            </button>
          </div>
        </div>

        {/* Name input */}
        <div className="px-6 py-3 border-b border-border bg-card">
          <label className="text-size-xs font-w-medium text-foreground/60 uppercase tracking-wide block mb-1.5">
            Sequence Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Customer Pricing Focus, Quick 3-Min Demo..."
            className="w-full max-w-md px-3 py-2 text-size-sm border border-border rounded-[var(--radius)] bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        {/* Two-column layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Available emails palette */}
          <div className="w-80 flex-shrink-0 border-r border-border flex flex-col bg-card">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-size-sm font-w-medium text-foreground mb-2">Available Emails</p>
              <div className="flex gap-1">
                {(['all', 'csr', 'eis'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilterFolder(f)}
                    className={`px-2.5 py-1 text-size-xs rounded-full transition-colors ${
                      filterFolder === f
                        ? 'bg-primary/10 text-primary font-w-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {f === 'all' ? 'All' : f === 'csr' ? 'CSR' : 'EIS'}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {filteredPalette.map(email => (
                <PaletteEmail key={email.id} email={email} disabled={usedIds.has(email.id)} />
              ))}
            </div>
          </div>

          {/* Right: Sequence batches */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl">
              <p className="text-size-sm text-muted-foreground mb-4">
                Drag emails from the left into batches below. Each batch is revealed on a refresh click during the demo.
              </p>
              {batches.map((batchEmails, i) => (
                <BatchZone
                  key={i}
                  batchIndex={i}
                  emailIds={batchEmails}
                  onRemoveEmail={handleRemoveEmail}
                  onRemoveBatch={handleRemoveBatch}
                  moveCard={moveCard}
                  onDropNew={handleDropNew}
                  totalBatches={batches.length}
                />
              ))}
              <button
                onClick={handleAddBatch}
                className="w-full py-2.5 border-2 border-dashed border-border rounded-lg text-size-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus size={14} />
                Add Batch
              </button>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
