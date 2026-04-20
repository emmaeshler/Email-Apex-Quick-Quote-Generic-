import { useState, useMemo, useEffect, useCallback } from 'react';
import { InboxSidebar } from '@/app/components/InboxSidebar';
import { EmailList } from '@/app/components/EmailList';
import { EmailDetail } from '@/app/components/EmailDetail';
import {
  eisEmails,
  csrEmails,
  inboxFolders,
  csrDailySummary,
  eis1Jawinder,
  eis1Response,
  csr1CC,
  eis6Dave,
  eis6Response,
  csr2CC,
  eis5Stonite,
  csrReview1,
  csrHermanDirect,
  eisStoniteResponse,
  eisForwardedEmail,
  eisMotionResponse,
  csrReviewReplyEmail,
  csrStoniteFinalCc,
  csrMotionCc,
  csrHermanReply,
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

  // Workflow 3 forward stage: pending → composing → sent → processing → quoted
  const [forwardStage, setForwardStage] = useState<'pending' | 'composing' | 'sent' | 'processing' | 'quoted'>('pending');

  // Demo "delete" — just hides emails from the list; resets on refresh
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  // Track which emails have been opened/read during this session
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  // ── Arrival state — tracks which dynamic emails have "arrived" ──
  const [arrivedEmails, setArrivedEmails] = useState<Set<string>>(new Set());

  // ── New email tracking — for animation (email IDs that arrived in last 3s) ──
  const [newEmailIds, setNewEmailIds] = useState<Set<string>>(new Set());

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

  // ── Helper: Mark email as arrived with animation ──
  const markEmailArrived = useCallback((emailId: string) => {
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
  const refreshBatches = useMemo(() => {
    const batches: Array<{ emailIds: string[]; condition?: boolean }> = [
      // Batch 0: WF1 + WF4 - Both auto-quote workflows together (6 emails)
      { emailIds: ['eis-1', 'eis-1-response', 'csr-ai-1', 'eis-6', 'eis-6-response', 'csr-ai-2'] },

      // Batch 1: WF2 - Stonite review request (2 emails: flagged request → review email)
      { emailIds: ['eis-5', 'csr-review-1'] },

      // Batch 2: WF3 - Herman's direct email (1 email)
      { emailIds: ['csr-forward-1'] },

      // Batch 3: Daily summary - view after completing all workflows
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

    // Stagger arrivals within the batch
    emailIds.forEach((emailId, index) => {
      const delay = index === 0 ? 300 : 800 + index * 600 + Math.random() * 400;
      setTimeout(() => {
        markEmailArrived(emailId);

        // Auto-select first meaningful CSR email when it arrives
        if (emailId === 'csr-ai-1') {
          setSelectedCsrEmailId('csr-ai-1');
        }

        // Clear refreshing state after last email in batch
        if (index === emailIds.length - 1) {
          setTimeout(() => setIsRefreshing(false), 500);
        }
      }, delay);
    });

    setNextBatchIndex((prev) => prev + 1);
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

    // WF1: Jawinder emails (RCSCA)
    if (arrivedEmails.has('eis-1')) list.push(eis1Jawinder);
    if (arrivedEmails.has('eis-1-response')) list.push(eis1Response);

    // WF4: Dave emails (Tri-State)
    if (arrivedEmails.has('eis-6')) list.push(eis6Dave);
    if (arrivedEmails.has('eis-6-response')) list.push(eis6Response);

    // WF2: Stonite emails
    if (arrivedEmails.has('eis-5')) list.push(eis5Stonite);
    if (arrivedEmails.has('eis-stonite-response')) list.unshift(eisStoniteResponse);

    // WF3: Motion forwarded email and response
    if (forwardStage === 'sent' || forwardStage === 'processing' || forwardStage === 'quoted') {
      const fwdEmail = { ...eisForwardedEmail };
      if (forwardStage === 'quoted') {
        fwdEmail.quoteStatus = 'quoted';
      }
      list.unshift(fwdEmail);
    }
    if (forwardStage === 'quoted') {
      list.unshift(eisMotionResponse);
    }

    // Sort by time (newest first) - unshift operations already handle WF3
    return list;
  }, [arrivedEmails, forwardStage]);

  /* ── Build dynamic CSR email list ── */
  const effectiveCsrEmails = useMemo(() => {
    // Map email IDs to workflow priority (higher = newer, appears first)
    const workflowPriority: Record<string, number> = {
      'csr-daily-summary': 100,    // Batch 3 - Daily summary (last/newest)
      'csr-herman-reply': 90,       // WF3 final - Herman's reply after quote
      'csr-motion-cc': 85,          // WF3 - Motion quote CC
      'csr-forward-1': 80,          // Batch 2 - Herman's direct email
      'csr-stonite-final-cc': 70,   // WF2 final - Stonite final CC
      'csr-review-reply': 60,       // WF2 - Morgan's review reply
      'csr-review-1': 50,           // Batch 1 - Stonite review request
      'csr-ai-2': 40,               // Batch 0 - Tri-State CC
      'csr-ai-1': 30,               // Batch 0 - RCSCA CC
    };

    const list = [];

    // Add emails (order doesn't matter, we'll sort by priority)
    if (arrivedEmails.has('csr-ai-1')) list.push(csr1CC);
    if (arrivedEmails.has('csr-ai-2')) list.push(csr2CC);
    if (arrivedEmails.has('csr-review-1')) list.push(csrReview1);
    if (arrivedEmails.has('csr-forward-1')) list.push(csrHermanDirect);
    if (arrivedEmails.has('csr-review-reply')) list.push(csrReviewReplyEmail);
    if (arrivedEmails.has('csr-stonite-final-cc')) list.push(csrStoniteFinalCc);
    if (forwardStage === 'quoted') list.push(csrMotionCc);
    if (forwardStage === 'quoted') list.push(csrHermanReply);
    if (arrivedEmails.has('csr-daily-summary')) list.push(csrDailySummary);

    // Sort by workflow priority - higher priority appears first (newest at top)
    return list.sort((a, b) => {
      const priorityA = workflowPriority[a.id] || 0;
      const priorityB = workflowPriority[b.id] || 0;
      return priorityB - priorityA; // Descending order
    });
  }, [arrivedEmails, forwardStage]);

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

  // Handle the forward send: animate through stages
  const handleForwardSend = () => {
    setForwardStage('sent');
    setTimeout(() => {
      setForwardStage('processing');
      setTimeout(() => {
        setForwardStage('quoted');
        setScrollTrigger((n) => n + 1);
      }, 2500);
    }, 1500);
  };

  // Handle the review send — orchestrate staggered email arrivals
  const handleReviewSend = () => {
    setReviewStage('sending');

    // Phase 1: Morgan's reply arrives immediately (it's the one they just sent)
    setTimeout(() => {
      markEmailArrived('csr-review-reply');
    }, 800);

    // Phase 2: EIS quote response arrives after 3-7s (system generated it)
    const eisDelay = 3000 + Math.random() * 4000; // 3-7s
    setTimeout(() => {
      markEmailArrived('eis-stonite-response');
    }, eisDelay);

    // Phase 3: CSR CC notification arrives 1-2s after quote response
    const ccDelay = eisDelay + 1000 + Math.random() * 1000; // +1-2s
    setTimeout(() => {
      markEmailArrived('csr-stonite-final-cc');
      // Mark workflow complete after all arrivals
      setReviewStage('resolved');
      setReviewResolved(true);
    }, ccDelay);
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
     Returns a target string like "email:csr-ai-2" or "action:forward"
     ══════════════════════════════════════════════════════════════════════════ */
  const hintTarget = useMemo<string | null>(() => {
    if (!demoVisible) return null;

    // ── Phase 0: Guide to refresh if inbox is empty ──
    if (nextBatchIndex === 0 && !arrivedEmails.has('csr-ai-1')) {
      return 'action:refresh';
    }

    // ── Phase 1: Scenarios 1 & 2 — Auto-quotes in CSR inbox ──
    if (!reviewResolved && forwardStage === 'pending' && reviewStage === 'pending') {
      if (activeFolder === 'csr') {
        // Only hint once emails have arrived
        if (!arrivedEmails.has('csr-ai-1')) return null;

        // No email selected yet, or a non-demo email selected → hint: first demo email
        if (!selectedEmailId || (selectedEmailId !== 'csr-ai-1' && selectedEmailId !== 'csr-ai-2' && selectedEmailId !== 'csr-review-1' && selectedEmailId !== 'csr-forward-1' && selectedEmailId !== 'csr-daily-summary')) {
          return 'email:csr-ai-1';
        }
        // Viewing csr-ai-1 → hint: next email (csr-ai-2 arrives in same batch)
        if (selectedEmailId === 'csr-ai-1') {
          if (arrivedEmails.has('csr-ai-2')) return 'email:csr-ai-2';
        }
        // After viewing csr-ai-2 → hint: review email (if it has arrived) or refresh
        if (selectedEmailId === 'csr-ai-2') {
          if (!arrivedEmails.has('csr-review-1') && hasNewMessages) return 'action:refresh';
          if (arrivedEmails.has('csr-review-1')) return 'email:csr-review-1';
        }
      }
    }

    // ── Phase 2: Scenario 3 — Stonite review workflow ──
    if (!reviewResolved && forwardStage === 'pending') {
      if (selectedEmailId === 'csr-review-1') {
        if (reviewStage === 'pending') return 'action:reply';
        if (reviewStage === 'composing') return 'action:send';
        if (reviewStage === 'sending') return null; // processing, no hint
      }
      // If they navigated away from review-1 but haven't started review yet
      if (activeFolder === 'csr' && selectedEmailId !== 'csr-review-1' && selectedEmailId !== 'csr-ai-1' && selectedEmailId !== 'csr-ai-2') {
        return 'email:csr-review-1';
      }
    }

    // ── Phase 3: Scenario 4 — View Stonite final CC, then Herman forward workflow ──
    if (reviewResolved && forwardStage === 'pending') {
      // First, guide to the new Stonite CC email (only if it has arrived)
      if (arrivedEmails.has('csr-stonite-final-cc') && selectedEmailId !== 'csr-stonite-final-cc' && selectedEmailId !== 'csr-forward-1') {
        return 'email:csr-stonite-final-cc';
      }
      // After viewing the Stonite CC, check if Herman's email available
      if (selectedEmailId === 'csr-stonite-final-cc') {
        if (!arrivedEmails.has('csr-forward-1') && hasNewMessages) return 'action:refresh';
        if (arrivedEmails.has('csr-forward-1')) return 'email:csr-forward-1';
      }
      // On Herman's email, guide to forward action
      if (selectedEmailId === 'csr-forward-1') return 'action:forward';
    }
    if (reviewResolved && forwardStage === 'composing') return 'action:send';
    if (forwardStage === 'sent' || forwardStage === 'processing') return null; // waiting

    // ── Phase 4: View Herman's reply thread ──
    if (forwardStage === 'quoted' && selectedEmailId !== 'csr-herman-reply' && selectedEmailId !== 'csr-daily-summary') {
      return 'email:csr-herman-reply';
    }

    // ── Phase 5: Refresh to get Daily Summary, then view it ──
    if (forwardStage === 'quoted' && selectedEmailId === 'csr-herman-reply') {
      if (!arrivedEmails.has('csr-daily-summary') && hasNewMessages) return 'action:refresh';
      if (arrivedEmails.has('csr-daily-summary')) return 'email:csr-daily-summary';
    }

    return null; // demo complete (after viewing daily summary)
  }, [demoVisible, selectedEmailId, activeFolder, reviewResolved, reviewStage, forwardStage, arrivedEmails]);

  return (
    <div className="size-full flex bg-background overflow-hidden">
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
          hintTarget={hintTarget}
          scrollTrigger={scrollTrigger}
          newEmailIds={newEmailIds}
          hasNewMessages={hasNewMessages}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
        <EmailDetail
          email={selectedEmailWithRead}
          folderType={effectiveFolderType}
          reviewResolved={reviewResolved}
          onReviewResolve={() => setReviewResolved(true)}
          reviewStage={reviewStage}
          onReviewStageChange={setReviewStage}
          onReviewSend={handleReviewSend}
          forwardStage={forwardStage}
          onForwardCompose={() => setForwardStage('composing')}
          onForwardSend={handleForwardSend}
          onForwardDiscard={() => setForwardStage('pending')}
          onDeleteEmail={handleDeleteEmail}
          hintTarget={hintTarget}
        />
    </div>
  );
}