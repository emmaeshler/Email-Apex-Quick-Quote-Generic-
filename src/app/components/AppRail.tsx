import { useState, useRef, useEffect } from 'react';
import {
  Plus, Mail, Calendar, Users, Star, CheckSquare,
  GitBranch, Cloud, MoreHorizontal, Pencil, Trash2, AlertTriangle, RotateCcw,
  BookOpen, Presentation, MessageSquarePlus, AlertCircle, X, Loader2, CheckCircle2,
} from 'lucide-react';
import type { DemoMode } from '../App';
import type { CustomSequence } from '../data/customSequences';
import { isPresetCustomized } from '../data/demoSequences';

interface AppRailProps {
  demoMode: DemoMode;
  demoLength: 'short' | 'full';
  onDemoModeChange: (mode: DemoMode) => void;
  customSequences: CustomSequence[];
  onOpenBuilder: () => void;
  onEditSequence: (id: string) => void;
  onDeleteSequence: (id: string) => void;
  onEditPreset: (presetId: string) => void;
  onResetPreset: (presetId: string) => void;
  forceShowPicker?: boolean;
}

function DeleteConfirmModal({ sequenceName, onConfirm, onCancel }: {
  sequenceName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const phrase = 'confirm delete sequence';

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  const canConfirm = input.toLowerCase() === phrase;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-5 pb-3">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={18} className="text-destructive" />
            </div>
            <h2 className="text-size-base font-w-medium text-foreground">Delete Sequence</h2>
          </div>
          <p className="text-size-sm text-foreground/70 mb-1">
            This will permanently delete <span className="font-w-medium text-foreground">"{sequenceName}"</span>.
          </p>
          <p className="text-size-sm text-foreground/70 mb-4">
            Type <span className="font-w-medium text-foreground">{phrase}</span> to confirm.
          </p>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && canConfirm) onConfirm(); }}
            placeholder={phrase}
            className="w-full px-3 py-2 text-size-sm border border-border rounded-[var(--radius)] bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-destructive/30 focus:border-destructive/50"
          />
        </div>
        <div className="flex items-center justify-end gap-2 px-6 py-3 bg-muted/30 border-t border-border">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-size-sm border border-border rounded-[var(--radius-button)] hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!canConfirm}
            className={`px-4 py-1.5 text-size-sm rounded-[var(--radius-button)] transition-colors ${
              canConfirm
                ? 'bg-destructive text-white hover:bg-destructive/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

type FeedbackType = 'demo-update' | 'report-problem';

function FeedbackModal({ type, onClose }: { type: FeedbackType; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isUpdate = type === 'demo-update';
  const title = isUpdate ? 'Request Demo Update' : 'Report a Problem';
  const messageLabel = isUpdate ? 'What would you like updated?' : 'Describe the problem';
  const messagePlaceholder = isUpdate
    ? 'e.g. Add a new email scenario, change shipping prices, update company branding...'
    : 'e.g. Button not working, email content incorrect, layout broken on mobile...';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const nameParts = name.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      const res = await fetch('https://password-admin.vercel.app/api/access-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          notes: `[${isUpdate ? 'Demo Update Request' : 'Problem Report'}] ${message}`,
          urgency,
          source: `email-apex-qq-${type}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Request failed');
      }
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {success ? (
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={28} className="text-green-600" />
            </div>
            <h3 className="text-size-base font-w-medium text-foreground mb-1">
              {isUpdate ? 'Request Submitted' : 'Report Submitted'}
            </h3>
            <p className="text-size-sm text-foreground/70 mb-4">
              An administrator has been notified
            </p>
            <button
              onClick={handleClose}
              className="px-4 py-1.5 text-size-sm border border-border rounded-[var(--radius-button)] hover:bg-muted transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="px-6 pt-5 pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-full ${isUpdate ? 'bg-primary/10' : 'bg-orange-500/10'} flex items-center justify-center flex-shrink-0`}>
                    {isUpdate ? (
                      <MessageSquarePlus size={18} className="text-primary" />
                    ) : (
                      <AlertCircle size={18} className="text-orange-500" />
                    )}
                  </div>
                  <h2 className="text-size-base font-w-medium text-foreground">{title}</h2>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="px-6 pb-4 space-y-3">
              {error && (
                <div className="px-3 py-2 bg-destructive/10 border border-destructive/20 rounded-[var(--radius)] text-size-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-size-xs text-foreground/70 mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-size-sm border border-border rounded-[var(--radius)] bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-size-xs text-foreground/70 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-size-sm border border-border rounded-[var(--radius)] bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-size-xs text-foreground/70 mb-1">{messageLabel}</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={3}
                  className="w-full px-3 py-2 text-size-sm border border-border rounded-[var(--radius)] bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 resize-none"
                  placeholder={messagePlaceholder}
                />
              </div>

              <div>
                <label className="block text-size-xs text-foreground/70 mb-1.5">Priority</label>
                <div className="flex items-center bg-muted/60 rounded-[var(--radius)] p-0.5">
                  {([
                    { value: 'urgent', label: 'Urgent', color: 'text-destructive' },
                    { value: 'normal', label: 'Normal', color: '' },
                    { value: 'low', label: 'Low', color: '' },
                  ] as const).map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setUrgency(opt.value)}
                      className={`flex-1 px-3 py-1.5 rounded text-size-xs font-w-medium transition-all ${
                        urgency === opt.value
                          ? `bg-card shadow-sm ${opt.value === 'urgent' ? 'text-destructive' : 'text-foreground'}`
                          : `${opt.color || 'text-muted-foreground'} hover:text-foreground`
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-6 py-3 bg-muted/30 border-t border-border">
              <button
                type="button"
                onClick={handleClose}
                className="px-3 py-1.5 text-size-sm border border-border rounded-[var(--radius-button)] hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-1.5 text-size-sm font-w-medium rounded-[var(--radius-button)] bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : 'Submit'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function AppRail({ demoMode, demoLength, onDemoModeChange, customSequences, onOpenBuilder, onEditSequence, onDeleteSequence, onEditPreset, onResetPreset, forceShowPicker }: AppRailProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CustomSequence | null>(null);
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceShowPicker !== undefined) setShowPicker(forceShowPicker);
  }, [forceShowPicker]);

  useEffect(() => {
    if (!showPicker || forceShowPicker) return;
    const handleClick = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showPicker, forceShowPicker]);

  const railItems = [
    { icon: Plus, label: 'New', isAction: true },
    { icon: Mail, label: 'Mail', isActive: true, onClick: () => setShowPicker(!showPicker) },
    { icon: Calendar, label: 'Calendar' },
    { icon: Users, label: 'People' },
    { icon: Star, label: 'Favorites' },
    { icon: CheckSquare, label: 'Tasks' },
    { icon: GitBranch, label: 'Workflows' },
    { icon: Cloud, label: 'Cloud' },
    { icon: MoreHorizontal, label: 'More apps' },
  ];

  return (
    <>
      <div className="w-10 flex-shrink-0 flex flex-col items-center py-2 gap-0.5 bg-background">
        {railItems.map(({ icon: Icon, label, isActive, isAction, onClick }) => (
          <div
            key={label}
            className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              onClick ? 'cursor-pointer' : 'cursor-default'
            } ${
              isActive
                ? 'bg-primary/12 text-primary'
                : isAction
                  ? 'text-foreground/70'
                  : 'text-foreground/40 hover:text-foreground/60'
            }`}
            title={label}
            onClick={onClick}
          >
            <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />

            {label === 'Mail' && showPicker && (
              <div
                ref={pickerRef}
                data-walkthrough-target="mail-menu"
                className="absolute left-full ml-2 top-0 bg-card border border-border rounded-lg shadow-xl z-50 w-64 overflow-hidden"
              >
                {/* Demo Mode Section */}
                <div className="bg-muted/40">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-size-xs font-w-semibold uppercase tracking-wider text-foreground/50">Demo Mode</p>
                </div>

                {/* Toggle between Short/Full */}
                <div className="px-3 py-3 border-b border-border/50" data-walkthrough-target="length-toggle">
                  <div className="flex items-center gap-2">
                    <span className="text-size-xs text-foreground/70 font-w-medium">Length:</span>
                    <div className="flex items-center bg-muted/60 rounded-[var(--radius)] p-0.5">
                      {(['short', 'full'] as const).map(presetId => {
                        const isSelected = demoMode === presetId || (demoMode !== 'short' && demoMode !== 'full' && presetId === demoLength);
                        const isCustomized = isPresetCustomized(presetId);
                        return (
                          <button
                            key={presetId}
                            onClick={(e) => { e.stopPropagation(); onDemoModeChange(presetId); }}
                            className={`relative px-3 py-1 rounded text-size-xs font-w-medium transition-all ${
                              isSelected
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-foreground/50 hover:text-foreground/70'
                            }`}
                          >
                            {presetId === 'short' ? 'Short' : 'Full'}
                            {isCustomized && <span className="ml-1 text-primary">*</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Edit buttons for current mode */}
                  {(demoMode === 'short' || demoMode === 'full') && isPresetCustomized(demoMode) && (
                    <div className="flex items-center gap-1 mt-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); onResetPreset(demoMode); }}
                        className="flex items-center gap-1 px-2 py-1 text-size-xs text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                      >
                        <RotateCcw size={11} />
                        Reset
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onEditPreset(demoMode); setShowPicker(false); }}
                        className="flex items-center gap-1 px-2 py-1 text-size-xs text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                      >
                        <Pencil size={11} />
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                {/* Edit or Add Demo Sequence */}
                <div className="border-b border-border" data-walkthrough-target="edit-sequence">
                  <button
                    onClick={(e) => { e.stopPropagation(); onOpenBuilder(); setShowPicker(false); }}
                    className="w-full text-left px-3 py-2.5 text-size-sm text-primary hover:bg-primary/5 transition-colors"
                  >
                    Edit or Add Demo Sequence
                  </button>
                </div>
                </div>

                {/* Custom sequences */}
                {customSequences.length > 0 && (
                  <>
                    <div className="px-3 py-2 border-b border-border/50 bg-muted/20">
                      <p className="text-size-xs font-w-medium text-foreground/70 uppercase tracking-wide">Custom Sequences</p>
                    </div>
                    {customSequences.map(seq => {
                      const isActive = demoMode === `custom:${seq.id}`;
                      return (
                        <div
                          key={seq.id}
                          className={`group flex items-center gap-1 px-3 py-2 transition-colors ${
                            isActive ? 'bg-primary/10' : 'hover:bg-muted'
                          }`}
                        >
                          <button
                            onClick={(e) => { e.stopPropagation(); onDemoModeChange(`custom:${seq.id}`); setShowPicker(false); }}
                            className={`flex-1 text-left text-size-sm truncate ${
                              isActive ? 'text-primary font-w-medium' : 'text-foreground'
                            }`}
                          >
                            {seq.name}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); onEditSequence(seq.id); setShowPicker(false); }}
                            className="p-1 rounded hover:bg-border/40 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                            title="Edit"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setDeleteTarget(seq); setShowPicker(false); }}
                            className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      );
                    })}
                  </>
                )}

                {/* Walkthrough & Presenter items */}
                <div className="px-3 pt-2.5 pb-1">
                  <p className="text-size-xs font-w-semibold uppercase tracking-wider text-foreground/50">Delivery Tools</p>
                </div>
                <div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDemoModeChange('walkthrough'); setShowPicker(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-size-sm transition-colors ${
                      demoMode === 'walkthrough' ? 'text-primary font-w-medium bg-primary/5' : 'text-foreground hover:bg-muted'
                    }`}
                    title="Learn how the demo works and get help"
                  >
                    <BookOpen size={15} className={demoMode === 'walkthrough' ? 'text-primary' : 'text-foreground/50'} />
                    How It Works
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDemoModeChange('presenter'); setShowPicker(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-size-sm transition-colors ${
                      demoMode === 'presenter' ? 'text-primary font-w-medium bg-primary/5' : 'text-foreground hover:bg-muted'
                    }`}
                    title="Opens a speaker notes panel for live presentations"
                    data-walkthrough-target="presenter-view"
                  >
                    <Presentation size={15} className={demoMode === 'presenter' ? 'text-primary' : 'text-foreground/50'} />
                    Presenter View
                  </button>
                </div>

                {/* Help & Feedback */}
                <div className="px-3 pt-2.5 pb-1">
                  <p className="text-size-xs font-w-semibold uppercase tracking-wider text-foreground/50">Help & Feedback</p>
                </div>
                <div className="pb-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); setFeedbackType('demo-update'); setShowPicker(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-size-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <MessageSquarePlus size={15} className="text-foreground/50" />
                    Request Demo Update
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFeedbackType('report-problem'); setShowPicker(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-size-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <AlertCircle size={15} className="text-foreground/50" />
                    Report a Problem
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {deleteTarget && (
        <DeleteConfirmModal
          sequenceName={deleteTarget.name}
          onConfirm={() => { onDeleteSequence(deleteTarget.id); setDeleteTarget(null); }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {feedbackType && (
        <FeedbackModal type={feedbackType} onClose={() => setFeedbackType(null)} />
      )}
    </>
  );
}
