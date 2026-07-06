import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, Pause, Play, RotateCcw, Sun, Moon, Monitor, MousePointerClick } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';

interface PresenterState {
  activeFolder: string;
  selectedEmailId: string | null;
  reviewStage: string;
  forwardStage: string;
  approvalStage: string;
  canGoBack: boolean;
  canGoForward: boolean;
  hintTarget: string | null;
}

interface PresenterNote {
  talkTrack: string[];
  nextStep: string;
}

const ACTION_LABELS: Record<string, string> = {
  'action:refresh': 'Click Send/Receive',
  'action:forward': 'Click Forward',
  'action:send': 'Click Send',
  'action:reply': 'Click Reply',
};

const EMAIL_LABELS: Record<string, string> = {
  'csr-ai-1': 'Open the Adhesive Auto-Quote CC',
  'csr-ai-2': 'Open the Tapered Reels Quote CC',
  'csr-ai-3': 'Open the Qty-Break Quote CC',
  'csr-ai-4': 'Open the Northeast Motor Quote CC',
  'csr-ai-5': 'Open the Gulf Coast Quote CC',
  'csr-rush-cc': 'Open the Rush Re-Quote CC',
  'csr-review-1': 'Open Steve Landers\' Email',
  'csr-steve-clarification': 'Open Steve\'s Clarification',
  'csr-approval-hold': 'Open the Approval Hold Email',
  'csr-approval-cc': 'Open the Approval Confirmation',
  'csr-daily-summary': 'Open the Daily Summary',
};

function getActionLabel(hintTarget: string | null): string | null {
  if (!hintTarget) return null;
  if (ACTION_LABELS[hintTarget]) return ACTION_LABELS[hintTarget];
  if (hintTarget.startsWith('email:')) {
    const emailId = hintTarget.slice(6);
    return EMAIL_LABELS[emailId] || `Open email ${emailId}`;
  }
  if (hintTarget.startsWith('folder:')) {
    const folder = hintTarget.slice(7);
    const names: Record<string, string> = { csr: 'CSR Inbox', eis: 'Apex Quote Inbox', review: 'Flagged for Review' };
    return `Navigate to ${names[folder] || folder}`;
  }
  return null;
}

