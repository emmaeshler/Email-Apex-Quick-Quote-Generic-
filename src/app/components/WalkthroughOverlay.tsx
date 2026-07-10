import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, RotateCcw, PlayCircle } from 'lucide-react';

interface WalkthroughStep {
  id: string;
  title: string;
  description: string;
  targetSelector?: string | string[];
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: string;
  detour?: WalkthroughStep[];
  detourOpenAction?: string;
  detourCloseAction?: string;
}

interface WalkthroughPath {
  id: 'controls';
  name: string;
  description: string;
  steps: WalkthroughStep[];
}

const BUILDER_DETOUR: WalkthroughStep[] = [
  {
    id: 'builder-overview',
    title: 'Sequence Builder',
    description: 'This is the Sequence Builder — a drag-and-drop editor for customizing which emails appear during your demo and in what order. You can edit the built-in Short and Full sequences, create new custom ones, and tailor email batches for specific customers or use cases.',
    position: 'center',
  },
  {
    id: 'builder-selector',
    title: 'Sequence Selector',
    description: 'Use this dropdown to switch between editing the built-in Short Demo, Full Demo, or any custom sequences you\'ve created. Click "New" to start a fresh sequence from scratch. Custom sequences get their own name field.',
    targetSelector: '[data-walkthrough-target="builder-selector"]',
    position: 'bottom',
  },
  {
    id: 'builder-palette',
    title: 'Available Emails',
    description: 'This palette lists every email available in the demo. Filter by inbox (CSR or EIS) and drag individual emails or entire bundled threads into your sequence. Greyed-out emails are already in use. Click any email to preview it on the right.',
    targetSelector: '[data-walkthrough-target="builder-palette"]',
    position: 'right',
  },
  {
    id: 'builder-batches',
    title: 'Sequence Batches',
    description: 'Each batch represents one click of the Refresh button during the demo. Drag emails from the palette into a batch, reorder them within or across batches, and label each batch to remind yourself what it covers. Add more batches with the button at the bottom.',
    targetSelector: '[data-walkthrough-target="builder-batches"]',
    position: 'left',
  },
  {
    id: 'builder-toolbar',
    title: 'Save & Manage',
    description: 'When you\'re done, click Save Sequence. For presets (Short/Full), your edits override the defaults — you can reset them anytime from the Mail menu. Custom sequences appear as new options in the menu. Undo any mistake with Ctrl+Z or the Undo button.',
    targetSelector: '[data-walkthrough-target="builder-toolbar"]',
    position: 'bottom',
  },
];

const PRESENTER_DETOUR: WalkthroughStep[] = [
  {
    id: 'presenter-overview',
    title: 'Presenter View',
    description: 'This is Presenter View — a live speaker-notes window that keeps you on track during demos. It shows an embedded preview of the demo on the left and your talk track on the right, all updating in real time as you navigate.',
    position: 'center',
  },
  {
    id: 'presenter-toolbar-tour',
    title: 'Timer & Controls',
    description: 'The top bar has a presentation timer you can pause, resume, and reset. There\'s also a live clock so you can keep track of meeting time, and a dark/light mode toggle for different presentation environments.',
    targetSelector: '[data-walkthrough-target="presenter-toolbar"]',
    position: 'bottom',
  },
  {
    id: 'presenter-embed-tour',
    title: 'Live Demo Preview',
    description: 'This embedded view mirrors the audience-facing demo window. As you click through emails and folders in the main demo, this preview stays in sync so you can see exactly what your audience sees.',
    targetSelector: '[data-walkthrough-target="presenter-embed"]',
    position: 'right',
  },
  {
    id: 'presenter-notes-tour',
    title: 'Talk Track & Next Steps',
    description: 'The right panel is your teleprompter. It shows contextual talking points that update based on where you are in the demo, a highlighted "Next Action" prompt telling you exactly what to click, and a transition note for moving between sections smoothly.',
    targetSelector: '[data-walkthrough-target="presenter-notes"]',
    position: 'left',
  },
];

const WALKTHROUGH_PATHS: WalkthroughPath[] = [
  {
    id: 'controls',
    name: 'Delivery Tools',
    description: 'Learn about the demo controls, sequence editor, and presenter mode',
    steps: [
      {
        id: 'delivery-tools-overview',
        title: 'Your Demo Toolbox',
        description: 'This panel is your control center for everything you need to deliver the demo. From here you can configure the demo length, customize email sequences, and launch presenter mode.',
        targetSelector: '[data-walkthrough-target="mail-menu"]',
        position: 'right',
      },
      {
        id: 'length-toggle',
        title: 'Demo Length Toggle',
        description: 'Use this toggle to switch between Short and Full demo modes. Short gives a quick 5-minute overview of the quoting workflow. Full is a comprehensive 10-minute tour covering approvals, automation, and threaded conversations. Switch anytime — emails reset to match the selected mode.',
        targetSelector: '[data-walkthrough-target="length-toggle"]',
        position: 'right',
      },
      {
        id: 'edit-sequence',
        title: 'Edit or Add Demo Sequence',
        description: 'Open the Sequence Builder to customize which emails appear and in what order. You can edit the built-in Short and Full sequences, or create entirely new custom sequences tailored to a specific customer or use case. Each sequence defines the email batches that arrive when you click Refresh.',
        targetSelector: '[data-walkthrough-target="edit-sequence"]',
        position: 'right',
        detour: BUILDER_DETOUR,
        detourOpenAction: 'open-builder',
        detourCloseAction: 'close-builder',
      },
      {
        id: 'presenter-view',
        title: 'Presenter View',
        description: 'Launch a separate speaker-notes window with a live talk track, step-by-step prompts, and a timer. It mirrors the main demo window in real time — as you navigate emails and folders, the talk track updates to show you exactly what to say and do next. Great for live presentations or practice runs.',
        targetSelector: '[data-walkthrough-target="presenter-view"]',
        position: 'right',
        detour: PRESENTER_DETOUR,
        detourOpenAction: 'open-presenter-preview',
        detourCloseAction: 'close-presenter-preview',
      },
    ],
  },
];

