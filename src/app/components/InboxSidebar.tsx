import { Inbox, Zap, ChevronsLeft, ChevronsRight, Flag, ChevronRight, ChevronDown, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { DemoDot } from './DemoGuide';
import type { InboxFolderDef } from '../data/emails';

interface InboxSidebarProps {
  folders: InboxFolderDef[];
  activeFolderId: string;
  onFolderSelect: (folderId: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  hintTarget?: string | null;
}

const iconMap = {
  inbox: Inbox,
  zap: Zap,
  flag: Flag,
};

function FolderButton({
  folder,
  isActive,
  isHinted,
  collapsed,
  onSelect,
  depth = 0,
}: {
  folder: InboxFolderDef;
  isActive: boolean;
  isHinted: boolean;
  collapsed: boolean;
  onSelect: (id: string) => void;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = folder.children && folder.children.length > 0;
  const Icon = iconMap[folder.icon];

  return (
    <>
      <button
        onClick={() => onSelect(folder.id)}
        title={collapsed ? `${folder.label}${folder.sublabel ? ` — ${folder.sublabel}` : ''}` : undefined}
        className={`w-full relative flex items-center transition-colors text-left ${
          collapsed ? 'justify-center px-0 py-3' : 'gap-2 py-2.5'
        } ${isActive ? 'bg-primary/10 border-l-[3px] border-l-primary' : 'hover:bg-muted border-l-[3px] border-l-transparent'}`}
        style={!collapsed ? { paddingLeft: `${depth * 16 + 16}px`, paddingRight: '16px' } : undefined}
      >
        {isHinted && <DemoDot className="top-1 right-2" />}

        {/* Expand/collapse toggle for folders with children */}
        {!collapsed && hasChildren && (
          <span
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
            className="flex-shrink-0 p-0.5 rounded-[var(--radius)] hover:bg-muted text-muted-foreground transition-colors"
          >
            {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}

        <div className="relative flex-shrink-0">
          <Icon size={16} className={isActive ? 'text-primary' : 'text-muted-foreground'} />
          {collapsed && folder.unreadCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-w-medium transition-all duration-300"
              style={{ fontSize: '9px' }}
            >
              {folder.unreadCount}
            </span>
          )}
        </div>

        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <span
                className={`block text-size-sm truncate ${
                  isActive ? 'text-primary font-w-medium' : 'text-sidebar-foreground font-w-normal'
                }`}
              >
                {folder.label}
              </span>
              {folder.sublabel && (
                <span className="block text-size-xs text-muted-foreground truncate">
                  {folder.sublabel}
                </span>
              )}
            </div>
            {folder.unreadCount > 0 && (
              <span
                className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-size-xs font-w-medium flex-shrink-0 transition-all duration-300 ${
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {folder.unreadCount}
              </span>
            )}
          </>
        )}
      </button>

      {/* Render children subfolders */}
      {!collapsed && hasChildren && expanded && (
        <div>
          {folder.children!.map((child) => (
            <SubfolderButton key={child.id} folder={child} collapsed={collapsed} depth={depth + 1} />
          ))}
        </div>
      )}
    </>
  );
}

/** Subfolder — non-interactive decorative item */
function SubfolderButton({
  folder,
  collapsed,
  depth,
}: {
  folder: InboxFolderDef;
  collapsed: boolean;
  depth: number;
}) {
  return (
    <div
      className="w-full relative flex items-center gap-2 py-1.5 text-left border-l-[3px] border-l-transparent text-muted-foreground cursor-default"
      style={!collapsed ? { paddingLeft: `${depth * 16 + 16 + 22}px`, paddingRight: '16px' } : undefined}
    >
      <FolderOpen size={14} className="flex-shrink-0 text-muted-foreground" />
      <span className="block text-size-xs truncate text-sidebar-foreground font-w-normal">
        {folder.label}
      </span>
    </div>
  );
}

export function InboxSidebar({
  folders,
  activeFolderId,
  onFolderSelect,
  collapsed,
  onToggleCollapse,
  hintTarget = null,
}: InboxSidebarProps) {
  return (
    <div
      className={`bg-sidebar border-r border-sidebar-border flex flex-col overflow-y-auto transition-all duration-200 ${
        collapsed ? 'w-12' : 'w-56'
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center border-b border-sidebar-border ${
          collapsed ? 'justify-center px-0 py-3' : 'justify-between px-4 py-3'
        }`}
      >
        {!collapsed && <p className="text-size-sm font-w-medium text-foreground">Folders</p>}
        <button
          onClick={onToggleCollapse}
          className="p-1 hover:bg-muted rounded-[var(--radius)] transition-colors text-muted-foreground hover:text-foreground"
          title={collapsed ? 'Expand folder pane' : 'Collapse folder pane'}
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>

      {/* Folders */}
      <div className="py-1">
        {folders.map((folder) => {
          const isActive = folder.id === activeFolderId;
          const isHinted = hintTarget === `folder:${folder.id}`;

          return (
            <FolderButton
              key={folder.id}
              folder={folder}
              isActive={isActive}
              isHinted={isHinted}
              collapsed={collapsed}
              onSelect={onFolderSelect}
            />
          );
        })}
      </div>
    </div>
  );
}