const PRESENTER_NOTES: Record<string, PresenterNote> = {
  // ── Phase 0: Initial ──
  'initial': {
    talkTrack: [
      'Welcome to the Email Apex Quick Quote demo. What you\'re seeing is our CSR\'s Outlook inbox — the same interface they use every day.',
      'Let\'s load today\'s incoming quote requests and see how the system handles them.',
    ],
    nextStep: 'New quote request emails will arrive in the CSR inbox.',
  },

  // ── Phase 1: Adhesive Auto-Quote ──
  'csr-ai-1': {
    talkTrack: [
      'This is a CC notification — the AI has already processed this quote automatically. The CSR never had to touch it.',
      'Notice the quote details are right in the email. The customer gets a response in seconds, not hours.',
    ],
    nextStep: 'Load the next batch of emails to see more auto-quote examples.',
  },

  // ── Phase 2: Tapered Reels Auto-Quote ──
  'csr-ai-2': {
    talkTrack: [
      'Here\'s another auto-processed quote, this time for multiple products. The ML model handles multi-line quotes just as easily.',
      'Each line item gets individually priced based on historical data, margin targets, and customer-specific agreements.',
    ],
    nextStep: 'Load more emails to continue the workflow.',
  },

  // ── Phase 2.5: Customer-Specific Pricing ──
  'csr-ai-4': {
    talkTrack: [
      'This is where it gets interesting — same products, different customer. Northeast Motor gets their negotiated pricing.',
      'The ML model factors in the customer relationship, volume history, and contract terms automatically.',
    ],
    nextStep: 'View the second customer-specific quote to compare pricing.',
  },
  'csr-ai-5': {
    talkTrack: [
      'Now look at Gulf Coast\'s pricing for the exact same products. Different customer, different price — all automated.',
      'This is one of our biggest time-savers. Manually looking up customer-specific pricing used to take 10+ minutes per quote.',
    ],
    nextStep: 'Load the next batch to see rush orders and quantity breaks.',
  },

  // ── Phase 3: Rush + Qty-Break ──
  'csr-rush-cc': {
    talkTrack: [
      'This quote was flagged as a rush order. The system automatically applied expedited shipping and adjusted the pricing.',
      'Rush orders are a common scenario — the AI handles the surcharge calculation and delivery timeline automatically.',
    ],
    nextStep: 'View the quantity-break quote to see tiered pricing.',
  },
  'csr-ai-3': {
    talkTrack: [
      'Quantity breaks are another key scenario. This customer ordered enough to hit a price tier.',
      'The ML model applies the correct discount tier and recalculates margins automatically.',
    ],
    nextStep: 'Load the review workflow — this is where human expertise comes in.',
  },

  // ── Phase 4: Review Workflow ──
  'review-open': {
    talkTrack: [
      'Not every request can be auto-quoted. Steve Landers has a complex multi-item request that needs specialist review.',
      'The CSR has flagged this for the pricing team. Let\'s walk through the handoff process.',
    ],
    nextStep: 'Forward this email to the Apex Quote inbox for specialist review.',
  },
  'review-forward': {
    talkTrack: [
      'The Forward action creates a handoff to the pricing specialist team.',
      'Notice the compose window pre-fills with context from the original request — the specialist gets everything they need.',
    ],
    nextStep: 'Send the forwarded email to trigger the specialist review workflow.',
  },
  'review-send': {
    talkTrack: [
      'Sending this email kicks off the specialist review process.',
      'The pricing team will receive the request with full context attached.',
    ],
    nextStep: 'Steve\'s clarification and the final quote will arrive shortly.',
  },
  'review-clarification': {
    talkTrack: [
      'Steve responded with a clarification — the system processed it automatically and generated the final quote.',
      'This shows how AI and human expertise work together: the specialist\'s review trained the model for next time.',
    ],
    nextStep: 'Load the approval workflow to see manager sign-off.',
  },

  // ── Phase 5: Approval ──
  'approval-open': {
    talkTrack: [
      'Some quotes need manager approval before they go out. This one was held because of a rush delivery surcharge.',
      'The approval hold shows the full quote breakdown so the manager can make an informed decision.',
    ],
    nextStep: 'Reply to approve the quote and release it to the customer.',
  },
  'approval-reply': {
    talkTrack: [
      'The manager reviews the quote details and can approve with a simple reply.',
      'Approval thresholds are configurable — only quotes above certain amounts or with special conditions need sign-off.',
    ],
    nextStep: 'Send the approval to release the quote to the customer.',
  },
  'approval-send': {
    talkTrack: [
      'Once approved, the system automatically sends the quote to the customer and updates the CRM.',
      'The entire flow — from request to approved quote — took minutes instead of hours.',
    ],
    nextStep: 'Load the daily summary to see the full picture.',
  },

  // ── Phase 6: Daily Summary ──
  'daily-summary': {
    talkTrack: [
      'The daily summary gives managers a complete overview: how many quotes were processed, approval rates, and response times.',
      'This is the "so what" — concrete metrics showing the impact of AI-assisted quoting on the team\'s throughput.',
    ],
    nextStep: 'End of demo — open for questions.',
  },

  // ── Fallback ──
  'default': {
    talkTrack: [
      'This is the Email Apex Quick Quote system — an AI-powered quoting engine that lives inside the team\'s existing Outlook workflow.',
      'Use the navigation controls to walk through the demo step by step.',
    ],
    nextStep: 'Follow the highlighted action to continue.',
  },
};

function getPresenterNote(state: PresenterState): PresenterNote {
  // Phase 0: No emails loaded yet
  if (!state.hintTarget && !state.selectedEmailId) return PRESENTER_NOTES.initial;
  if (state.hintTarget === 'action:refresh' && !state.selectedEmailId) return PRESENTER_NOTES.initial;

  // Phase 6: Daily summary
  if (state.selectedEmailId === 'csr-daily-summary') return PRESENTER_NOTES['daily-summary'];

  // Phase 5: Approval workflow
  if (state.approvalStage === 'composing') return PRESENTER_NOTES['approval-send'];
  if (state.approvalStage === 'pending' && state.selectedEmailId === 'csr-approval-hold') return PRESENTER_NOTES['approval-reply'];
  if (state.selectedEmailId === 'csr-approval-hold' || state.selectedEmailId === 'csr-approval-cc') return PRESENTER_NOTES['approval-open'];

  // Phase 4: Review workflow
  if (state.reviewStage === 'composing') return PRESENTER_NOTES['review-send'];
  if (state.reviewStage === 'pending' && state.selectedEmailId === 'csr-review-1' && state.hintTarget === 'action:forward') return PRESENTER_NOTES['review-forward'];
  if (state.selectedEmailId === 'csr-steve-clarification') return PRESENTER_NOTES['review-clarification'];
  if (state.selectedEmailId === 'csr-review-1') return PRESENTER_NOTES['review-open'];

  // Specific emails
  if (state.selectedEmailId && PRESENTER_NOTES[state.selectedEmailId]) {
    return PRESENTER_NOTES[state.selectedEmailId];
  }

  // Phase 0 refresh variants
  if (state.hintTarget === 'action:refresh') {
    if (state.approvalStage === 'sent') return PRESENTER_NOTES['approval-send'];
    if (state.selectedEmailId === 'csr-ai-3' || state.selectedEmailId === 'csr-rush-cc') return PRESENTER_NOTES[state.selectedEmailId] || PRESENTER_NOTES.default;
    if (state.selectedEmailId === 'csr-ai-1') return PRESENTER_NOTES['csr-ai-1'];
    if (state.selectedEmailId === 'csr-ai-2') return PRESENTER_NOTES['csr-ai-2'];
    if (state.selectedEmailId === 'csr-ai-5') return PRESENTER_NOTES['csr-ai-5'];
    return PRESENTER_NOTES.initial;
  }

  return PRESENTER_NOTES.default;
}

