import { useState, useRef, useEffect } from 'react';
import {
  Plus, Mail, Calendar, Users, Star, CheckSquare,
  GitBranch, Cloud, MoreHorizontal,
} from 'lucide-react';
import type { DemoMode } from '../App';

interface AppRailProps {
  demoMode: DemoMode;
  onDemoModeChange: (mode: DemoMode) => void;
}

export function AppRail({ demoMode, onDemoModeChange }: AppRailProps) {
  const [showPicker, setShowPicker] = useState(false);
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
              className="absolute right-full mr-2 top-0 bg-card border border-border rounded-lg shadow-xl z-50 w-44 overflow-hidden"
            >
              <div className="px-3 py-2 border-b border-border">
                <p className="text-size-xs font-w-medium text-foreground/70 uppercase tracking-wide">Demo Mode</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDemoModeChange('short'); setShowPicker(false); }}
                className={`w-full text-left px-3 py-2.5 text-size-sm transition-colors ${
                  demoMode === 'short' ? 'bg-primary/10 text-primary font-w-medium' : 'text-foreground hover:bg-muted'
                }`}
              >
                Short Demo
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDemoModeChange('full'); setShowPicker(false); }}
                className={`w-full text-left px-3 py-2.5 text-size-sm transition-colors ${
                  demoMode === 'full' ? 'bg-primary/10 text-primary font-w-medium' : 'text-foreground hover:bg-muted'
                }`}
              >
                Full Demo
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
