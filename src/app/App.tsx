'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { InboxSidebar } from '@/app/components/InboxSidebar';
import { EmailList } from '@/app/components/EmailList';
import { EmailDetail } from '@/app/components/EmailDetail';
import { AppRail } from '@/app/components/AppRail';
import { SequenceBuilder } from '@/app/components/SequenceBuilder';
import { selectHint, validateHintCoverage } from './lib/hintRegistry';
import { loadCustomSequences, addCustomSequence, deleteCustomSequence, type CustomSequence } from './data/customSequences';
import { inboxFolders } from './data/emails';
import { getPresetBatches, savePresetOverride, isPresetCustomized, resetPresetOverride } from './data/demoSequences';
import { computeVisibleEmails } from './data/computeVisibleEmails';
import { EMAIL_REGISTRY } from './data/emailRegistry';
import { executeTriggers } from './lib/workflowEngine';
import {
  Search, SquarePen, Trash2, Archive, FolderInput, Flag, MailOpen,
  MessageSquare, RefreshCw, Ban, RotateCcw, MoreHorizontal, Sparkles, ChevronDown,
  Share2, Bell, Menu, LayoutGrid, Maximize2,
} from 'lucide-react';

// Re-export types so existing imports from './App' still work
export type { Email, EmailThread, QuoteTable, QuoteLineItem } from './data/emails';

interface StateSnapshot {
  arrivedEmails: Set<string>;
  emailBatchMap: Map<string, number>;
  nextBatchIndex: number;
  selectedCsrEmailId: string | null;
  selectedEisEmailId: string | null;
  selectedAutoQuotedEmailId: string | null;
  selectedReviewEmailId: string | null;
  reviewResolved: boolean;
  reviewStage: string;
  reviewComposeMode: string;
  reviewForwardStage: string;
  forwardStage: string;
  approvalStage: string;
  hiddenIds: Set<string>;
  readIds: Set<string>;
}

export type DemoMode = 'short' | 'full' | (string & {});

function getInitialDemoMode(): DemoMode {
  const params = new URLSearchParams(window.location.search);
  const urlMode = params.get('demo');
  if (urlMode === 'short' || urlMode === 'full') return urlMode;

  const saved = localStorage.getItem('demoMode');
  if (saved === 'short' || saved === 'full' || (saved && saved.startsWith('custom:'))) return saved;

  return 'full';
}

