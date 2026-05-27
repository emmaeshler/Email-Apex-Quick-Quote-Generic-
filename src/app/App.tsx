'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { InboxSidebar } from '@/app/components/InboxSidebar';
import { EmailList } from '@/app/components/EmailList';
import { EmailDetail } from '@/app/components/EmailDetail';
import { AppRail } from '@/app/components/AppRail';
import { selectHint, validateHintCoverage } from './lib/hintRegistry';
import {
  eisEmails,
  csrEmails,
  inboxFolders,
  csrDailySummary,
  eis1Jawinder,
  eis1Response,
  eis6Dave,
  eis6Response,
  csr2CC,
  eis5Stonite,
  csrReview1,
  eisStoniteResponse,
  csrReviewReplyEmail,
  csrSteveClarification,
  csrStoniteFinalCc,
  eis7MidwestPower,
  csrApprovalHold,
  csrApprovalSentCc,
  eis8Rush,
  eis8RushResponse,
  csr3RushCc,
} from './data/emails';

// Re-export types so existing imports from './App' still work
export type { Email, EmailThread, QuoteTable, QuoteLineItem } from './data/emails';

export default function App() {
  const [activeFolder, setActiveFolder] = useState<'csr' | 'eis' | 'review'>('csr');
  const [selectedCsrEmailId, setSelectedCsrEmailId] = useState<string | null>(null);
  const [selectedEisEmailId, setSelectedEisEmailId] = useState<string | null>(null);
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
    if (selectedEmailId === 'csr-stonite-final-cc' && reviewForwardStage === 'quoted' && !reviewResolved) {
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

  // ── Refresh queue definition — each batch is revealed on refresh ──
  // Flow: most human involvement → least (auto-quote payoff at end)
  const refreshBatches = useMemo(() => {
    const batches: Array<{ emailIds: string[]; condition?: boolean }> = [
      // Batch 0: Review flag (Phase 1: vague inputs → identified items, highest human involvement)
      { emailIds: ['csr-review-1'] },

      // Batch 1: Approval hold (Phase 2: large dollar quote needs sales rep approval)
      { emailIds: ['csr-approval-hold'] },

      // Batch 2: Rush re-quote (Phase 3: urgent re-quote, moderate human involvement)
      { emailIds: ['eis-8-rush', 'eis-8-rush-response', 'csr-rush-cc'] },

      // Batch 3: Auto-quotes (Phase 4: fully automated, no human involvement)
      { emailIds: ['eis-1', 'eis-1-response', 'eis-6', 'eis-6-response', 'csr-ai-2'] },

      // Batch 4: Daily summary (Phase 5: closer — full picture)
      { emailIds: ['csr-daily-summary'] },
    ];

    return batches;
  }, []);

  // ── Handle refresh — reveal next batch of emails ──
  const handleRefresh = useCallback(() => {
    if (nextBatchIndex >= refreshBatches.length) return; // No more batches

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

        // Auto-select review email on first refresh (demo starting point)
        if (emailId === 'csr-review-1') {
          setSelectedCsrEmailId('csr-review-1');
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
  }, [nextBatchIndex, refreshBatches, markEmailArrived]);

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
    else setSelectedReviewEmailId(nextEmail);
  };

  /* ── Build dynamic EIS email list ── */
  const effectiveEisEmails = useMemo(() => {
    const list = [];

    // Auto-quoted threads — show only the response (contains original via quotedPrevious)
    list.push(eis1Response);          // WF1: Jawinder (RCSCA) — simple request thread
    list.push(eis8RushResponse);      // Rush re-quote — Jawinder rush thread
    list.push(eis6Response);          // WF4: Dave (Tri-State) — multi-item thread

    // WF2: Stonite quote thread (arrives after review workflow completes)
    if (arrivedEmails.has('eis-stonite-response')) list.unshift(eisStoniteResponse);

    return list;
  }, [arrivedEmails]);

  /* ── Build dynamic CSR email list ── */
  const effectiveCsrEmails = useMemo(() => {
    // Map email IDs to workflow priority (higher = newer, appears first)
    const workflowPriority: Record<string, number> = {
      'csr-daily-summary': 120,       // Daily summary (last/newest)
      'csr-ai-2': 115,                // Auto-quoted CC — always visible
      'csr-rush-cc': 105,             // Rush re-quote CC — always visible
      'csr-approval-cc': 80,          // Auto-delivered - Approval sent CC
      'csr-approval-hold': 75,        // Batch 1 - Approval hold notification
      'csr-stonite-final-cc': 70,     // Auto-delivered - Stonite final CC (Phase 1c)
      'csr-steve-clarification': 65,  // Auto-delivered - Steve's clarification (Phase 1b)
      'csr-review-reply': 60,         // WF2 reply - Morgan's review reply (if used)
      'csr-review-1': 55,             // Batch 0 - Review email
    };

    const list = [];

    if (arrivedEmails.has('csr-ai-2')) list.push(csr2CC);
    if (arrivedEmails.has('csr-rush-cc')) list.push(csr3RushCc);
    if (arrivedEmails.has('csr-review-1')) list.push(csrReview1);
    if (arrivedEmails.has('csr-review-reply')) list.push(csrReviewReplyEmail);
    if (arrivedEmails.has('csr-steve-clarification')) list.push(csrSteveClarification);
    if (arrivedEmails.has('csr-stonite-final-cc') && (readIds.has('csr-steve-clarification') || readIds.has('csr-review-reply'))) list.push(csrStoniteFinalCc);
    if (arrivedEmails.has('csr-approval-hold')) list.push(csrApprovalHold);
    if (approvalStage === 'sent') list.push(csrApprovalSentCc);
    if (arrivedEmails.has('csr-daily-summary')) list.push(csrDailySummary);

    // Sort by workflow priority - higher priority appears first (newest at top)
    return list.sort((a, b) => {
      const priorityA = workflowPriority[a.id] || 0;
      const priorityB = workflowPriority[b.id] || 0;
      return priorityB - priorityA; // Descending order
    });
  }, [arrivedEmails, approvalStage, readIds]);

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
    const reviewUnread = reviewEmails.filter((e) => !e.read && !readIds.has(e.id) && !hiddenIds.has(e.id)).length;

    return inboxFolders.map((folder) => {
      if (folder.id === 'csr') {
        return { ...folder, count: effectiveCsrEmails.length, unreadCount: csrUnread };
      }
      if (folder.id === 'eis') {
        return { ...folder, count: effectiveEisEmails.length, unreadCount: eisUnread };
      }
      if (folder.id === 'review') {
        return { ...folder, count: reviewEmails.length, unreadCount: reviewUnread };
      }
      return folder;
    });
  }, [effectiveCsrEmails, effectiveEisEmails, reviewEmails, readIds, hiddenIds]);

  // Set default selection for review folder
  const effectiveReviewEmailId = selectedReviewEmailId ?? (reviewEmails.length > 0 ? reviewEmails[0].id : null);

  const currentEmails = activeFolder === 'csr' ? effectiveCsrEmails : activeFolder === 'eis' ? effectiveEisEmails : reviewEmails;
  const visibleEmails = currentEmails.filter((e) => !hiddenIds.has(e.id));
  const selectedEmailId = activeFolder === 'csr' ? selectedCsrEmailId : activeFolder === 'eis' ? selectedEisEmailId : effectiveReviewEmailId;
  const setSelectedEmailId = activeFolder === 'csr' ? setSelectedCsrEmailId : activeFolder === 'eis' ? setSelectedEisEmailId : setSelectedReviewEmailId;
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
    setReviewStage('sending');

    if (reviewComposeMode === 'reply') {
      // ── Reply workflow: Morgan provides details internally ──

      // Phase 1: Morgan's reply arrives immediately (it's the one they just sent)
      setTimeout(() => {
        markEmailArrived('csr-review-reply', nextBatchIndex);
      }, 500);

      // Phase 2: Original Stonite request transitions to processing (forwarded to quotes@)
      setTimeout(() => {
        markEmailArrived('eis-5', nextBatchIndex); // Original request now shows as being processed
      }, 1000);

      // Phase 3: EIS quote response arrives after 2-5s (system generated it)
      const eisDelay = 2000 + Math.random() * 3000; // 2-5s
      setTimeout(() => {
        markEmailArrived('eis-stonite-response', nextBatchIndex);
      }, eisDelay);

      // Phase 4: CSR CC notification arrives 0.7-1.5s after quote response
      const ccDelay = eisDelay + 700 + Math.random() * 800; // +0.7-1.5s
      setTimeout(() => {
        markEmailArrived('csr-stonite-final-cc', nextBatchIndex);
      }, ccDelay);
    } else {
      // ── Forward workflow: Morgan asks customer for clarification ──
      // Steve's reply CCs quotes@apex-corp.com, so the agent auto-processes it

      // Phase 1: Customer (Steve) responds with details after 3-7s
      const customerDelay = 3000 + Math.random() * 4000; // 3-7s
      setTimeout(() => {
        markEmailArrived('csr-steve-clarification', nextBatchIndex);
        setReviewStage('resolved');
        setReviewForwardStage('processing');

        // Phase 2: Original Stonite request shows as being processed
        setTimeout(() => {
          markEmailArrived('eis-5', nextBatchIndex);
        }, 500);

        // Phase 3: Auto-quote generated (2-5s)
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
  const getEmailFolderType = (emailId: string | null): 'csr' | 'eis' => {
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
    });

    return hint;
  }, [demoVisible, selectedEmailId, activeFolder, reviewResolved, reviewStage, forwardStage, reviewForwardStage, approvalStage, arrivedEmails, readIds, hasNewMessages, isRefreshing, nextBatchIndex]);

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

  return (
    <div className="size-full flex gap-2 p-2 bg-background overflow-hidden">
        <InboxSidebar
          folders={dynamicFolders}
          activeFolderId={activeFolder}
          onFolderSelect={(id) => setActiveFolder(id as 'csr' | 'eis' | 'review')}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          hintTarget={hintTarget}
        />
        <EmailList
          emails={visibleEmailsWithRead}
          selectedEmailId={selectedEmailId}
          onSelectEmail={handleSelectEmail}
          onDeleteEmail={handleDeleteEmail}
          folderType={activeFolder === 'review' ? 'review' : activeFolder}
          folderLabel={activeFolder === 'csr' ? 'CSR Inbox' : activeFolder === 'eis' ? 'Apex Quote Inbox' : 'Flagged for Review'}
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
        <AppRail />
    </div>
  );
}
