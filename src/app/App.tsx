'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { InboxSidebar } from '@/app/components/InboxSidebar';
import { EmailList } from '@/app/components/EmailList';
import { EmailDetail } from '@/app/components/EmailDetail';
import { AppRail } from '@/app/components/AppRail';
import { selectHint, validateHintCoverage } from './lib/hintRegistry';
import {
  inboxFolders,
  csrDailySummary,
  eis1Response,
  eis6Response,
  csr1CC,
  csr2CC,
  csrReview1,
  eisStoniteResponse,
  csrReviewReplyEmail,
  csrSteveClarification,
  csrStoniteFinalCc,
  eis7MidwestPower,
  csrApprovalHold,
  csrApprovalSentCc,
  eis8RushResponse,
  csr3RushCc,
  eis9QtyBreakResponse,
  csrQtyBreakCc,
} from './data/emails';

// Re-export types so existing imports from './App' still work
export type { Email, EmailThread, QuoteTable, QuoteLineItem } from './data/emails';

export type DemoMode = 'short' | 'full';
export type FolderType = 'autoquotes' | 'approval' | 'morgan' | 'eis';

function getInitialDemoMode(): DemoMode {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('demo');
  if (mode === 'short' || mode === 'full') return mode;
  return 'full';
}

function getInitialArrivedEmails(mode: DemoMode): Set<string> {
  const ids = new Set([
    // Auto-quote CCs (pre-loaded)
    'csr-ai-1', 'csr-ai-2',
    // EIS auto-quote responses (pre-loaded)
    'eis-1', 'eis-1-response', 'eis-6', 'eis-6-response',
    // Needs Approval (pre-loaded)
    'csr-review-1', 'csr-approval-hold',
    // EIS context emails (pre-loaded)
    'eis-7-midwest',
  ]);
  if (mode === 'full') {
    ids.add('csr-rush-cc');
    ids.add('csr-ai-3');
    ids.add('eis-8-rush');
    ids.add('eis-8-rush-response');
    ids.add('eis-9-qtybreak');
    ids.add('eis-9-qtybreak-response');
  }
  return ids;
}

function getInitialBatchMap(mode: DemoMode): Map<string, number> {
  return new Map([...getInitialArrivedEmails(mode)].map(id => [id, 0]));
}

interface StateSnapshot {
  arrivedEmails: Set<string>;
  emailBatchMap: Map<string, number>;
  nextBatchIndex: number;
  selectedAutoQuotesId: string | null;
  selectedApprovalId: string | null;
  selectedMorganId: string | null;
  selectedEisEmailId: string | null;
  reviewResolved: boolean;
  reviewStage: string;
  reviewComposeMode: string;
  reviewForwardStage: string;
  forwardStage: string;
  approvalStage: string;
  hiddenIds: Set<string>;
  readIds: Set<string>;
}