function formatElapsed(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function PresenterView({ onClose }: { onClose: () => void }) {
  const [darkMode, setDarkMode] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [clockTime, setClockTime] = useState('');
  const timerStartRef = useRef(Date.now());
  const channelRef = useRef<BroadcastChannel | null>(null);
  const [connected, setConnected] = useState(false);

  const [state, setState] = useState<PresenterState>({
    activeFolder: 'csr',
    selectedEmailId: null,
    reviewStage: 'pending',
    forwardStage: 'pending',
    approvalStage: 'pending',
    canGoBack: false,
    canGoForward: true,
    hintTarget: null,
  });

  const note = getPresenterNote(state);
  const actionLabel = getActionLabel(state.hintTarget);

  useEffect(() => {
    const channel = new BroadcastChannel('presenter-channel');
    channelRef.current = channel;

    channel.onmessage = (event) => {
      if (event.data.type === 'stateSync') {
        setState(event.data.state);
        setConnected(true);
      }
    };

    channel.postMessage({ type: 'stateRequest' });

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, []);

  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    channelRef.current?.postMessage({ type: 'navigate', direction });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handleNavigate('prev');
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        handleNavigate('next');
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNavigate, onClose]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - timerStartRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  useEffect(() => {
    const update = () =>
      setClockTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const toggleTimer = useCallback(() => {
    if (timerRunning) {
      setTimerRunning(false);
    } else {
      timerStartRef.current = Date.now() - elapsed * 1000;
      setTimerRunning(true);
    }
  }, [timerRunning, elapsed]);

  const resetTimer = useCallback(() => {
    timerStartRef.current = Date.now();
    setElapsed(0);
  }, []);

  return (
    <div className={cn('fixed inset-0 flex flex-col transition-colors', darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-100')}>
      {/* Top bar */}
      <div className={cn('relative flex shrink-0 items-center border-b px-4 py-2 transition-colors', darkMode ? 'border-white/10 bg-[#111]/90' : 'border-black/10 bg-white')}>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className={cn('flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors', darkMode ? 'border-white/15 bg-white/5 text-white/70 hover:border-red-500/30 hover:bg-red-500/20 hover:text-red-300' : 'border-black/15 bg-black/5 text-gray-600 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-600')}
          >
            <X className="size-3.5" />
            Close
          </button>
          <span className={darkMode ? 'text-white/15' : 'text-black/15'}>|</span>
          <span className={cn('text-sm font-medium', darkMode ? 'text-white/70' : 'text-gray-600')}>
            Presenter Controls
          </span>
        </div>

        {/* Center: Timer */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
          <span className={cn('font-mono text-xl font-semibold tabular-nums', darkMode ? 'text-white' : 'text-gray-900')}>
            {formatElapsed(elapsed)}
          </span>
          <button
            onClick={toggleTimer}
            className={cn('rounded-md p-1.5 transition-colors', darkMode ? 'text-white/50 hover:bg-white/10 hover:text-white' : 'text-gray-400 hover:bg-black/5 hover:text-gray-700')}
            aria-label={timerRunning ? 'Pause timer' : 'Resume timer'}
          >
            {timerRunning ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </button>
          <button
            onClick={resetTimer}
            className={cn('rounded-md p-1.5 transition-colors', darkMode ? 'text-white/50 hover:bg-white/10 hover:text-white' : 'text-gray-400 hover:bg-black/5 hover:text-gray-700')}
            aria-label="Reset timer"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>

        {/* Right: Clock + Dark mode */}
        <div className="ml-auto flex items-center gap-3">
          <span className={cn('text-lg font-medium', darkMode ? 'text-white/60' : 'text-gray-500')}>
            {clockTime}
          </span>
          <button
            onClick={() => setDarkMode((d) => !d)}
            className={cn('flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors', darkMode ? 'border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white' : 'border-black/15 bg-black/5 text-gray-600 hover:border-black/30 hover:bg-black/10 hover:text-gray-900')}
          >
            {darkMode ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex min-h-0 flex-1">
        {/* Left: Controller display */}
        <div className="flex flex-1 flex-col items-center justify-center p-8">
          <div className={cn('flex flex-col items-center gap-5 rounded-2xl border p-12', darkMode ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-white')}>
            <Monitor className={cn('size-16', darkMode ? 'text-white/20' : 'text-gray-300')} />
            <div className="text-center">
              <h2 className={cn('text-xl font-semibold mb-1', darkMode ? 'text-white/80' : 'text-gray-700')}>
                Presenting on External Display
              </h2>
              <p className={cn('text-sm', darkMode ? 'text-white/40' : 'text-gray-400')}>
                {connected ? 'Connected — controls are live' : 'Waiting for main window…'}
              </p>
            </div>

            <div className={cn('rounded-lg px-4 py-2 text-sm font-medium', darkMode ? 'bg-white/10 text-white/60' : 'bg-gray-100 text-gray-600')}>
              {state.activeFolder.toUpperCase()} Inbox
              {state.selectedEmailId && ` — ${state.selectedEmailId}`}
            </div>
          </div>

          {/* Navigation controls */}
          <div className="mt-8 flex items-center gap-6">
            <button
              onClick={() => handleNavigate('prev')}
              disabled={!state.canGoBack}
              className={cn('flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-30', darkMode ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-gray-200 text-gray-800 hover:bg-gray-300')}
            >
              <ChevronLeft className="size-4" />
              Back
            </button>
            <button
              onClick={() => handleNavigate('next')}
              disabled={!state.canGoForward}
              className={cn('flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-30', 'bg-blue-600 text-white hover:bg-blue-500')}
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>

          <p className={cn('mt-4 text-xs', darkMode ? 'text-white/30' : 'text-gray-400')}>
            Use arrow keys or spacebar to navigate
          </p>
        </div>

        {/* Right panel — action + talk track + next step */}
        <div className={cn('flex w-[400px] shrink-0 flex-col border-l transition-colors', darkMode ? 'border-white/10 bg-[#111]' : 'border-black/10 bg-white')}>
          {/* Action snack bar */}
          {actionLabel && (
            <div className={cn('shrink-0 border-b px-5 py-4', darkMode ? 'border-white/10' : 'border-black/10')}>
              <div className={cn('flex items-center gap-3 rounded-lg px-4 py-3', darkMode ? 'bg-blue-500/20 ring-1 ring-blue-400/30' : 'bg-blue-50 ring-1 ring-blue-200')}>
                <MousePointerClick className={cn('size-5 shrink-0', darkMode ? 'text-blue-400' : 'text-blue-600')} />
                <span className={cn('text-[15px] font-semibold', darkMode ? 'text-blue-300' : 'text-blue-700')}>
                  {actionLabel}
                </span>
              </div>
            </div>
          )}

          {/* Talk track */}
          <div className="flex-1 overflow-y-auto p-5">
            <h3 className={cn('mb-4 text-[10px] font-bold uppercase tracking-[0.15em]', darkMode ? 'text-white/40' : 'text-gray-400')}>
              Talk Track
            </h3>
            <div className="space-y-3">
              {note.talkTrack.map((line, i) => (
                <p key={i} className={cn('text-[15px] leading-relaxed', darkMode ? 'text-white/70' : 'text-gray-600')}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Next step */}
          <div className={cn('shrink-0 border-t px-5 py-4', darkMode ? 'border-white/10' : 'border-black/10')}>
            <h3 className={cn('mb-2 text-[10px] font-bold uppercase tracking-[0.15em]', darkMode ? 'text-white/40' : 'text-gray-400')}>
              Next
            </h3>
            <p className={cn('text-[14px] leading-relaxed', darkMode ? 'text-white/50' : 'text-gray-500')}>
              {note.nextStep}
            </p>
          </div>

          {/* Bottom navigation */}
          <div className={cn('border-t px-4 py-3', darkMode ? 'border-white/10' : 'border-black/10')}>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleNavigate('prev')}
                disabled={!state.canGoBack}
                className={cn('flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-30', darkMode ? 'text-white/60 hover:bg-white/10 hover:text-white' : 'text-gray-500 hover:bg-black/5 hover:text-gray-800')}
              >
                <ChevronLeft className="size-4" />
                Back
              </button>
              <button
                onClick={() => handleNavigate('next')}
                disabled={!state.canGoForward}
                className={cn('flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-30', darkMode ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-black/10 text-gray-800 hover:bg-black/15')}
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
