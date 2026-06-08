'use client';

import { Inbox, Send, Trash2, Archive, AlertOctagon, Mail, Zap, Flag, ChevronRight, ChevronDown, ChevronsLeft, ChevronsRight } from 'lucide-react';
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

interface FolderItemProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  count?: number;
  isActive?: boolean;
  onClick: () => void;
  indent?: boolean;
  isHinted?: boolean;
}

function FolderItem({ icon: Icon, label, count, isActive = false, onClick, indent = false, isHinted = false }: FolderItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-4 py-2 text-left transition-colors relative ${
        isActive
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-muted/50 text-foreground'
      } ${indent ? 'pl-10' : ''}`}
    >
      {isHinted && <DemoDot className="top-1 right-2" />}
      <Icon size={18} className={isActive ? 'text-primary' : 'text-foreground/70'} />
      <span className="flex-1 text-size-base font-normal truncate">{label}</span>
      {count !== undefined && count > 0 && (
        <span className={`text-size-sm font-normal ${isActive ? 'text-primary' : 'text-foreground/70'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

interface SectionHeaderProps {
  label: string;
  isExpanded: boolean;
  onToggle: () => void;
}

function SectionHeader({ label, isExpanded, onToggle }: SectionHeaderProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-1 px-4 py-2 text-left hover:bg-muted/30 transition-colors"
    >
      {isExpanded ? (
        <ChevronDown size={16} className="text-foreground/70" />
      ) : (
        <ChevronRight size={16} className="text-foreground/70" />
      )}
      <span className="text-size-base font-semibold text-foreground truncate">{label}</span>
    </button>
  );
}

const folderIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  autoquotes: Zap,
  approval: Flag,
  morgan: Inbox,
  eis: Zap,
};

export function InboxSidebar({
  folders,
  activeFolderId,
  onFolderSelect,
  collapsed,
  onToggleCollapse,
  hintTarget = null,
}: InboxSidebarProps) {
  const [morganExpanded, setMorganExpanded] = useState(true);
  const [autoQuotesExpanded, setAutoQuotesExpanded] = useState(true);
  const [approvalExpanded, setApprovalExpanded] = useState(true);
  const [eisExpanded, setEisExpanded] = useState(false);
  const [favoritesExpanded, setFavoritesExpanded] = useState(false);

  if (collapsed) {
    return (
      <div className="w-12 bg-sidebar flex flex-col overflow-y-auto transition-all duration-200 rounded-lg shadow-lg">
        <div className="flex items-center justify-center px-0 py-3 border-b border-sidebar-border">
          <button
            onClick={onToggleCollapse}
            className="p-1 hover:bg-muted rounded-[var(--radius)] transition-colors text-muted-foreground hover:text-foreground"
            title="Expand folder pane"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const autoQuotesFolder = folders.find(f => f.id === 'autoquotes');
  const approvalFolder = folders.find(f => f.id === 'approval');
  const morganFolder = folders.find(f => f.id === 'morgan');
  const eisFolder = folders.find(f => f.id === 'eis');

  return (
    <div className="w-64 bg-background flex flex-col overflow-y-auto transition-all duration-200 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <p className="text-size-base font-semibold text-foreground">Folders</p>
        <button
          onClick={onToggleCollapse}
          className="p-1 hover:bg-muted rounded-[var(--radius)] transition-colors text-muted-foreground hover:text-foreground"
          title="Collapse folder pane"
        >
          <ChevronsLeft size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Favorites Section */}
        <div className="pt-2">
          <SectionHeader
            label="Favorites"
            isExpanded={favoritesExpanded}
            onToggle={() => setFavoritesExpanded(!favoritesExpanded)}
          />
          {favoritesExpanded && (
            <div>
              <FolderItem
                icon={Inbox}
                label="Inbox"
                count={morganFolder?.count ?? 0}
                isActive={false}
                onClick={() => onFolderSelect('morgan')}
              />
              <FolderItem
                icon={Send}
                label="Sent"
                count={0}
                isActive={false}
                onClick={() => {}}
              />
              <FolderItem
                icon={Trash2}
                label="Deleted Items"
                count={14}
                isActive={false}
                onClick={() => {}}
              />
            </div>
          )}
        </div>

        {/* morgan@apex-corp.com Section */}
        <div className="pt-2">
          <SectionHeader
            label="morgan@apex-corp.com"
            isExpanded={morganExpanded}
            onToggle={() => setMorganExpanded(!morganExpanded)}
          />
          {morganExpanded && (
            <div>
              <FolderItem
                icon={Inbox}
                label="Inbox"
                count={morganFolder?.count ?? 0}
                isActive={activeFolderId === 'morgan'}
                onClick={() => onFolderSelect('morgan')}
                isHinted={hintTarget === 'folder:morgan'}
              />
              <FolderItem
                icon={Mail}
                label="OEM"
                count={3}
                isActive={false}
                onClick={() => {}}
                indent
              />
              <FolderItem
                icon={Mail}
                label="AM/MRO"
                count={5}
                isActive={false}
                onClick={() => {}}
                indent
              />
              <FolderItem
                icon={Trash2}
                label="Deleted Items"
                count={14}
                isActive={false}
                onClick={() => {}}
              />
              <FolderItem
                icon={Archive}
                label="Archive"
                count={47}
                isActive={false}
                onClick={() => {}}
              />
              <FolderItem
                icon={AlertOctagon}
                label="Junk Email"
                count={2}
                isActive={false}
                onClick={() => {}}
              />
            </div>
          )}
        </div>

        {/* Auto-Quotes Section */}
        <div className="pt-2">
          <SectionHeader
            label="Auto-Quotes"
            isExpanded={autoQuotesExpanded}
            onToggle={() => setAutoQuotesExpanded(!autoQuotesExpanded)}
          />
          {autoQuotesExpanded && (
            <div>
              <FolderItem
                icon={Zap}
                label="Inbox"
                count={autoQuotesFolder?.count ?? 0}
                isActive={activeFolderId === 'autoquotes'}
                onClick={() => onFolderSelect('autoquotes')}
                isHinted={hintTarget === 'folder:autoquotes'}
              />
            </div>
          )}
        </div>

        {/* Needs Approval Section */}
        <div className="pt-2">
          <SectionHeader
            label="Needs Approval"
            isExpanded={approvalExpanded}
            onToggle={() => setApprovalExpanded(!approvalExpanded)}
          />
          {approvalExpanded && (
            <div>
              <FolderItem
                icon={Flag}
                label="Inbox"
                count={approvalFolder?.count ?? 0}
                isActive={activeFolderId === 'approval'}
                onClick={() => onFolderSelect('approval')}
                isHinted={hintTarget === 'folder:approval'}
              />
            </div>
          )}
        </div>

        {/* Apex Quote Inbox Section */}
        <div className="pt-2 pb-2">
          <SectionHeader
            label="Apex Quote Inbox"
            isExpanded={eisExpanded}
            onToggle={() => setEisExpanded(!eisExpanded)}
          />
          {eisExpanded && (
            <div>
              <FolderItem
                icon={Zap}
                label="Inbox"
                count={eisFolder?.count ?? 0}
                isActive={activeFolderId === 'eis'}
                onClick={() => onFolderSelect('eis')}
                isHinted={hintTarget === 'folder:eis'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
