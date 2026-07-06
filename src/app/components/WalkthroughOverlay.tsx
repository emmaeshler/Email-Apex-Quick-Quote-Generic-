import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

interface WalkthroughStep {
  id: string;
  title: string;
  description: string;
  targetSelector?: string; // CSS selector for the element to highlight
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: string; // Optional instruction for what to click
}

interface WalkthroughPath {
  id: 'short' | 'full' | 'controls';
  name: string;
  description: string;
  steps: WalkthroughStep[];
}

const WALKTHROUGH_PATHS: WalkthroughPath[] = [
  {
    id: 'controls',
    name: 'App Controls',
    description: 'Learn about the key controls and navigation',
    steps: [
      {
        id: 'welcome-controls',
        title: 'Welcome to the Controls Tour',
        description: 'Let\'s explore the main controls you\'ll use to navigate this application.',
        position: 'center',
      },
      {
        id: 'mail-icon',
        title: 'Mail Icon Menu',
        description: 'This Mail icon opens the menu shown above. You can switch between Short Demo, Full Demo, Walkthrough, and Presenter Mode here.',
        targetSelector: '[title="Mail"]',
        position: 'bottom',
      },
      {
        id: 'refresh-button',
        title: 'Refresh Button',
        description: 'This button reveals new emails in batches, simulating how emails arrive over time. Click it to see the next batch of incoming emails.',
        targetSelector: 'button:has(svg):has-text("New Messages")',
        position: 'left',
        action: 'Click to see new emails arrive',
      },
      {
        id: 'folders',
        title: 'Inbox Folders',
        description: 'Navigate between different inboxes: CSR Inbox (customer service), Apex Quote Inbox (pricing team), Auto Quoted (ML-processed), and Flagged for Review (needs approval).',
        targetSelector: '[data-folder-list]',
        position: 'right',
      },
      {
        id: 'email-list',
        title: 'Email List',
        description: 'Click any email to view its details. Unread emails are shown in bold. The list updates as new emails arrive.',
        position: 'center',
      },
      {
        id: 'backtick-hint',
        title: 'Demo Hints',
        description: 'Press the backtick key (`) to toggle helpful hints that guide you through the demo workflows.',
        position: 'center',
      },
    ],
  },
  {
    id: 'short',
    name: 'Short Demo Walkthrough',
    description: 'Quick overview of the email quoting workflow (5 minutes)',
    steps: [
      {
        id: 'welcome-short',
        title: 'Welcome to the Short Demo',
        description: 'This walkthrough shows you the essential workflow of how quote requests are processed.',
        position: 'center',
      },
      {
        id: 'csr-inbox',
        title: 'CSR Inbox',
        description: 'Customer Service Representatives receive quote requests here. These emails contain product codes and quantities that need pricing.',
        targetSelector: '[data-folder-id="csr"]',
        position: 'right',
      },
      {
        id: 'refresh-emails',
        title: 'Refresh for New Emails',
        description: 'Click the refresh button to simulate new emails arriving. This is how you progress through the demo.',
        action: 'Click the refresh button now',
      },
      {
        id: 'select-email',
        title: 'Review Email',
        description: 'Click on the first email to see a typical quote request. Notice the product details and customer information.',
        action: 'Select the first email in the list',
      },
      {
        id: 'forward-action',
        title: 'Forward to Pricing Team',
        description: 'CSRs can forward emails to the Apex Quote Inbox for expert pricing. Look for the "Forward to Apex Quote" button.',
        targetSelector: '[data-action="forward"]',
        position: 'left',
        action: 'Click Forward to Apex Quote',
      },
      {
        id: 'eis-inbox',
        title: 'Apex Quote Inbox',
        description: 'Switch to the Apex Quote Inbox to see how pricing specialists receive and process quotes.',
        targetSelector: '[data-folder-id="eis"]',
        position: 'right',
        action: 'Click on Apex Quote Inbox',
      },
      {
        id: 'auto-quoted',
        title: 'Auto Quoted Folder',
        description: 'Some quotes are automatically processed by ML. Check this folder to see quotes that were generated without human intervention.',
        targetSelector: '[data-folder-id="auto-quoted"]',
        position: 'right',
      },
      {
        id: 'complete-short',
        title: 'Short Demo Complete!',
        description: 'You\'ve seen the basic workflow. Try the Full Demo walkthrough for a deeper dive, or exit and explore on your own.',
        position: 'center',
      },
    ],
  },
  {
    id: 'full',
    name: 'Full Demo Walkthrough',
    description: 'Complete tour of all features and workflows (10 minutes)',
    steps: [
      {
        id: 'welcome-full',
        title: 'Welcome to the Full Demo',
        description: 'This comprehensive walkthrough covers all workflows including review processes, approvals, and automation.',
        position: 'center',
      },
      {
        id: 'csr-inbox-full',
        title: 'CSR Inbox - Customer Service',
        description: 'This is where customer service reps see all incoming quote requests from customers.',
        targetSelector: '[data-folder-id="csr"]',
        position: 'right',
      },
      {
        id: 'refresh-explained',
        title: 'Refresh Button',
        description: 'Click refresh to simulate emails arriving in batches throughout the day. Each click reveals the next batch.',
        action: 'Click refresh to see the first batch',
      },
      {
        id: 'review-workflow',
        title: 'Review Workflow',
        description: 'Some emails need management review before responding. These appear in the "Flagged for Review" folder.',
        targetSelector: '[data-folder-id="review"]',
        position: 'right',
      },
      {
        id: 'email-details',
        title: 'Email Details',
        description: 'Click any email to see full details including product tables, attachments, and quote information.',
        position: 'center',
      },
      {
        id: 'quote-table',
        title: 'Quote Tables',
        description: 'Notice the quote table showing products, quantities, and prices. This is automatically extracted from the email.',
        position: 'center',
      },
      {
        id: 'forward-to-eis',
        title: 'Forward to Pricing Team',
        description: 'CSRs forward complex quotes to the pricing team (Apex Quote Inbox) for expert review.',
        action: 'Forward the email to Apex Quote',
      },
      {
        id: 'eis-processing',
        title: 'Apex Quote Inbox',
        description: 'Pricing specialists review forwarded requests and generate accurate quotes.',
        targetSelector: '[data-folder-id="eis"]',
        position: 'right',
      },
      {
        id: 'approval-holds',
        title: 'Approval Holds',
        description: 'High-value quotes or special customers require manager approval before sending.',
        position: 'center',
      },
      {
        id: 'auto-quoted-explained',
        title: 'Auto Quoted Magic',
        description: 'ML models automatically process simple quotes without human intervention, saving hours of work.',
        targetSelector: '[data-folder-id="auto-quoted"]',
        position: 'right',
      },
      {
        id: 'threaded-conversations',
        title: 'Threaded Conversations',
        description: 'Some emails show threaded conversations with inline quotes and responses, making complex discussions easy to follow.',
        position: 'center',
      },
      {
        id: 'complete-full',
        title: 'Full Demo Complete!',
        description: 'You\'ve explored all the major features. Now try exploring on your own or restart the walkthrough.',
        position: 'center',
      },
    ],
  },
];