export default function App() {
  const [demoMode, setDemoMode] = useState<DemoMode>(getInitialDemoMode);
  const [activeFolder, setActiveFolder] = useState<FolderType>('autoquotes');
  const [selectedAutoQuotesId, setSelectedAutoQuotesId] = useState<string | null>('csr-ai-1');
  const [selectedApprovalId, setSelectedApprovalId] = useState<string | null>(null);
  const [selectedMorganId, setSelectedMorganId] = useState<string | null>(null);
  const [selectedEisEmailId, setSelectedEisEmailId] = useState<string | null>(null);
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
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set(['csr-ai-1']));

  // ── Arrival state — tracks which dynamic emails have "arrived" ──
  const [arrivedEmails, setArrivedEmails] = useState<Set<string>>(() => getInitialArrivedEmails(getInitialDemoMode()));

  // ── New email tracking — for animation (email IDs that arrived in last 3s) ──
  const [newEmailIds, setNewEmailIds] = useState<Set<string>>(new Set());

  // ── Track which batch each email arrived in (for Unread/Read grouping) ──
  const [emailBatchMap, setEmailBatchMap] = useState<Map<string, number>>(() => getInitialBatchMap(getInitialDemoMode()));

  // ── Refresh queue — tracks which batch to reveal next ──
  const [nextBatchIndex, setNextBatchIndex] = useState(0);

  // ── Refresh loading state ──
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ── State history for back/undo during demos ──
  const [stateHistory, setStateHistory] = useState<StateSnapshot[]>([]);

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

  // Sync reviewStage when reviewResolved changes
  useEffect(() => {
    if (reviewResolved) setReviewStage('resolved');
  }, [reviewResolved]);

  // ── Mark review as resolved when user views final quote ──
  useEffect(() => {
    if (selectedAutoQuotesId === 'csr-stonite-final-cc' && reviewForwardStage === 'quoted' && !reviewResolved) {
      setReviewResolved(true);
    }
  }, [selectedAutoQuotesId, reviewForwardStage, reviewResolved]);

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

  // ── Capture/restore state for demo back button ──
  const captureSnapshot = useCallback((): StateSnapshot => ({
    arrivedEmails: new Set(arrivedEmails),
    emailBatchMap: new Map(emailBatchMap),
    nextBatchIndex,
    selectedAutoQuotesId,
    selectedApprovalId,
    selectedMorganId,
    selectedEisEmailId,
    reviewResolved,
    reviewStage,
    reviewComposeMode,
    reviewForwardStage,
    forwardStage,
    approvalStage,
    hiddenIds: new Set(hiddenIds),
    readIds: new Set(readIds),
  }), [arrivedEmails, emailBatchMap, nextBatchIndex, selectedAutoQuotesId, selectedApprovalId, selectedMorganId, selectedEisEmailId, reviewResolved, reviewStage, reviewComposeMode, reviewForwardStage, forwardStage, approvalStage, hiddenIds, readIds]);

  const handleBack = useCallback(() => {
    if (stateHistory.length === 0) return;
    const prev = stateHistory[stateHistory.length - 1];
    setStateHistory(h => h.slice(0, -1));
    setArrivedEmails(prev.arrivedEmails);
    setEmailBatchMap(prev.emailBatchMap);
    setNextBatchIndex(prev.nextBatchIndex);
    setSelectedAutoQuotesId(prev.selectedAutoQuotesId);
    setSelectedApprovalId(prev.selectedApprovalId);
    setSelectedMorganId(prev.selectedMorganId);
    setSelectedEisEmailId(prev.selectedEisEmailId);
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

  // ── Handle demo mode change — reset all state ──
  const handleDemoModeChange = useCallback((mode: DemoMode) => {
    setDemoMode(mode);
    const initial = getInitialArrivedEmails(mode);
    setArrivedEmails(initial);
    setEmailBatchMap(getInitialBatchMap(mode));
    setNextBatchIndex(0);
    setSelectedAutoQuotesId('csr-ai-1');
    setSelectedApprovalId(null);
    setSelectedMorganId(null);
    setSelectedEisEmailId(null);
    setReadIds(new Set(['csr-ai-1']));
    setReviewResolved(false);
    setReviewStage('pending');
    setReviewComposeMode('reply');
    setReviewForwardStage('pending');
    setForwardStage('pending');
    setApprovalStage('pending');
    setStateHistory([]);
    setHiddenIds(new Set());
    setNewEmailIds(new Set());
    setActiveFolder('autoquotes');
  }, []);

  // ── Refresh batches — only the daily summary needs refresh now ──
  const refreshBatches = useMemo(() => [
    { emailIds: ['csr-daily-summary'] },
  ], []);

  // ── Handle refresh — reveal next batch of emails ──
  const handleRefresh = useCallback(() => {
    if (nextBatchIndex >= refreshBatches.length) return;

    setStateHistory(h => [...h, captureSnapshot()]);
    setIsRefreshing(true);

    const batch = refreshBatches[nextBatchIndex];
    const emailIds = batch.emailIds;
    const currentBatchNumber = nextBatchIndex + 1;

    setNextBatchIndex((prev) => prev + 1);

    emailIds.forEach((emailId, index) => {
      const delay = index === 0 ? 300 : 800 + index * 600 + Math.random() * 400;
      setTimeout(() => {
        markEmailArrived(emailId, currentBatchNumber);

        if (index === emailIds.length - 1) {
          setTimeout(() => setIsRefreshing(false), 500);
        }
      }, delay);
    });
  }, [nextBatchIndex, refreshBatches, markEmailArrived, captureSnapshot]);

  const hideEmail = (id: string) => {
    setHiddenIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleDeleteEmail = (id: string) => {
    hideEmail(id);
    const list = currentEmails.filter((e) => e.id !== id && !hiddenIds.has(e.id));
    const nextEmail = list.length > 0 ? list[0].id : null;
    if (activeFolder === 'autoquotes') setSelectedAutoQuotesId(nextEmail);
    else if (activeFolder === 'approval') setSelectedApprovalId(nextEmail);
    else if (activeFolder === 'morgan') setSelectedMorganId(nextEmail);
    else setSelectedEisEmailId(nextEmail);
  };

  /* ── Build Auto-Quotes email list ── */
  const autoQuoteEmails = useMemo(() => {
    const priority: Record<string, number> = {
      'csr-ai-3': 116,
      'csr-ai-2': 115,
      'csr-ai-1': 114,
      'csr-rush-cc': 105,
      'csr-stonite-final-cc': 70,
      'csr-approval-cc': 80,
    };

    const list = [];
    if (arrivedEmails.has('csr-ai-3')) list.push(csrQtyBreakCc);
    if (arrivedEmails.has('csr-ai-2')) list.push(csr2CC);
    if (arrivedEmails.has('csr-ai-1')) list.push(csr1CC);
    if (arrivedEmails.has('csr-rush-cc')) list.push(csr3RushCc);
    if (arrivedEmails.has('csr-stonite-final-cc') && (readIds.has('csr-steve-clarification') || readIds.has('csr-review-reply'))) list.push(csrStoniteFinalCc);
    if (approvalStage === 'sent') list.push(csrApprovalSentCc);

    return list.sort((a, b) => (priority[b.id] || 0) - (priority[a.id] || 0));
  }, [arrivedEmails, readIds, approvalStage]);

  /* ── Build Needs Approval email list ── */
  const approvalEmails = useMemo(() => {
    const priority: Record<string, number> = {
      'csr-approval-hold': 75,
      'csr-review-1': 55,
    };

    const list = [];
    if (arrivedEmails.has('csr-review-1')) list.push(csrReview1);
    if (arrivedEmails.has('csr-approval-hold')) list.push(csrApprovalHold);

    return list.sort((a, b) => (priority[b.id] || 0) - (priority[a.id] || 0));
  }, [arrivedEmails]);

  /* ── Build Morgan's Inbox email list ── */
  const morganEmails = useMemo(() => {
    const priority: Record<string, number> = {
      'csr-daily-summary': 120,
      'csr-steve-clarification': 65,
      'csr-review-reply': 60,
    };

    const list = [];
    if (arrivedEmails.has('csr-steve-clarification')) list.push(csrSteveClarification);
    if (arrivedEmails.has('csr-review-reply')) list.push(csrReviewReplyEmail);
    if (arrivedEmails.has('csr-daily-summary')) list.push(csrDailySummary);

    return list.sort((a, b) => (priority[b.id] || 0) - (priority[a.id] || 0));
  }, [arrivedEmails]);

  /* ── Build Apex Quote Inbox (EIS) email list ── */
  const effectiveEisEmails = useMemo(() => {
    const list = [];

    list.push(eis1Response);
    list.push(eis6Response);

    if (demoMode === 'full') {
      list.push(eis8RushResponse);
      list.push(eis9QtyBreakResponse);
    }

    list.push(eis7MidwestPower);

    if (arrivedEmails.has('eis-stonite-response')) list.unshift(eisStoniteResponse);

    return list;
  }, [arrivedEmails, demoMode]);

  // Check if there are new messages available to refresh
  const hasNewMessages = nextBatchIndex < refreshBatches.length;

  // Compute dynamic folder definitions with live unread counts
  const dynamicFolders = useMemo(() => {
    const unreadFor = (emails: typeof autoQuoteEmails) =>
      emails.filter((e) => !e.read && !readIds.has(e.id) && !hiddenIds.has(e.id)).length;

    return inboxFolders.map((folder) => {
      if (folder.id === 'autoquotes') {
        return { ...folder, count: autoQuoteEmails.length, unreadCount: unreadFor(autoQuoteEmails) };
      }
      if (folder.id === 'approval') {
        return { ...folder, count: approvalEmails.length, unreadCount: unreadFor(approvalEmails) };
      }
      if (folder.id === 'morgan') {
        return { ...folder, count: morganEmails.length, unreadCount: unreadFor(morganEmails) };
      }
      if (folder.id === 'eis') {
        return { ...folder, count: effectiveEisEmails.length, unreadCount: unreadFor(effectiveEisEmails) };
      }
      return folder;
    });
  }, [autoQuoteEmails, approvalEmails, morganEmails, effectiveEisEmails, readIds, hiddenIds]);

  // Map folder to its email list, selected ID, and setter
  const folderConfig = useMemo(() => ({
    autoquotes: { emails: autoQuoteEmails, selectedId: selectedAutoQuotesId, setSelectedId: setSelectedAutoQuotesId },
    approval: { emails: approvalEmails, selectedId: selectedApprovalId, setSelectedId: setSelectedApprovalId },
    morgan: { emails: morganEmails, selectedId: selectedMorganId, setSelectedId: setSelectedMorganId },
    eis: { emails: effectiveEisEmails, selectedId: selectedEisEmailId, setSelectedId: setSelectedEisEmailId },
  }), [autoQuoteEmails, approvalEmails, morganEmails, effectiveEisEmails, selectedAutoQuotesId, selectedApprovalId, selectedMorganId, selectedEisEmailId]);

  const { emails: currentEmails, selectedId: selectedEmailId, setSelectedId: setSelectedEmailId } = folderConfig[activeFolder];
  const visibleEmails = currentEmails.filter((e) => !hiddenIds.has(e.id));
  const selectedEmail = visibleEmails.find((e) => e.id === selectedEmailId) || null;

  // Mark emails as read when selected
  const handleSelectEmail = (id: string) => {
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
    setTimeout(() => {
      setApprovalStage('sent');
      markEmailArrived('csr-approval-cc', nextBatchIndex);
      markEmailArrived('eis-7-midwest', nextBatchIndex);
      setScrollTrigger((n) => n + 1);
    }, 1500);
  };

  // Handle the review send — orchestrate staggered email arrivals
  const handleReviewSend = () => {
    setStateHistory(h => [...h, captureSnapshot()]);
    setReviewStage('sending');

    if (reviewComposeMode === 'reply') {
      setTimeout(() => {
        markEmailArrived('csr-review-reply', nextBatchIndex);
      }, 500);

      setTimeout(() => {
        markEmailArrived('eis-5', nextBatchIndex);
      }, 1000);

      const eisDelay = 2000 + Math.random() * 3000;
      setTimeout(() => {
        markEmailArrived('eis-stonite-response', nextBatchIndex);
      }, eisDelay);

      const ccDelay = eisDelay + 700 + Math.random() * 800;
      setTimeout(() => {
        markEmailArrived('csr-stonite-final-cc', nextBatchIndex);
      }, ccDelay);
    } else {
      const customerDelay = 3000 + Math.random() * 4000;
      setTimeout(() => {
        markEmailArrived('csr-steve-clarification', nextBatchIndex);
        setReviewStage('resolved');
        setReviewForwardStage('processing');

        setTimeout(() => {
          markEmailArrived('eis-5', nextBatchIndex);
        }, 500);

        const quoteDelay = 2000 + Math.random() * 3000;
        setTimeout(() => {
          setReviewForwardStage('quoted');
          markEmailArrived('eis-stonite-response', nextBatchIndex);
          markEmailArrived('csr-stonite-final-cc', nextBatchIndex);
          setScrollTrigger((n) => n + 1);
        }, quoteDelay);
      }, customerDelay);
    }
  };

  // Determine the effective folderType for EmailDetail rendering
  const effectiveFolderType: 'csr' | 'eis' = activeFolder === 'eis' ? 'eis' : 'csr';

  // Folder labels for EmailList header
  const folderLabels: Record<FolderType, string> = {
    autoquotes: 'Auto-Quotes',
    approval: 'Needs Approval',
    morgan: "Morgan's Inbox",
    eis: 'Apex Quote Inbox',
  };

  /* ── Demo Hint System ── */
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
    });

    return hint;
  }, [demoVisible, selectedEmailId, activeFolder, reviewResolved, reviewStage, forwardStage, reviewForwardStage, approvalStage, arrivedEmails, readIds, hasNewMessages, isRefreshing, nextBatchIndex]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('[Hint Changed]', {
        target: hintTarget,
        state: {
          activeFolder,
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
  }, [hintTarget, activeFolder, selectedEmailId, reviewResolved, reviewForwardStage, forwardStage, arrivedEmails, hasNewMessages, isRefreshing]);

  return (
    <div className="size-full flex gap-2 p-2 bg-background overflow-hidden">
        <InboxSidebar
          folders={dynamicFolders}
          activeFolderId={activeFolder}
          onFolderSelect={(id) => setActiveFolder(id as FolderType)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          hintTarget={hintTarget}
        />
        <EmailList
          emails={visibleEmailsWithRead}
          selectedEmailId={selectedEmailId}
          onSelectEmail={handleSelectEmail}
          onDeleteEmail={handleDeleteEmail}
          folderType={activeFolder}
          folderLabel={folderLabels[activeFolder]}
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
        <AppRail demoMode={demoMode} onDemoModeChange={handleDemoModeChange} />
    </div>
  );
}