interface WalkthroughOverlayProps {
  onClose: () => void;
  onStepChange?: (stepId: string | null) => void;
  onAction?: (action: string) => void;
}

export function WalkthroughOverlay({ onClose, onStepChange, onAction }: WalkthroughOverlayProps) {
  const [currentPath, setCurrentPath] = useState<WalkthroughPath | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [highlightedElements, setHighlightedElements] = useState<HTMLElement[]>([]);
  const [detour, setDetour] = useState<{ parentStepIndex: number; steps: WalkthroughStep[]; currentIndex: number; closeAction?: string; label: string } | null>(null);

  const activeSteps = detour ? detour.steps : currentPath?.steps;
  const activeIndex = detour ? detour.currentIndex : currentStepIndex;
  const currentStep = activeSteps?.[activeIndex];

  // Notify parent of active step
  useEffect(() => {
    onStepChange?.(currentStep?.id ?? null);
    return () => onStepChange?.(null);
  }, [currentStep, onStepChange]);

  // Highlight target element(s) — retry briefly for elements that render after state changes
  useEffect(() => {
    if (!currentStep?.targetSelector) {
      setHighlightedElements([]);
      return;
    }

    const selectors = Array.isArray(currentStep.targetSelector)
      ? currentStep.targetSelector
      : [currentStep.targetSelector];

    const findElements = () => {
      return selectors
        .map(sel => document.querySelector(sel) as HTMLElement)
        .filter(Boolean);
    };

    let elements = findElements();
    if (elements.length > 0) {
      setHighlightedElements(elements);
      elements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Retry a few times for elements that appear after a state change (e.g. builder opening)
    let attempts = 0;
    const timer = setInterval(() => {
      attempts++;
      elements = findElements();
      if (elements.length > 0) {
        setHighlightedElements(elements);
        elements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        clearInterval(timer);
      } else if (attempts >= 10) {
        setHighlightedElements([]);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentStep]);

  const exitDetour = () => {
    if (detour?.closeAction) onAction?.(detour.closeAction);
    setDetour(null);
  };

  const handleNext = () => {
    if (detour) {
      if (detour.currentIndex < detour.steps.length - 1) {
        setDetour({ ...detour, currentIndex: detour.currentIndex + 1 });
      } else {
        exitDetour();
      }
    } else if (currentPath && currentStepIndex < currentPath.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (detour) {
      if (detour.currentIndex > 0) {
        setDetour({ ...detour, currentIndex: detour.currentIndex - 1 });
      } else {
        exitDetour();
      }
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleStartDetour = () => {
    if (!currentStep?.detour) return;
    if (currentStep.detourOpenAction) onAction?.(currentStep.detourOpenAction);
    setDetour({
      parentStepIndex: currentStepIndex,
      steps: currentStep.detour,
      currentIndex: 0,
      closeAction: currentStep.detourCloseAction,
      label: currentStep.title + ' Tour',
    });
  };

  const handleSelectPath = (path: WalkthroughPath) => {
    setCurrentPath(path);
    setCurrentStepIndex(0);
  };

  const handleReset = () => {
    if (detour) exitDetour();
    setCurrentPath(null);
    setCurrentStepIndex(0);
    setHighlightedElements([]);
  };

  const handleClose = () => {
    if (detour) exitDetour();
    onClose();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentPath) return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleBack();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPath, currentStepIndex, detour, onClose]);

  if (!currentPath) {
    // Path selection screen
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-md mx-4 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-semibold text-foreground">How It Works</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Learn the demo tools or get help</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Path options */}
            <div className="px-5 pb-3 space-y-2">
              {WALKTHROUGH_PATHS.map((path) => (
                <button
                  key={path.id}
                  onClick={() => handleSelectPath(path)}
                  className="w-full text-left px-4 py-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {path.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{path.description}</p>
                    </div>
                    <ChevronRight className="text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0 ml-3" size={16} />
                  </div>
                </button>
              ))}
            </div>


            {/* Footer */}
            <div className="px-5 py-3 border-t border-border">
              <p className="text-[10px] text-muted-foreground/70 text-center">
                <kbd className="px-1 py-px bg-muted border border-border rounded text-[10px] font-mono">←</kbd> <kbd className="px-1 py-px bg-muted border border-border rounded text-[10px] font-mono">→</kbd> navigate · <kbd className="px-1 py-px bg-muted border border-border rounded text-[10px] font-mono">ESC</kbd> close
              </p>
            </div>
          </div>
        </div>
    );
  }

  const totalSteps = activeSteps?.length ?? 0;
  const isLastStep = activeIndex === totalSteps - 1;
  const isFirstStep = activeIndex === 0;

  // Active walkthrough
  return (
    <>
      {/* Highlight overlay */}
      {highlightedElements.length > 0 && (() => {
        const rects = highlightedElements.map(el => el.getBoundingClientRect());
        const combined = {
          x: Math.min(...rects.map(r => r.x)) - 8,
          y: Math.min(...rects.map(r => r.y)) - 8,
          right: Math.max(...rects.map(r => r.right)) + 8,
          bottom: Math.max(...rects.map(r => r.bottom)) + 8,
        };
        const combinedWidth = combined.right - combined.x;
        const combinedHeight = combined.bottom - combined.y;

        return (
          <div className="fixed inset-0 z-[199] pointer-events-none">
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <mask id="highlight-mask">
                  <rect x="0" y="0" width="100%" height="100%" fill="white" />
                  {rects.map((rect, i) => (
                    <rect
                      key={i}
                      x={rect.x - 8}
                      y={rect.y - 8}
                      width={rect.width + 16}
                      height={rect.height + 16}
                      rx="8"
                      fill="black"
                    />
                  ))}
                </mask>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0.5)" mask="url(#highlight-mask)" />
            </svg>

            {/* Highlight border around combined area */}
            <div
              className="absolute border-4 border-primary rounded-lg animate-pulse"
              style={{
                left: combined.x,
                top: combined.y,
                width: combinedWidth,
                height: combinedHeight,
              }}
            />
          </div>
        );
      })()}

      {/* Step card */}
      <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center p-4">
        <div
          className={`pointer-events-auto w-full max-w-md bg-card border-2 border-primary rounded-2xl shadow-2xl overflow-hidden ${
            currentStep?.position === 'center' ? '' : 'absolute'
          }`}
          style={
            currentStep?.position !== 'center' && highlightedElements.length > 0
              ? (() => {
                  const rects = highlightedElements.map(el => el.getBoundingClientRect());
                  const combined = {
                    top: Math.min(...rects.map(r => r.top)),
                    left: Math.min(...rects.map(r => r.left)),
                    right: Math.max(...rects.map(r => r.right)),
                    bottom: Math.max(...rects.map(r => r.bottom)),
                  };
                  const gap = 16;
                  const pad = 16;
                  const cardW = 420;
                  const cardH = 300;
                  const vw = window.innerWidth;
                  const vh = window.innerHeight;

                  let x: number, y: number;
                  switch (currentStep?.position) {
                    case 'right':
                      x = combined.right + gap;
                      y = combined.top;
                      break;
                    case 'left':
                      x = combined.left - gap - cardW;
                      y = combined.top;
                      break;
                    case 'top':
                      x = combined.left;
                      y = combined.top - gap - cardH;
                      break;
                    case 'bottom':
                    default:
                      x = combined.left;
                      y = combined.bottom + gap;
                      break;
                  }

                  x = Math.max(pad, Math.min(x, vw - cardW - pad));
                  y = Math.max(pad, Math.min(y, vh - cardH - pad));

                  return { top: y, left: x } as React.CSSProperties;
                })()
              : {}
          }
        >
          {/* Progress bar */}
          <div className="h-1.5 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>

          {/* Header */}
          <div className="px-5 py-4 border-b border-border">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Step {activeIndex + 1} of {totalSteps}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {detour ? detour.label : currentPath.name}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground">{currentStep?.title}</h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Change path"
                  title="Choose different path"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Close walkthrough"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 py-4">
            <p className="text-sm text-foreground leading-relaxed">{currentStep?.description}</p>
            {currentStep?.action && (
              <div className="mt-3 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-xs font-medium text-primary">
                  👉 {currentStep.action}
                </p>
              </div>
            )}
            {currentStep?.detour && !detour && (
              <button
                onClick={handleStartDetour}
                className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors group"
              >
                <PlayCircle size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">See How It Works</span>
              </button>
            )}
          </div>

          {/* Footer navigation */}
          <div className="px-5 py-4 bg-muted/30 border-t border-border flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={isFirstStep && !detour}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              <span className="text-sm font-medium">{detour && isFirstStep ? 'Exit Tour' : 'Back'}</span>
            </button>

            <div className="flex items-center gap-1">
              {(activeSteps ?? []).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    idx === activeIndex ? 'bg-primary' : idx < activeIndex ? 'bg-primary/50' : 'bg-border'
                  }`}
                />
              ))}
            </div>

            {detour && isLastStep ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <span className="text-sm font-medium">Done</span>
              </button>
            ) : !detour && isLastStep ? (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <span className="text-sm font-medium">Choose Another Path</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <span className="text-sm font-medium">Next</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
