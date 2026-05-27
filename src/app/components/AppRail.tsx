import {
  Plus, Mail, Calendar, Users, Star, CheckSquare,
  GitBranch, Cloud, MoreHorizontal,
} from 'lucide-react';

const railItems = [
  { icon: Plus, label: 'New', isAction: true },
  { icon: Mail, label: 'Mail', isActive: true },
  { icon: Calendar, label: 'Calendar' },
  { icon: Users, label: 'People' },
  { icon: Star, label: 'Favorites' },
  { icon: CheckSquare, label: 'Tasks' },
  { icon: GitBranch, label: 'Workflows' },
  { icon: Cloud, label: 'Cloud' },
  { icon: MoreHorizontal, label: 'More apps' },
];

export function AppRail() {
  return (
    <div className="w-12 flex-shrink-0 flex flex-col items-center py-3 gap-1 bg-background">
      {railItems.map(({ icon: Icon, label, isActive, isAction }) => (
        <div
          key={label}
          className={`relative w-10 h-10 flex items-center justify-center rounded-full cursor-default transition-colors ${
            isActive
              ? 'bg-primary/12 text-primary'
              : isAction
                ? 'text-foreground/70'
                : 'text-foreground/40 hover:text-foreground/60'
          }`}
          title={label}
        >
          <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
        </div>
      ))}
    </div>
  );
}