export default function App() {
  const [demoMode, setDemoMode] = useState<DemoMode>(getInitialDemoMode);
  const [activeFolder, setActiveFolder] = useState<'csr' | 'eis' | 'auto-quoted' | 'review'>('csr');
  const [selectedCsrEmailId, setSelectedCsrEmailId] = useState<string | null>(null);
  const [selectedEisEmailId, setSelectedEisEmailId] = useState<string | null>(null);
  const [selectedAutoQuotedEmailId, setSelectedAutoQuotedEmailId] = useState<string | null>(null);
  const [selectedReviewEmailId, setSelectedReviewEmailId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [emailListCollapsed, setEmailListCollapsed] = useState(false);
  const [reviewResolved, setReviewResolved] = useState(false);

  // Workflow 2 review stage — lifted from EmailDetail so hint logic can read it
  const [reviewStage, setReviewStage] = useState<'pending' | 'composing' | 'sending' | 'resolved'>('pending');
  const [reviewComposeMode, setReviewComposeMode] = useState<'reply' | 'forward'>('reply');
  const [reviewForwardStage, setReviewForwardStage] = useState<'pending' | 'composing' | 'sent' | 'processing' | 'quoted'>('pending');

  // Workflow 3 forward stage: pending → composing → sent → processing → quoted
  const [forwardStage, setForwardStage] = useState<'pending' | 'composing' | 'sent' | 'processing' | 'quoted'>('pending');

  // Approval hold stage: pending → composing → approved → sent
  const [approvalStage, setApprovalStage] = useState<'pending' | 'composing' | 'approved' | 'sent'>('pending');

  // Demo "delete" — just hides emails from the list; resets on refresh
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  // Track which emails have been opened/read during this session
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  // ── Arrival state — tracks which dynamic emails have "arrived" ──
  const [arrivedEmails, setArrivedEmails] = useState<Set<string>>(new Set());

  // ── New email tracking — for animation (email IDs that arrived in last 3s) ──
  const [newEmailIds, setNewEmailIds] = useState<Set<string>>(new Set());

  // ── Track which batch each email arrived in (for Unread/Read grouping) ──
  const [emailBatchMap, setEmailBatchMap] = useState<Map<string, number>>(new Map());

  // ── Refresh queue — tracks which batch to reveal next ──
  const [nextBatchIndex, setNextBatchIndex] = useState(0);

  // ── Refresh loading state ──
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ── State history for back/undo during demos ──
  const [stateHistory, setStateHistory] = useState<StateSnapshot[]>([]);

  // ── View state for sequence builder ──
  const [currentView, setCurrentView] = useState<'inbox' | 'sequence-builder'>('inbox');
  const [editingSequenceId, setEditingSequenceId] = useState<string | null>(null);
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null);
  const [customSequences, setCustomSequences] = useState<CustomSequence[]>(loadCustomSequences);
  const [presetVersion, setPresetVersion] = useState(0);

  // ── Demo hint visibility (toggle with ` backtick key) ──
  const [demoVisible, setDemoVisible] = useState(true);

  // ── Scroll-to-top trigger — increments whenever new emails appear at the top ──
  const [scrollTrigger, setScrollTrigger] = useState(0);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      setDemoVisible((v) => !v);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // Auto-enter fullscreen: try immediately on mount, fall back to first click
  useEffect(() => {
    const go = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      document.removeEventListener('click', go);
    };
    document.documentElement.requestFullscreen().catch(() => {
      document.addEventListener('click', go);
    });
    return () => document.removeEventListener('click', go);
  }, []);

  // Sync reviewStage when reviewResolved changes
  useEffect(() => {
    if (reviewResolved) setReviewStage('resolved');
  }, [reviewResolved]);

  // ── Mark review as resolved when user views final quote ──
  useEffect(() => {
    if ((selectedCsrEmailId === 'csr-stonite-final-cc' || selectedCsrEmailId === 'csr-steve-clarification') && reviewForwardStage === 'quoted' && !reviewResolved) {
      setReviewResolved(true);
    }
  }, [selectedCsrEmailId, reviewForwardStage, reviewResolved]);

  // Validate hint coverage on mount (development only)
  useEffect(() => {
    validateHintCoverage();
  }, []);

  // ── Helper: Mark email as arrived with animation ──
  const markEmailArrived = useCallback((emailId: string, batchNumber: number) => {
    setArrivedEmails((prev) => {
      const next = new Set(prev);
      next.add(emailId);
      return next;
    });
    setNewEmailIds((prev) => {
      const next = new Set(prev);
      next.add(emailId);
      return next;
    });
    setEmailBatchMap((prev) => {
      const next = new Map(prev);
      next.set(emailId, batchNumber);
      return next;
    });
    setScrollTrigger((n) => n + 1);

    // Remove from "new" set after 3 seconds (animation duration)
    setTimeout(() => {
      setNewEmailIds((prev) => {
        const next = new Set(prev);
        next.delete(emailId);
        return next;
      });
    }, 3000);
  }, []);

  // ── Switch demo mode — full reset ──
  const handleDemoModeChange = useCallback((mode: DemoMode) => {
    setDemoMode(mode);
    setActiveFolder('csr');
    setSelectedCsrEmailId(null);
    setSelectedEisEmailId(null);
    setSelectedAutoQuotedEmailId(null);
    setSelectedReviewEmailId(null);
    setReviewResolved(false);
    setReviewStage('pending');
    setReviewComposeMode('reply');
    setReviewForwardStage('pending');
    setForwardStage('pending');
    setApprovalStage('pending');
    setHiddenIds(new Set());
    setReadIds(new Set());
    setArrivedEmails(new Set());
    setNewEmailIds(new Set());
    setEmailBatchMap(new Map());
    setNextBatchIndex(0);
    setIsRefreshing(false);
    setStateHistory([]);
    setScrollTrigger(0);
    const url = new URL(window.location.href);
    if (mode === 'short' || mode === 'full') {
      url.searchParams.set('demo', mode);
    } else {
      url.searchParams.delete('demo');
    }
    window.history.replaceState({}, '', url.toString());
    localStorage.setItem('demoMode', mode);
  }, []);

  const handleOpenBuilder = useCallback((sequenceId?: string) => {
    setEditingSequenceId(sequenceId || null);
    setEditingPresetId(null);
    setCurrentView('sequence-builder');
  }, []);

  const handleEditPreset = useCallback((presetId: string) => {
    setEditingPresetId(presetId);
    setEditingSequenceId(null);
    setCurrentView('sequence-builder');
  }, []);

  const handleBuilderSave = useCallback((seq: CustomSequence) => {
    if (editingPresetId) {
      savePresetOverride(editingPresetId, seq.batches);
      setPresetVersion(v => v + 1);
      setEditingPresetId(null);
      setCurrentView('inbox');
      handleDemoModeChange(editingPresetId as DemoMode);
    } else {
      addCustomSequence(seq);
      setCustomSequences(loadCustomSequences());
      setCurrentView('inbox');
      handleDemoModeChange(`custom:${seq.id}`);
    }
  }, [handleDemoModeChange, editingPresetId]);

  const handleBuilderCancel = useCallback(() => {
    setEditingPresetId(null);
    setCurrentView('inbox');
  }, []);

  const handleResetPreset = useCallback((presetId: string) => {
    resetPresetOverride(presetId);
    setPresetVersion(v => v + 1);
    if (demoMode === presetId) handleDemoModeChange(presetId as DemoMode);
  }, [demoMode, handleDemoModeChange]);

  const handleDeleteSequence = useCallback((id: string) => {
    deleteCustomSequence(id);
    setCustomSequences(loadCustomSequences());
    if (demoMode === `custom:${id}`) {
      handleDemoModeChange('full');
    }
  }, [demoMode, handleDemoModeChange]);

  // ── Capture/restore state for demo back button ──
  const captureSnapshot = useCallback((): StateSnapshot => ({
    arrivedEmails: new Set(arrivedEmails),
    emailBatchMap: new Map(emailBatchMap),
    nextBatchIndex,
    selectedCsrEmailId,
    selectedEisEmailId,
    selectedAutoQuotedEmailId,
    selectedReviewEmailId,
    reviewResolved,
    reviewStage,
    reviewComposeMode,
    reviewForwardStage,
    forwardStage,
    approvalStage,
    hiddenIds: new Set(hiddenIds),
    readIds: new Set(readIds),
  }), [arrivedEmails, emailBatchMap, nextBatchIndex, selectedCsrEmailId, selectedEisEmailId, selectedAutoQuotedEmailId, selectedReviewEmailId, reviewResolved, reviewStage, reviewComposeMode, reviewForwardStage, forwardStage, approvalStage, hiddenIds, readIds]);

  const handleBack = useCallback(() => {
    if (stateHistory.length === 0) return;
    const prev = stateHistory[stateHistory.length - 1];
    setStateHistory(h => h.slice(0, -1));
    setArrivedEmails(prev.arrivedEmails);
    setEmailBatchMap(prev.emailBatchMap);
    setNextBatchIndex(prev.nextBatchIndex);
    setSelectedCsrEmailId(prev.selectedCsrEmailId);
    setSelectedEisEmailId(prev.selectedEisEmailId);
    setSelectedAutoQuotedEmailId(prev.selectedAutoQuotedEmailId);
    setSelectedReviewEmailId(prev.selectedReviewEmailId);
    setReviewResolved(prev.reviewResolved);
    setReviewStage(prev.reviewStage as any);
    setReviewComposeMode(prev.reviewComposeMode as any);
    setReviewForwardStage(prev.reviewForwardStage as any);
    setForwardStage(prev.forwardStage as any);
    setApprovalStage(prev.approvalStage as any);
    setHiddenIds(prev.hiddenIds);
    setReadIds(prev.readIds);
    setNewEmailIds(new Set());
    setIsRefreshing(false);
  }, [stateHistory]);

  // ── Refresh queue — driven by DEMO_PRESETS or custom sequences ──
  const refreshBatches = useMemo(() => {
    if (demoMode === 'short' || demoMode === 'full') return getPresetBatches(demoMode);
    if (demoMode.startsWith('custom:')) {
      const seqId = demoMode.slice(7);
      const seq = customSequences.find(s => s.id === seqId);
      if (seq) return seq.batches.map(b => ({ emailIds: b.emailIds }));
      return [];
    }
    return getPresetBatches('full');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoMode, customSequences, presetVersion]);

  // ── Handle refresh — reveal next batch of emails ──
  const handleRefresh = useCallback(() => {
    if (nextBatchIndex >= refreshBatches.length) return; // No more batches
    if (isRefreshing) return; // Prevent double-click

    setStateHistory(h => [...h, captureSnapshot()]);

    // Set refreshing state
    setIsRefreshing(true);

    const batch = refreshBatches[nextBatchIndex];
    const emailIds = batch.emailIds;
    const currentBatchNumber = nextBatchIndex + 1; // New emails get next batch number

    // Increment batch index immediately so currentBatch updates
    setNextBatchIndex((prev) => prev + 1);

    // Stagger arrivals within the batch
    emailIds.forEach((emailId, index) => {
      const delay = index === 0 ? 300 : 800 + index * 600 + Math.random() * 400;
      setTimeout(() => {
        markEmailArrived(emailId, currentBatchNumber);

        // Auto-select first CSR email on first refresh (demo starting point)
        if (index === 0 && nextBatchIndex === 0 && emailId.startsWith('csr')) {
          setSelectedCsrEmailId(emailId);
        }

        // Batch 2: Final quote arrives - change state to 'quoted'
        if (emailId === 'csr-stonite-final-cc') {
          setReviewForwardStage('quoted');
          markEmailArrived('eis-stonite-response', currentBatchNumber); // Also mark EIS email as arrived
        }

        // Clear refreshing state after last email in batch
        if (index === emailIds.length - 1) {
          setTimeout(() => setIsRefreshing(false), 500);
        }
      }, delay);
    });
  }, [nextBatchIndex, refreshBatches, markEmailArrived, captureSnapshot, isRefreshing]);

  const hideEmail = (id: string) => {
    setHiddenIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleDeleteEmail = (id: string) => {
    hideEmail(id);
    // Auto-select the next email in the current list after deletion
    const list = currentEmails.filter((e) => e.id !== id && !hiddenIds.has(e.id));
    const nextEmail = list.length > 0 ? list[0].id : null;
    if (activeFolder === 'csr') setSelectedCsrEmailId(nextEmail);
    else if (activeFolder === 'eis') setSelectedEisEmailId(nextEmail);
    else if (activeFolder === 'auto-quoted') setSelectedAutoQuotedEmailId(nextEmail);
    else setSelectedReviewEmailId(nextEmail);
  };

  /* ── Build dynamic email lists from registry ── */
  const isCustomMode = demoMode.startsWith('custom:');

  const effectiveEisEmails = useMemo(
    () => computeVisibleEmails('eis', arrivedEmails),
    [arrivedEmails],
  );

  const effectiveCsrEmails = useMemo(
    () => computeVisibleEmails('csr', arrivedEmails, { approvalStage, readIds }),
    [arrivedEmails, approvalStage, readIds],
  );

  // Build the auto-quoted folder — always shows all auto-quoted emails from the registry
  // (no arrival gating, so the folder is pre-populated for demos)
  const autoQuotedEmails = useMemo(() => {
    return [...EMAIL_REGISTRY.values()]
      .filter((entry) => entry.folder === 'eis' && entry.email.quoteStatus === 'auto-quoted')
      .sort((a, b) => b.sortPriority - a.sortPriority)
      .map((entry) => ({ ...entry.email, read: true }));
  }, []);

  // Build the review folder email list from both inboxes
  const reviewEmails = useMemo(() => {
    const eisReview = effectiveEisEmails.filter((e) =>
      reviewResolved ? false : e.quoteStatus === 'review'
    );
    const csrReview = effectiveCsrEmails.filter((e) =>
      reviewResolved ? false : e.isReviewRequest
    );
    return [...csrReview, ...eisReview];
  }, [effectiveEisEmails, effectiveCsrEmails, reviewResolved]);

  // Check if there are new messages available to refresh
  const hasNewMessages = nextBatchIndex < refreshBatches.length;

  // Compute dynamic folder definitions with live unread counts
  const dynamicFolders = useMemo(() => {
    const csrUnread = effectiveCsrEmails.filter((e) => !e.read && !readIds.has(e.id) && !hiddenIds.has(e.id)).length;
    const eisUnread = effectiveEisEmails.filter((e) => !e.read && !readIds.has(e.id) && !hiddenIds.has(e.id)).length;
    const autoQuotedUnread = autoQuotedEmails.filter((e) => !e.read && !readIds.has(e.id) && !hiddenIds.has(e.id)).length;
    const reviewUnread = reviewEmails.filter((e) => !e.read && !readIds.has(e.id) && !hiddenIds.has(e.id)).length;

    return inboxFolders.map((folder) => {
      if (folder.id === 'csr') {
        return { ...folder, count: effectiveCsrEmails.length, unreadCount: csrUnread };
      }
      if (folder.id === 'eis') {
        return { ...folder, count: effectiveEisEmails.length, unreadCount: eisUnread };
      }
      if (folder.id === 'auto-quoted') {
        return { ...folder, count: autoQuotedEmails.length, unreadCount: autoQuotedUnread };
      }
      if (folder.id === 'review') {
        return { ...folder, count: reviewEmails.length, unreadCount: reviewUnread };
      }
      return folder;
    });
  }, [effectiveCsrEmails, effectiveEisEmails, autoQuotedEmails, reviewEmails, readIds, hiddenIds]);

  // Set default selection for auto-quoted and review folders
  const effectiveAutoQuotedEmailId = selectedAutoQuotedEmailId ?? (autoQuotedEmails.length > 0 ? autoQuotedEmails[0].id : null);
  const effectiveReviewEmailId = selectedReviewEmailId ?? (reviewEmails.length > 0 ? reviewEmails[0].id : null);

  const currentEmails =
    activeFolder === 'csr' ? effectiveCsrEmails :
    activeFolder === 'eis' ? effectiveEisEmails :
    activeFolder === 'auto-quoted' ? autoQuotedEmails :
    reviewEmails;
  const visibleEmails = currentEmails.filter((e) => !hiddenIds.has(e.id));
  const selectedEmailId =
    activeFolder === 'csr' ? selectedCsrEmailId :
    activeFolder === 'eis' ? selectedEisEmailId :
    activeFolder === 'auto-quoted' ? effectiveAutoQuotedEmailId :
    effectiveReviewEmailId;
  const setSelectedEmailId =
    activeFolder === 'csr' ? setSelectedCsrEmailId :
    activeFolder === 'eis' ? setSelectedEisEmailId :
    activeFolder === 'auto-quoted' ? setSelectedAutoQuotedEmailId :
    setSelectedReviewEmailId;
  const selectedEmail = visibleEmails.find((e) => e.id === selectedEmailId) || null;

  // Mark emails as read when selected, and snapshot for per-email back
  const handleSelectEmail = (id: string) => {
    if (id !== selectedEmailId) {
      setStateHistory(h => [...h, captureSnapshot()]);
    }
    setSelectedEmailId(id);
    setReadIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  // Apply read state to visible emails
  const visibleEmailsWithRead = useMemo(() =>
    visibleEmails.map((e) => readIds.has(e.id) ? { ...e, read: true } : e),
    [visibleEmails, readIds]
  );

  // Apply read state to selected email
  const selectedEmailWithRead = selectedEmail
    ? (readIds.has(selectedEmail.id) ? { ...selectedEmail, read: true } : selectedEmail)
    : null;

  // Handle approval send: approve quote and trigger CC delivery
  const handleApprovalSend = () => {
    setStateHistory(h => [...h, captureSnapshot()]);
    setApprovalStage('approved');
    executeTriggers('wf-approval-midwest', 'approve', null, {
      markEmailArrived,
      setStage: (key, value) => {
        if (key === 'approvalStage') setApprovalStage(value as any);
      },
      currentBatch: nextBatchIndex,
      onComplete: () => setScrollTrigger((n) => n + 1),
    });
  };

  // Handle the review send — orchestrate staggered email arrivals
  const handleReviewSend = () => {
    setStateHistory(h => [...h, captureSnapshot()]);
    setReviewStage('sending');
    executeTriggers('wf-review-stonite', 'send', reviewComposeMode, {
      markEmailArrived,
      setStage: (key, value) => {
        if (key === 'reviewStage') setReviewStage(value as any);
        if (key === 'reviewForwardStage') setReviewForwardStage(value as any);
      },
      currentBatch: nextBatchIndex,
      onComplete: () => setScrollTrigger((n) => n + 1),
    });
  };


  // Determine the effective folderType for EmailDetail rendering
  const getEmailFolderType = (emailId: string | null): 'csr' | 'eis' => {
    if (activeFolder === 'auto-quoted') return 'eis';
    if (activeFolder !== 'review' || !emailId) return activeFolder === 'eis' ? 'eis' : 'csr';
    if (emailId.startsWith('eis')) return 'eis';
    return 'csr';
  };

  const effectiveFolderType = getEmailFolderType(selectedEmailId);

  /* ══════════════════════════════════════════════════════════════════════════
     Demo Hint — compute which element gets the pulsing dot
     Returns a target string like "email:csr-review-1" or "action:forward"
     ══════════════════════════════════════════════════════════════════════════ */
  // ── Workflow Hint System (Registry-Based) ──
  // Replaced 110-line conditional logic with declarative registry pattern
  // See src/app/lib/hintRegistry.ts for all workflow hint rules
  const hintTarget = useMemo<string | null>(() => {
    const hint = selectHint({
      demoVisible,
      selectedEmailId,
      activeFolder,
      reviewResolved,
      reviewStage,
      reviewForwardStage,
      forwardStage,
      approvalStage,
      arrivedEmails,
      readIds,
      hasNewMessages,
      isRefreshing,
      nextBatchIndex,
      isCustomMode,
    });

    return hint;
  }, [demoVisible, selectedEmailId, activeFolder, reviewResolved, reviewStage, forwardStage, reviewForwardStage, approvalStage, arrivedEmails, readIds, hasNewMessages, isRefreshing, nextBatchIndex, isCustomMode]);

  // ── Debug hint changes (dev mode only) ──
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('[Hint Changed]', {
        target: hintTarget,
        state: {
          selectedEmailId,
          reviewResolved,
          reviewForwardStage,
          forwardStage,
          arrivedCount: arrivedEmails.size,
          hasNewMessages,
          isRefreshing,
        },
      });
    }
  }, [hintTarget, selectedEmailId, reviewResolved, reviewForwardStage, forwardStage, arrivedEmails, hasNewMessages, isRefreshing]);

  if (currentView === 'sequence-builder') {
    let editingSeq: CustomSequence | null = null;
    if (editingPresetId) {
      const batches = getPresetBatches(editingPresetId);
      editingSeq = {
        id: editingPresetId,
        name: editingPresetId === 'short' ? 'Short Demo' : 'Full Demo',
        batches: batches.map(b => ({ emailIds: b.emailIds })),
        createdAt: 0,
        updatedAt: 0,
      };
    } else if (editingSequenceId) {
      editingSeq = customSequences.find(s => s.id === editingSequenceId) ?? null;
    }
    return (
      <SequenceBuilder
        existingSequence={editingSeq}
        onSave={handleBuilderSave}
        onCancel={handleBuilderCancel}
      />
    );
  }

  return (
    <div className="size-full flex flex-col bg-background overflow-hidden">
      {/* Outlook-style grey title bar */}
      <div className="flex items-center px-3 py-1" style={{ backgroundColor: '#e5e5e5' }}>
        <div className="flex items-center gap-1.5 mr-3 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ffbd2e' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28c840' }} />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full w-full max-w-lg cursor-text" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}>
            <Search size={12} className="text-neutral-500" />
            <span className="text-size-xs text-neutral-500">Search</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 ml-3 flex-shrink-0">
          <Share2 size={14} className="text-neutral-500 cursor-pointer" />
          <Maximize2
            size={12}
            className="text-neutral-500 cursor-pointer hover:text-neutral-700 transition-colors"
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                document.documentElement.requestFullscreen().catch(() => {});
              }
            }}
          />
          <div className="relative cursor-pointer">
            <Bell size={14} className="text-neutral-500" />
            <span className="absolute -top-1.5 -right-2 min-w-3.5 h-3.5 rounded-full flex items-center justify-center font-w-medium" style={{ backgroundColor: '#3b82f6', color: 'white', fontSize: '9px' }}>2</span>
          </div>
        </div>
      </div>

      {/* Outlook-style toolbar ribbon */}
      <div className="flex items-center gap-0.5 px-2 py-1 bg-background border-b border-border">
        <button className="p-1.5 text-foreground/70 hover:bg-muted rounded-[var(--radius)] transition-colors mr-0.5">
          <Menu size={15} />
        </button>
        <button className="flex items-center gap-1 px-4 py-1 border-2 border-primary text-primary bg-card rounded-full text-size-xs hover:bg-primary/5 transition-colors shadow-sm">
          <SquarePen size={13} /> New Mail
        </button>
        <div className="w-px h-4 bg-border mx-1.5" />
        <button
          onClick={() => selectedEmailId && handleDeleteEmail(selectedEmailId)}
          className="flex items-center gap-1 px-2 py-1 text-foreground/70 hover:bg-muted rounded-[var(--radius)] text-size-xs transition-colors"
        >
          <Trash2 size={13} /> Delete
        </button>
        <button className="flex items-center gap-1 px-2 py-1 text-foreground/70 hover:bg-muted rounded-[var(--radius)] text-size-xs transition-colors">
          <Archive size={13} /> Archive
        </button>
        <button className="flex items-center gap-1 px-2 py-1 text-foreground/70 hover:bg-muted rounded-[var(--radius)] text-size-xs transition-colors">
          <FolderInput size={13} /> Move <ChevronDown size={9} className="text-foreground/40" />
        </button>
        <button className="flex items-center gap-1 px-2 py-1 text-foreground/70 hover:bg-muted rounded-[var(--radius)] text-size-xs transition-colors">
          <Flag size={13} /> Flag <ChevronDown size={9} className="text-foreground/40" />
        </button>
        <button className="flex items-center gap-1 px-2 py-1 text-foreground/70 hover:bg-muted rounded-[var(--radius)] text-size-xs transition-colors">
          <MailOpen size={13} /> Mark Unread
        </button>
        <div className="w-px h-4 bg-border mx-1.5" />
        <button className="flex items-center gap-1 px-2 py-1 text-foreground/70 hover:bg-muted rounded-[var(--radius)] text-size-xs transition-colors">
          <MessageSquare size={13} /> Chat
        </button>
        <button className="flex items-center gap-1 px-2 py-1 text-foreground/70 hover:bg-muted rounded-[var(--radius)] text-size-xs transition-colors">
          <RefreshCw size={13} /> Sync
        </button>
        <button className="flex items-center gap-1 px-2 py-1 text-foreground/70 hover:bg-muted rounded-[var(--radius)] text-size-xs transition-colors">
          <Ban size={13} /> Block
        </button>
        <button className="flex items-center gap-1 px-2 py-1 text-foreground/70 hover:bg-muted rounded-[var(--radius)] text-size-xs transition-colors">
          <RotateCcw size={13} /> Recall
        </button>
        <div className="w-px h-4 bg-border mx-1.5" />
        <button className="p-1.5 text-foreground/70 hover:bg-muted rounded-[var(--radius)] transition-colors">
          <MoreHorizontal size={13} />
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-1 px-2 py-1 text-foreground/70 hover:bg-muted rounded-[var(--radius)] text-size-xs transition-colors">
          <Sparkles size={13} /> Copilot <ChevronDown size={9} className="text-foreground/40" />
        </button>
        <button className="p-1.5 text-foreground/70 hover:bg-muted rounded-[var(--radius)] transition-colors">
          <LayoutGrid size={13} />
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex gap-1.5 p-1.5 overflow-hidden">
        <AppRail
          demoMode={demoMode}
          onDemoModeChange={handleDemoModeChange}
          customSequences={customSequences}
          onOpenBuilder={() => handleOpenBuilder()}
          onEditSequence={(id) => handleOpenBuilder(id)}
          onDeleteSequence={handleDeleteSequence}
          onEditPreset={handleEditPreset}
          onResetPreset={handleResetPreset}
        />
        <InboxSidebar
          folders={dynamicFolders}
          activeFolderId={activeFolder}
          onFolderSelect={(id) => setActiveFolder(id as 'csr' | 'eis' | 'auto-quoted' | 'review')}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          hintTarget={hintTarget}
        />
        <EmailList
          emails={visibleEmailsWithRead}
          selectedEmailId={selectedEmailId}
          onSelectEmail={handleSelectEmail}
          onDeleteEmail={handleDeleteEmail}
          folderType={activeFolder === 'review' ? 'review' : activeFolder === 'auto-quoted' ? 'eis' : activeFolder}
          folderLabel={activeFolder === 'csr' ? 'CSR Inbox' : activeFolder === 'eis' ? 'Apex Quote Inbox' : activeFolder === 'auto-quoted' ? 'Auto Quoted' : 'Flagged for Review'}
          collapsed={emailListCollapsed}
          onToggleCollapse={() => setEmailListCollapsed(!emailListCollapsed)}
          reviewResolved={reviewResolved}
          forwardStage={forwardStage}
          approvalStage={approvalStage}
          hintTarget={hintTarget}
          scrollTrigger={scrollTrigger}
          newEmailIds={newEmailIds}
          hasNewMessages={hasNewMessages}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          emailBatchMap={emailBatchMap}
          currentBatch={nextBatchIndex}
          onBack={handleBack}
          canGoBack={stateHistory.length > 0}
        />
        <EmailDetail
          email={selectedEmailWithRead}
          folderType={effectiveFolderType}
          reviewResolved={reviewResolved}
          onReviewResolve={() => setReviewResolved(true)}
          reviewStage={reviewStage}
          onReviewStageChange={setReviewStage}
          reviewComposeMode={reviewComposeMode}
          onReviewComposeModeChange={setReviewComposeMode}
          onReviewSend={handleReviewSend}
          reviewForwardStage={reviewForwardStage}
          forwardStage={forwardStage}
          onForwardCompose={() => setForwardStage('composing')}
          onForwardSend={() => {}}
          onForwardDiscard={() => setForwardStage('pending')}
          approvalStage={approvalStage}
          onApprovalCompose={() => setApprovalStage('composing')}
          onApprovalSend={handleApprovalSend}
          onApprovalDiscard={() => setApprovalStage('pending')}
          onDeleteEmail={handleDeleteEmail}
          hintTarget={hintTarget}
        />
      </div>
    </div>
  );
}
