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
  csrSteveClarification,
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
  const [reviewComposeMode, setReviewComposeMode] = useState<'reply' | 'forward'>('reply');
  const [reviewForwardStage, setReviewForwardStage] = useState<'pending' | 'composing' | 'sent' | 'processing' | 'quoted'>('pending');

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
      // Batch 0: WF2 - Stonite review request (Phase 1: opens demo — AI knows its limits)
      { emailIds: ['eis-5', 'csr-review-1'] },

      // Batch 1: WF2 - Steve's clarification (Phase 1b: arrives after Morgan forwards to Steve)
      { emailIds: ['csr-steve-clarification'] },

      // Batch 2: WF2 - Final quote (Phase 1c: arrives after forwarding to quotes@)
      { emailIds: ['csr-stonite-final-cc'] },

      // Batch 3: WF1 + WF4 - Auto-quote workflows (Phase 2: payoff — shows automation at scale)
      { emailIds: ['eis-1', 'eis-1-response', 'csr-ai-1', 'eis-6', 'eis-6-response', 'csr-ai-2'] },

      // Batch 4: WF3 - Herman's direct email (optional additional workflow)
      { emailIds: ['csr-forward-1'] },

      // Batch 5: Daily summary (Phase 3: closer — full picture)
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
        if (emailId === 'csr-review-1') {
          setSelectedCsrEmailId('csr-review-1');
        }

        // Batch 2: Final quote arrives - change state to 'quoted'
        if (emailId === 'csr-stonite-final-cc') {
          setReviewForwardStage('quoted');
          markEmailArrived('eis-stonite-response'); // Also mark EIS email as arrived
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
      'csr-daily-summary': 100,       // Batch 5 - Daily summary (last/newest)
      'csr-herman-reply': 95,         // WF3 final - Herman's reply after quote
      'csr-motion-cc': 90,            // WF3 - Motion quote CC
      'csr-forward-1': 85,            // Batch 4 - Herman's direct email
      'csr-ai-2': 80,                 // Batch 3 - Tri-State auto-quote
      'csr-ai-1': 75,                 // Batch 3 - RCSCA auto-quote
      'csr-stonite-final-cc': 70,     // Batch 2 - Stonite final CC (Phase 1c)
      'csr-steve-clarification': 65,  // Batch 1 - Steve's clarification (Phase 1b)
      'csr-review-reply': 60,         // WF2 reply - Morgan's review reply (if used)
      'csr-review-1': 55,             // Batch 0 - Stonite review request (Phase 1 opener)
    };

    const list = [];

    // Add emails (order doesn't matter, we'll sort by priority)
    if (arrivedEmails.has('csr-ai-1')) list.push(csr1CC);
    if (arrivedEmails.has('csr-ai-2')) list.push(csr2CC);
    if (arrivedEmails.has('csr-review-1')) list.push(csrReview1);
    if (arrivedEmails.has('csr-forward-1')) list.push(csrHermanDirect);
    if (arrivedEmails.has('csr-review-reply')) list.push(csrReviewReplyEmail);
    if (arrivedEmails.has('csr-steve-clarification')) list.push(csrSteveClarification);
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

    if (reviewComposeMode === 'reply') {
      // ── Reply workflow: Morgan provides details internally ──

      // Phase 1: Morgan's reply arrives immediately (it's the one they just sent)
      setTimeout(() => {
        markEmailArrived('csr-review-reply');
      }, 800);

      // Phase 2: Original Stonite request transitions to processing (forwarded to quotes@)
      setTimeout(() => {
        markEmailArrived('eis-5'); // Original request now shows as being processed
      }, 1500);

      // Phase 3: EIS quote response arrives after 3-7s (system generated it)
      const eisDelay = 3000 + Math.random() * 4000; // 3-7s
      setTimeout(() => {
        markEmailArrived('eis-stonite-response');
      }, eisDelay);

      // Phase 4: CSR CC notification arrives 1-2s after quote response
      const ccDelay = eisDelay + 1000 + Math.random() * 1000; // +1-2s
      setTimeout(() => {
        markEmailArrived('csr-stonite-final-cc');
        // Mark workflow complete after all arrivals
        setReviewStage('resolved');
        setReviewResolved(true);
      }, ccDelay);
    } else {
      // ── Forward workflow: Morgan asks customer for clarification ──

      // Phase 1: Customer (Steve) responds with details after 5-10s
      // Morgan will need to manually forward Steve's response to quotes@
      const customerDelay = 5000 + Math.random() * 5000; // 5-10s
      setTimeout(() => {
        markEmailArrived('csr-steve-clarification');
        setReviewStage('pending'); // Reset to pending, waiting for Morgan to forward
      }, customerDelay);
    }
  };

  // Handle forwarding Steve's clarification to quotes@ (triggered by Forward button)
  const handleReviewForwardSend = () => {
    setReviewForwardStage('sent');

    setTimeout(() => {
      setReviewForwardStage('processing');

      // Phase 1: Forwarded thread appears in EIS
      setTimeout(() => {
        markEmailArrived('eis-5');
      }, 800);

      // Quote will arrive when user clicks Refresh for Batch 2
      // Stay in 'processing' state until then

      // Phase 3: CSR CC notification (1-2s after quote)
      const ccDelay = quoteDelay + 1000 + Math.random() * 1000;
      setTimeout(() => {
        markEmailArrived('csr-stonite-final-cc');
        setReviewStage('resolved');
        setReviewResolved(true);
        setScrollTrigger((n) => n + 1);
      }, ccDelay);
    }, 1500);
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
  const hintTarget = useMemo<string | null>(() => {
    if (!demoVisible) return null;

    // ── Phase 0: Guide to refresh if inbox is empty ──
    if (nextBatchIndex === 0 && !arrivedEmails.has('csr-review-1')) {
      return 'action:refresh';
    }

    // ── Phase 1: Review-Needed Scenario — Opens the demo, establishes AI knows its limits ──
    if (!reviewResolved && forwardStage === 'pending' && reviewStage === 'pending') {
      if (activeFolder === 'csr') {
        // Only hint once review email has arrived
        if (!arrivedEmails.has('csr-review-1')) return null;

        // No email selected yet, or a non-demo email selected → hint: review email (demo opener)
        if (!selectedEmailId || (selectedEmailId !== 'csr-review-1' && selectedEmailId !== 'csr-steve-clarification' && selectedEmailId !== 'csr-stonite-final-cc' && selectedEmailId !== 'csr-ai-1' && selectedEmailId !== 'csr-ai-2' && selectedEmailId !== 'csr-forward-1' && selectedEmailId !== 'csr-daily-summary')) {
          return 'email:csr-review-1';
        }
        // Viewing csr-review-1 → hint: Forward button (Phase 1a)
        if (selectedEmailId === 'csr-review-1') {
          return 'action:forward';
        }
      }
    }

    // ── Phase 1a: Forward to Steve for Clarification ──
    if (!reviewResolved && forwardStage === 'pending' && arrivedEmails.has('csr-review-1') && !arrivedEmails.has('csr-steve-clarification')) {
      if (selectedEmailId === 'csr-review-1') {
        if (reviewStage === 'composing') return 'action:send';
        if (reviewStage === 'sending') return null; // processing, no hint while sending
      }
    }

    // ── Phase 1b: Steve Responds (Priority: handle this regardless of other state) ──
    if (arrivedEmails.has('csr-steve-clarification') && selectedEmailId === 'csr-steve-clarification' && reviewForwardStage !== 'quoted') {
      // On Steve's clarification email, guide to forward action based on stage
      if (reviewForwardStage === 'pending') return 'action:forward';
      if (reviewForwardStage === 'composing') return 'action:send';
      if (reviewForwardStage === 'sent' || reviewForwardStage === 'processing') return null; // processing
    }

    // Guide to Steve's email if not viewing it yet
    if (arrivedEmails.has('csr-steve-clarification') && selectedEmailId !== 'csr-steve-clarification' && !reviewResolved && reviewForwardStage === 'pending') {
      return 'email:csr-steve-clarification';
    }

    // ── Phase 1c: Wait for quote to be generated (guide to refresh) ──
    if (reviewForwardStage === 'processing' && !arrivedEmails.has('csr-stonite-final-cc') && hasNewMessages) {
      return 'action:refresh';
    }

    // ── Phase 1c: Quote Comes Back Auto-Generated ──
    if (reviewForwardStage === 'quoted' && !reviewResolved) {
      // Guide to the final quote email (the "aha" moment)
      if (!arrivedEmails.has('csr-stonite-final-cc') && hasNewMessages) return 'action:refresh';
      if (arrivedEmails.has('csr-stonite-final-cc') && selectedEmailId !== 'csr-stonite-final-cc') {
        return 'email:csr-stonite-final-cc';
      }
      // After viewing the final quote, move to Phase 2
      if (selectedEmailId === 'csr-stonite-final-cc') {
        // Mark review as resolved so we can move to auto-quotes
        if (!reviewResolved) {
          setReviewResolved(true);
        }
        // Guide to refresh for auto-quotes
        if (!arrivedEmails.has('csr-ai-1') && hasNewMessages) return 'action:refresh';
        if (arrivedEmails.has('csr-ai-1')) return 'email:csr-ai-1';
      }
    }

    // ── Phase 2: Auto-Quoted Emails (Payoff — shows automation at scale) ──
    if (reviewResolved && forwardStage === 'pending') {
      if (activeFolder === 'csr') {
        // Guide to first auto-quote if not viewing it
        if (arrivedEmails.has('csr-ai-1') && selectedEmailId !== 'csr-ai-1' && selectedEmailId !== 'csr-ai-2' && selectedEmailId !== 'csr-forward-1' && selectedEmailId !== 'csr-daily-summary') {
          return 'email:csr-ai-1';
        }
        // After viewing csr-ai-1, guide to csr-ai-2
        if (selectedEmailId === 'csr-ai-1' && arrivedEmails.has('csr-ai-2')) {
          return 'email:csr-ai-2';
        }
        // After viewing csr-ai-2, check for Herman's email or daily summary
        if (selectedEmailId === 'csr-ai-2') {
          // Optional: Herman's forward workflow
          if (!arrivedEmails.has('csr-forward-1') && hasNewMessages) return 'action:refresh';
          if (arrivedEmails.has('csr-forward-1')) return 'email:csr-forward-1';
        }
        // On Herman's email, guide to forward action
        if (selectedEmailId === 'csr-forward-1') return 'action:forward';
      }
    }
    if (reviewResolved && forwardStage === 'composing') return 'action:send';
    if (forwardStage === 'sent' || forwardStage === 'processing') return null; // waiting

    // ── Phase 2b: View Herman's reply thread (optional) ──
    if (forwardStage === 'quoted' && selectedEmailId !== 'csr-herman-reply' && selectedEmailId !== 'csr-daily-summary' && arrivedEmails.has('csr-herman-reply')) {
      return 'email:csr-herman-reply';
    }

    // ── Phase 3: Daily Summary (Closer — full picture) ──
    if (forwardStage === 'quoted' || (reviewResolved && selectedEmailId === 'csr-ai-2')) {
      // Guide to refresh for daily summary
      if (!arrivedEmails.has('csr-daily-summary') && hasNewMessages) return 'action:refresh';
      // Guide to daily summary if not viewing it
      if (arrivedEmails.has('csr-daily-summary') && selectedEmailId !== 'csr-daily-summary') {
        return 'email:csr-daily-summary';
      }
    }

    return null; // demo complete (after viewing daily summary)
  }, [demoVisible, selectedEmailId, activeFolder, reviewResolved, reviewStage, forwardStage, reviewForwardStage, arrivedEmails, hasNewMessages]);

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
          reviewComposeMode={reviewComposeMode}
          onReviewComposeModeChange={setReviewComposeMode}
          onReviewSend={handleReviewSend}
          reviewForwardStage={reviewForwardStage}
          onReviewForwardCompose={() => setReviewForwardStage('composing')}
          onReviewForwardSend={handleReviewForwardSend}
          onReviewForwardDiscard={() => setReviewForwardStage('pending')}
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