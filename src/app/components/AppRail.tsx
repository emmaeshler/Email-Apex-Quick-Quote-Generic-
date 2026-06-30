import { useState, useRef, useEffect } from 'react';
import {
  Plus, Mail, Calendar, Users, Star, CheckSquare,
  GitBranch, Cloud, MoreHorizontal, Pencil, Trash2, AlertTriangle, RotateCcw,
} from 'lucide-react';
import type { DemoMode } from '../App';
import type { CustomSequence } from '../data/customSequences';
import { isPresetCustomized } from '../data/demoSequences';

interface AppRailProps {
  demoMode: DemoMode;
  onDemoModeChange: (mode: DemoMode) => void;
  customSequences: CustomSequence[];
  onOpenBuilder: () => void;
  onEditSequence: (id: string) => void;
  onDeleteSequence: (id: string) => void;
  onEditPreset: (presetId: string) => void;
  onResetPreset: (presetId: string) => void;
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

export function AppRail({ demoMode, onDemoModeChange, customSequences, onOpenBuilder, onEditSequence, onDeleteSequence, onEditPreset, onResetPreset }: AppRailProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CustomSequence | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPicker) return;
    const handleClick = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showPicker]);

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
      <div className="w-12 flex-shrink-0 flex flex-col items-center py-3 gap-1 bg-background">
        {railItems.map(({ icon: Icon, label, isActive, isAction, onClick }) => (
          <div
            key={label}
            className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
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
            <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />

            {label === 'Mail' && showPicker && (
              <div
                ref={pickerRef}
                className="absolute left-full ml-2 top-0 bg-card border border-border rounded-lg shadow-xl z-50 w-52 overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-size-xs font-w-medium text-foreground/70 uppercase tracking-wide">Demo Mode</p>
                </div>
                {(['short', 'full'] as const).map(presetId => {
                  const isActive = demoMode === presetId;
                  const isCustomized = isPresetCustomized(presetId);
                  return (
                    <div
                      key={presetId}
                      className={`group flex items-center gap-1 px-3 py-2 transition-colors ${
                        isActive ? 'bg-primary/10' : 'hover:bg-muted'
                      }`}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); onDemoModeChange(presetId); setShowPicker(false); }}
                        className={`flex-1 text-left text-size-sm truncate ${
                          isActive ? 'text-primary font-w-medium' : 'text-foreground'
                        }`}
                      >
                        {presetId === 'short' ? 'Short Demo' : 'Full Demo'}
                        {isCustomized && <span className="text-size-xs text-muted-foreground ml-1">·edited</span>}
                      </button>
                      {isCustomized && (
                        <button
                          onClick={(e) => { e.stopPropagation(); onResetPreset(presetId); }}
                          className="p-1 rounded hover:bg-border/40 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                          title="Reset to default"
                        >
                          <RotateCcw size={12} />
                        </button>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); onEditPreset(presetId); setShowPicker(false); }}
                        className="p-1 rounded hover:bg-border/40 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                        title="Edit sequence"
                      >
                        <Pencil size={12} />
                      </button>
                    </div>
                  );
                })}

                {/* Custom sequences */}
                {customSequences.length > 0 && (
                  <>
                    <div className="px-3 py-1.5 border-t border-border">
                      <p className="text-size-xs font-w-medium text-foreground/70 uppercase tracking-wide">Custom</p>
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

                {/* Add new */}
                <div className="border-t border-border">
                  <button
                    onClick={(e) => { e.stopPropagation(); onOpenBuilder(); setShowPicker(false); }}
                    className="w-full text-left px-3 py-2.5 text-size-sm text-primary hover:bg-primary/5 transition-colors flex items-center gap-1.5"
                  >
                    <Plus size={14} />
                    Add New Sequence
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
    </>
  );
}