interface WalkthroughOverlayProps {
  onClose: () => void;
  onStepChange?: (stepId: string | null) => void;
}

export function WalkthroughOverlay({ onClose, onStepChange }: WalkthroughOverlayProps) {
  const [currentPath, setCurrentPath] = useState<WalkthroughPath | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  const currentStep = currentPath?.steps[currentStepIndex];

  // Notify parent of active step
  useEffect(() => {
    onStepChange?.(currentStep?.id ?? null);
    return () => onStepChange?.(null);
  }, [currentStep, onStepChange]);

  // Highlight target element
  useEffect(() => {
    if (!currentStep?.targetSelector) {
      setHighlightedElement(null);
      return;
    }

    const element = document.querySelector(currentStep.targetSelector) as HTMLElement;
    if (element) {
      setHighlightedElement(element);
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentPath && currentStepIndex < currentPath.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSelectPath = (path: WalkthroughPath) => {
    setCurrentPath(path);
    setCurrentStepIndex(0);
  };

  const handleReset = () => {
    setCurrentPath(null);
    setCurrentStepIndex(0);
    setHighlightedElement(null);
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
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPath, currentStepIndex, onClose]);

  if (!currentPath) {
    // Path selection screen
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="relative w-full max-w-3xl mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Interactive Walkthrough</h2>
                <p className="text-sm text-muted-foreground mt-1">Choose your learning path</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Close walkthrough"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Path options */}
          <div className="p-6 space-y-4">
            {WALKTHROUGH_PATHS.map((path) => (
              <button
                key={path.id}
                onClick={() => handleSelectPath(path)}
                className="w-full text-left p-5 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {path.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                    <p className="text-xs text-muted-foreground/70 mt-2">
                      {path.steps.length} steps
                    </p>
                  </div>
                  <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" size={24} />
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-muted/30 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Use <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] font-mono">←</kbd> <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] font-mono">→</kbd> arrow keys to navigate • <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] font-mono">ESC</kbd> to close
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Active walkthrough
  return (
    <>
      {/* Highlight overlay */}
      {highlightedElement && (
        <div className="fixed inset-0 z-[199] pointer-events-none">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <mask id="highlight-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <rect
                  x={highlightedElement.getBoundingClientRect().x - 8}
                  y={highlightedElement.getBoundingClientRect().y - 8}
                  width={highlightedElement.getBoundingClientRect().width + 16}
                  height={highlightedElement.getBoundingClientRect().height + 16}
                  rx="8"
                  fill="black"
                />
              </mask>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0.5)" mask="url(#highlight-mask)" />
          </svg>

          {/* Highlight border */}
          <div
            className="absolute border-4 border-primary rounded-lg animate-pulse"
            style={{
              left: highlightedElement.getBoundingClientRect().x - 8,
              top: highlightedElement.getBoundingClientRect().y - 8,
              width: highlightedElement.getBoundingClientRect().width + 16,
              height: highlightedElement.getBoundingClientRect().height + 16,
            }}
          />
        </div>
      )}

      {/* Step card */}
      <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center p-4">
        <div
          className={`pointer-events-auto w-full max-w-md bg-card border-2 border-primary rounded-2xl shadow-2xl ${
            currentStep?.position === 'center' ? '' : 'absolute'
          }`}
          style={
            currentStep?.position !== 'center' && highlightedElement
              ? (() => {
                  const rect = highlightedElement.getBoundingClientRect();
                  const gap = 16;
                  switch (currentStep?.position) {
                    case 'right':
                      return { top: rect.top, left: rect.right + gap };
                    case 'left':
                      return { top: rect.top, right: window.innerWidth - rect.left + gap };
                    case 'top':
                      return { bottom: window.innerHeight - rect.top + gap, left: rect.left };
                    case 'bottom':
                    default:
                      return { top: rect.bottom + gap, left: rect.left };
                  }
                })()
              : {}
          }
        >
          {/* Progress bar */}
          <div className="h-1.5 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / currentPath.steps.length) * 100}%` }}
            />
          </div>

          {/* Header */}
          <div className="px-5 py-4 border-b border-border">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Step {currentStepIndex + 1} of {currentPath.steps.length}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {currentPath.name}
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
                  onClick={onClose}
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
          </div>

          {/* Footer navigation */}
          <div className="px-5 py-4 bg-muted/30 border-t border-border flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              <span className="text-sm font-medium">Back</span>
            </button>

            <div className="flex items-center gap-1">
              {currentPath.steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    idx === currentStepIndex ? 'bg-primary' : idx < currentStepIndex ? 'bg-primary/50' : 'bg-border'
                  }`}
                />
              ))}
            </div>

            {currentStepIndex < currentPath.steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <span className="text-sm font-medium">Next</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <span className="text-sm font-medium">Choose Another Path</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
