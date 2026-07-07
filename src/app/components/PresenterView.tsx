import { useCallback, useEffect, useRef, useState } from 'react';
import { X, Pause, Play, RotateCcw, Sun, Moon, MousePointerClick } from 'lucide-react';
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
  demoMode: 'short' | 'full';
}

interface PresenterNote {
  title: string | null;
  talkTrack: string[];
  nextStep: string;
}

interface PresenterNoteConfig {
  title: string | null;
  talkTrack: string[];
  nextStep: string;
  short?: { talkTrack?: string[]; nextStep?: string };
  full?: { talkTrack?: string[]; nextStep?: string };
}

const ACTION_LABELS: Record<string, string> = {
  'action:refresh': 'Click Refresh',
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

function renderBold(text: string): (string | JSX.Element)[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function resolveNote(config: PresenterNoteConfig, demoMode: 'short' | 'full'): PresenterNote {
  const override = config[demoMode];
  return {
    title: config.title,
    talkTrack: override?.talkTrack ?? config.talkTrack,
    nextStep: override?.nextStep ?? config.nextStep,
  };
}

const PRESENTER_NOTES: Record<string, PresenterNoteConfig> = {
  // ── Phase 0: Initial ──
  'initial': {
    title: null,
    talkTrack: [
      '**Outlook inbox** — This is the CSR\'s actual email interface, the same one they work in every day. Nothing new to learn.',
      '**AI engine** — Behind the scenes, the quoting engine is watching for incoming requests and processing them automatically.',
    ],
    nextStep: 'Click Refresh to load the first batch of quote requests.',
    short: {
      talkTrack: [
        '**Outlook inbox** — This is the CSR\'s actual email interface, the same one they work in every day.',
        '**Short demo** — We\'ll cover three key scenarios: auto-quoting, multi-product quotes, and the human review handoff.',
      ],
    },
    full: {
      talkTrack: [
        '**Outlook inbox** — This is the CSR\'s actual email interface, the same one they work in every day.',
        '**Full demo** — We\'ll walk through auto-quoting, customer-specific pricing, rush orders, specialist review, manager approval, and daily reporting.',
      ],
    },
  },

  // ── Phase 1: Adhesive Auto-Quote ──
  'csr-ai-1': {
    title: 'Jawinder Schahal — Adhesive & Activator Pricing',
    talkTrack: [
      '**Auto-quoted** — Jawinder from RCSCA sent a standard adhesive request. The AI recognized the products, pulled pricing history, and generated the quote automatically.',
      '**Zero touch** — This CC confirms the quote was already sent before the CSR even opened their inbox. No human intervention needed for routine reorders.',
    ],
    nextStep: 'Load next batch to see a multi-line request.',
  },

  // ── Phase 2: Tapered Reels Auto-Quote ──
  'csr-ai-2': {
    title: 'Dave Morrison — Tapered Reel & Spool Packaging',
    talkTrack: [
      '**Multi-line** — Six different reel and spool configurations in one request. This used to take 20+ minutes manually — looking up each SKU, checking inventory, calculating per-unit pricing.',
      '**Instant** — The AI handled all six line items simultaneously and sent the quote back in seconds.',
    ],
    nextStep: 'Load more emails for nuanced scenarios.',
    short: {
      nextStep: 'Load the review workflow — not every request can be auto-quoted.',
    },
    full: {
      nextStep: 'Load more emails for customer-specific pricing and rush orders.',
    },
  },

  // ── Phase 2.5: Customer-Specific Pricing (full only) ──
  'csr-ai-4': {
    title: 'Karen Walsh — Adhesive & Activator (Northeast Motor)',
    talkTrack: [
      '**Same products, different price** — Karen from Northeast Motor ordered the same adhesive products as Jawinder, but Northeast Motor has negotiated distributor rates.',
      '**Contract pricing** — The AI automatically applies their specific agreement. No one had to look up a pricing schedule or cross-reference a spreadsheet.',
    ],
    nextStep: 'Open Gulf Coast\'s quote to compare pricing for the same products.',
  },
  'csr-ai-5': {
    title: 'Mike Hernandez — Adhesive & Activator Reorder (Gulf Coast)',
    talkTrack: [
      '**Third customer, third price** — Same products again, but Gulf Coast Rebuilders gets their own account-specific pricing based on volume history and contract terms.',
      '**Time saved** — Manually cross-referencing customer agreements used to take 10+ minutes per quote. The AI handles it instantly.',
    ],
    nextStep: 'Load next batch for rush orders and quantity breaks.',
  },

  // ── Phase 3: Rush + Qty-Break (full only) ──
  'csr-rush-cc': {
    title: 'Jawinder Schahal — Rush Adhesive & Activator Reorder',
    talkTrack: [
      '**Rush detected** — Same adhesive order, but Jawinder flagged it urgent — she needs Friday delivery. The AI detected the rush language and auto-applied expedited shipping with the surcharge.',
      '**No manual calc** — Rush orders used to require manual intervention for every surcharge calculation and timeline adjustment.',
    ],
    nextStep: 'Open the quantity-break quote to see tiered pricing.',
  },
  'csr-ai-3': {
    title: 'Lisa Torres — Silicone Rescue Tape Q1 Restock',
    talkTrack: [
      '**Volume discount** — Lisa ordered enough silicone rescue tape to trigger a quantity break tier. The AI recognized the threshold and applied the correct discount automatically.',
      '**Error-prone** — Tiered pricing was one of the most common sources of manual quoting errors. The system eliminates that risk.',
    ],
    nextStep: 'Load the review workflow — human expertise needed.',
  },

  // ── Phase 4: Review Workflow ──
  'review-open': {
    title: 'Steve Landers — Magnet Wire Pricing',
    talkTrack: [
      '**Not auto-quotable** — Steve from Stonite Coil needs specialty magnet wire pricing — HPL and SDPZ round tapers. The AI doesn\'t have enough detail to quote these confidently.',
      '**Pre-drafted reply** — Instead of guessing, the agent drafted a clarification email back to Steve asking for the missing specs.',
    ],
    nextStep: 'Forward the pre-drafted clarification email to Steve.',
  },
  'review-forward': {
    title: 'Steve Landers — Requesting Clarification',
    talkTrack: [
      '**AI-drafted** — The agent pre-wrote this clarification request to Steve. The compose window is pre-filled — the CSR just reviews and sends.',
      '**No manual drafting** — The CSR didn\'t have to figure out what information was missing or write the follow-up from scratch.',
    ],
    nextStep: 'Send the clarification request to Steve.',
  },
  'review-send': {
    title: 'Steve Landers — Awaiting Clarification',
    talkTrack: [
      '**Sent** — The clarification request is on its way to Steve. Once he replies with the missing specs, the AI can generate the final quote.',
    ],
    nextStep: 'Steve\'s clarification reply will arrive shortly.',
  },
  'review-sent-waiting': {
    title: 'Steve Landers — Clarification Received',
    talkTrack: [
      '**Steve replied** — Steve sent back the additional specs the AI requested. The system now has everything it needs to generate the quote.',
    ],
    nextStep: 'Open Steve\'s Clarification email to see the result.',
  },
  'review-clarification': {
    title: 'Steve Landers — Magnet Wire Clarification',
    talkTrack: [
      '**Final quote** — With Steve\'s clarification in hand, the AI generated the complete magnet wire quote automatically.',
      '**Learning loop** — Each human-in-the-loop interaction like this trains the model, so similar magnet wire requests can be handled with less back-and-forth next time.',
    ],
    nextStep: 'Load the approval workflow for manager sign-off.',
    short: {
      nextStep: 'End of short demo — routine quotes auto-handled, complex ones handed off cleanly.',
    },
  },

  // ── Phase 5: Approval ──
  'approval-open': {
    title: 'Gary Tillman — Motor Rewind Materials',
    talkTrack: [
      '**Approval hold** — Gary\'s motor rewind materials order totals over $11,000, which is above the auto-send threshold. The system held the quote and routed it to the manager.',
      '**Full visibility** — The manager sees a complete breakdown: line items, margins, and the specific reason for the hold.',
    ],
    nextStep: 'Reply to approve the quote.',
  },
  'approval-reply': {
    title: 'Gary Tillman — Motor Rewind Materials',
    talkTrack: [
      '**Simple approval** — The manager reviews the details and approves with a simple reply. No separate system to log into.',
      '**Configurable** — Approval thresholds are adjustable. Only quotes above certain dollar amounts or with special conditions need sign-off — everything else flows through automatically.',
    ],
    nextStep: 'Send approval to release the quote.',
  },
  'approval-send': {
    title: 'Gary Tillman — Motor Rewind Materials',
    talkTrack: [
      '**Released** — The approved quote is sent to Gary and the CRM is updated automatically.',
      '**Speed** — The entire workflow — from Gary\'s email to approved quote — took minutes instead of hours.',
    ],
    nextStep: 'Load the daily summary for the big-picture impact.',
  },

  // ── Phase 6: Daily Summary ──
  'daily-summary': {
    title: 'Daily Quoting Summary',
    talkTrack: [
      '**The "so what"** — This daily summary gives managers a complete overview: quotes processed, auto-quoted vs. specialist-reviewed, average response times, and approval rates.',
      '**Impact** — These are the concrete metrics showing how AI-assisted quoting improves team throughput and customer responsiveness.',
    ],
    nextStep: 'End of demo — open for questions.',
  },

  // ── Fallback ──
  'default': {
    title: null,
    talkTrack: [
      '**AI quoting** — An AI-powered quoting engine that lives inside the team\'s existing Outlook workflow.',
      '**Navigate** — Follow the highlighted actions to walk through the demo step by step.',
    ],
    nextStep: 'Follow the highlighted action to continue.',
  },
};

function getPresenterNote(state: PresenterState): PresenterNote {
  const mode = state.demoMode;

  // Phase 0: No emails loaded yet
  if (!state.hintTarget && !state.selectedEmailId) return resolveNote(PRESENTER_NOTES.initial, mode);
  if (state.hintTarget === 'action:refresh' && !state.selectedEmailId) return resolveNote(PRESENTER_NOTES.initial, mode);

  // Phase 6: Daily summary
  if (state.selectedEmailId === 'csr-daily-summary') return resolveNote(PRESENTER_NOTES['daily-summary'], mode);

  // Phase 5: Approval workflow
  if (state.approvalStage === 'composing') return resolveNote(PRESENTER_NOTES['approval-send'], mode);
  if (state.approvalStage === 'pending' && state.selectedEmailId === 'csr-approval-hold') return resolveNote(PRESENTER_NOTES['approval-reply'], mode);
  if (state.selectedEmailId === 'csr-approval-hold' || state.selectedEmailId === 'csr-approval-cc') return resolveNote(PRESENTER_NOTES['approval-open'], mode);

  // Phase 4: Review workflow
  if (state.reviewStage === 'composing') return resolveNote(PRESENTER_NOTES['review-send'], mode);
  if (state.reviewStage === 'pending' && state.selectedEmailId === 'csr-review-1' && state.hintTarget === 'action:forward') return resolveNote(PRESENTER_NOTES['review-forward'], mode);
  if (state.selectedEmailId === 'csr-steve-clarification') return resolveNote(PRESENTER_NOTES['review-clarification'], mode);
  // Review sent, hint pointing to Steve's clarification — show transition to open it
  if (state.hintTarget === 'email:csr-steve-clarification') return resolveNote(PRESENTER_NOTES['review-sent-waiting'], mode);
  if (state.selectedEmailId === 'csr-review-1') return resolveNote(PRESENTER_NOTES['review-open'], mode);

  // Specific emails
  if (state.selectedEmailId && PRESENTER_NOTES[state.selectedEmailId]) {
    return resolveNote(PRESENTER_NOTES[state.selectedEmailId], mode);
  }

  // Phase 0 refresh variants
  if (state.hintTarget === 'action:refresh') {
    if (state.approvalStage === 'sent') return resolveNote(PRESENTER_NOTES['approval-send'], mode);
    if (state.selectedEmailId === 'csr-ai-3' || state.selectedEmailId === 'csr-rush-cc') return resolveNote(PRESENTER_NOTES[state.selectedEmailId] || PRESENTER_NOTES.default, mode);
    if (state.selectedEmailId === 'csr-ai-1') return resolveNote(PRESENTER_NOTES['csr-ai-1'], mode);
    if (state.selectedEmailId === 'csr-ai-2') return resolveNote(PRESENTER_NOTES['csr-ai-2'], mode);
    if (state.selectedEmailId === 'csr-ai-5') return resolveNote(PRESENTER_NOTES['csr-ai-5'], mode);
    return resolveNote(PRESENTER_NOTES.initial, mode);
  }

  return resolveNote(PRESENTER_NOTES.default, mode);
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
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [state, setState] = useState<PresenterState>({
    activeFolder: 'csr',
    selectedEmailId: null,
    reviewStage: 'pending',
    forwardStage: 'pending',
    approvalStage: 'pending',
    canGoBack: false,
    canGoForward: true,
    hintTarget: null,
    demoMode: 'short',
  });

  const note = getPresenterNote(state);
  const actionLabel = getActionLabel(state.hintTarget);

  // Listen for state from the embedded app iframe via postMessage
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'presenterStateSync') {
        setState(event.data.state);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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

  // Build iframe URL for the embedded interactive app
  const embedUrl = window.location.href.split('?')[0] + '?demo=presenter&presenterEmbed=true';

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
        {/* Left: Interactive app embed */}
        <div className="flex-1 min-w-0">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            className="size-full border-0"
            title="Demo preview"
          />
        </div>

        {/* Right panel — action + talk track + next step */}
        <div className={cn('flex w-[380px] shrink-0 flex-col border-l transition-colors', darkMode ? 'border-white/10 bg-[#111]' : 'border-black/10 bg-white')}>
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

          {/* Talk track + transition (flows together) */}
          <div className="flex-1 overflow-y-auto p-5">
            <div className="mb-4">
              <h3 className={cn('text-[10px] font-bold uppercase tracking-[0.15em]', darkMode ? 'text-white/40' : 'text-gray-400')}>
                Talk Track
              </h3>
              {note.title && (
                <p className={cn('mt-1.5 text-[13px] font-semibold', darkMode ? 'text-white/80' : 'text-gray-700')}>
                  {note.title}
                </p>
              )}
            </div>
            <ul className="space-y-2">
              {note.talkTrack.map((line, i) => (
                <li key={i} className={cn('flex gap-2.5 text-[14px] leading-relaxed', darkMode ? 'text-white/70' : 'text-gray-600')}>
                  <span className={cn('mt-1.5 size-1.5 shrink-0 rounded-full', darkMode ? 'bg-white/30' : 'bg-gray-400')} />
                  <span>{renderBold(line)}</span>
                </li>
              ))}
            </ul>

            {/* Transition — sits right below the last bullet */}
            <div className={cn('mt-5 rounded-lg px-4 py-3', darkMode ? 'bg-white/5' : 'bg-gray-50')}>
              <h3 className={cn('mb-1.5 text-[10px] font-bold uppercase tracking-[0.15em]', darkMode ? 'text-white/40' : 'text-gray-400')}>
                Transition
              </h3>
              <p className={cn('text-[14px] italic leading-relaxed', darkMode ? 'text-white/50' : 'text-gray-500')}>
                {note.nextStep}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
