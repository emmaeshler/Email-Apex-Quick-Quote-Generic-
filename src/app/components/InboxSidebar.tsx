'use client';

import { Inbox, Send, Trash2, Archive, AlertOctagon, Mail, ChevronRight, ChevronDown, ChevronsLeft, ChevronsRight, CheckCircle, Pencil, Flag, Rss, Cloud, Users, MessageSquare } from 'lucide-react';
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
      className={`w-full flex items-center gap-1.5 px-3 py-1 text-left transition-colors relative ${
        isActive
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-muted/50 text-foreground'
      } ${indent ? 'pl-8' : ''}`}
    >
      {isHinted && <DemoDot className="top-1 right-2" />}
      <Icon size={15} className={isActive ? 'text-primary' : 'text-foreground/70'} />
      <span className="flex-1 text-size-sm font-normal truncate">{label}</span>
      {count !== undefined && count > 0 && (
        <span className={`text-size-xs font-normal ${isActive ? 'text-primary' : 'text-foreground/70'}`}>
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
      className="w-full flex items-center gap-1 px-3 py-1 text-left hover:bg-muted/30 transition-colors"
    >
      {isExpanded ? (
        <ChevronDown size={13} className="text-foreground/70" />
      ) : (
        <ChevronRight size={13} className="text-foreground/70" />
      )}
      <span className="text-size-sm font-semibold text-foreground truncate">{label}</span>
    </button>
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
  const [morganExpanded, setMorganExpanded] = useState(true);
  const [quotesExpanded, setQuotesExpanded] = useState(true);
  const [reviewExpanded, setReviewExpanded] = useState(false);
  const [favoritesExpanded, setFavoritesExpanded] = useState(true);
  const [savedSearchExpanded, setSavedSearchExpanded] = useState(false);

  if (collapsed) {
    return (
      <div className="w-12 bg-background flex flex-col overflow-y-auto transition-all duration-200">
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

  // Map folder IDs to the new structure
  const getFolderId = (type: string) => {
    const folder = folders.find(f => f.id === type);
    return folder?.id || type;
  };

  const csrId = getFolderId('csr');
  const eisId = getFolderId('eis');
  const autoQuotedId = getFolderId('auto-quoted');
  const reviewId = getFolderId('review');

  const isCsrActive = activeFolderId === csrId;
  const isEisActive = activeFolderId === eisId;
  const isAutoQuotedActive = activeFolderId === autoQuotedId;
  const isReviewActive = activeFolderId === reviewId;

  const csrFolder = folders.find(f => f.id === 'csr');
  const eisFolder = folders.find(f => f.id === 'eis');
  const autoQuotedFolder = folders.find(f => f.id === 'auto-quoted');
  const reviewFolder = folders.find(f => f.id === 'review');

  const isCsrHinted = hintTarget === `folder:${csrId}`;
  const isEisHinted = hintTarget === `folder:${eisId}`;
  const isAutoQuotedHinted = hintTarget === `folder:${autoQuotedId}`;
  const isReviewHinted = hintTarget === `folder:${reviewId}`;

  return (
    <div className="w-56 bg-background flex flex-col overflow-y-auto transition-all duration-200">
      <div className="flex-1 overflow-y-auto">
        {/* Favorites Section */}
        <div className="pt-2">
          <div className="flex items-center">
            <div className="flex-1 min-w-0">
              <SectionHeader
                label="Favorites"
                isExpanded={favoritesExpanded}
                onToggle={() => setFavoritesExpanded(!favoritesExpanded)}
              />
            </div>
            <button
              onClick={onToggleCollapse}
              className="p-1 mr-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
              title="Collapse folder pane"
            >
              <ChevronsLeft size={16} />
            </button>
          </div>
          {favoritesExpanded && (
            <div>
              {/* Account section nested under Favorites */}
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
                    count={794}
                    isActive={isCsrActive}
                    onClick={() => onFolderSelect(csrId)}
                    indent
                    isHinted={isCsrHinted}
                  />
                  <FolderItem
                    icon={Pencil}
                    label="Drafts"
                    count={47}
                    isActive={false}
                    onClick={() => {}}
                    indent
                  />
                  <FolderItem
                    icon={Send}
                    label="Sent"
                    isActive={false}
                    onClick={() => {}}
                    indent
                  />
                  <FolderItem
                    icon={Trash2}
                    label="Deleted Ite..."
                    count={5266}
                    isActive={false}
                    onClick={() => {}}
                    indent
                  />
                  <FolderItem
                    icon={Archive}
                    label="Archive"
                    count={226}
                    isActive={false}
                    onClick={() => {}}
                    indent
                  />
                  <FolderItem
                    icon={MessageSquare}
                    label="Conversation Hist..."
                    isActive={false}
                    onClick={() => {}}
                    indent
                  />
                  <FolderItem
                    icon={AlertOctagon}
                    label="Junk Email"
                    isActive={false}
                    onClick={() => {}}
                    indent
                  />
                  <FolderItem
                    icon={Flag}
                    label="Reported"
                    count={1}
                    isActive={false}
                    onClick={() => {}}
                    indent
                  />
                  <FolderItem
                    icon={Rss}
                    label="RSS Feeds"
                    isActive={false}
                    onClick={() => {}}
                    indent
                  />
                  <FolderItem
                    icon={Cloud}
                    label="Online Archive"
                    isActive={false}
                    onClick={() => {}}
                    indent
                  />
                  <FolderItem
                    icon={Users}
                    label="Groups"
                    isActive={false}
                    onClick={() => {}}
                    indent
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Apex Quote Inbox Section */}
        <div className="pt-2">
          <SectionHeader
            label="Apex Quote Inbox"
            isExpanded={quotesExpanded}
            onToggle={() => setQuotesExpanded(!quotesExpanded)}
          />
          {quotesExpanded && (
            <div>
              <FolderItem
                icon={Inbox}
                label="Inbox"
                count={eisFolder?.count ?? 0}
                isActive={isEisActive}
                onClick={() => onFolderSelect(eisId)}
                isHinted={isEisHinted}
              />
              <FolderItem
                icon={CheckCircle}
                label="Auto Quoted"
                count={autoQuotedFolder?.count ?? 0}
                isActive={isAutoQuotedActive}
                onClick={() => onFolderSelect(autoQuotedId)}
                indent
                isHinted={isAutoQuotedHinted}
              />
            </div>
          )}
        </div>

        {/* Flagged for Review Section */}
        <div className="pt-2">
          <SectionHeader
            label="Flagged for Review"
            isExpanded={reviewExpanded}
            onToggle={() => setReviewExpanded(!reviewExpanded)}
          />
          {reviewExpanded && (
            <div>
              <FolderItem
                icon={Inbox}
                label="Inbox"
                count={reviewFolder?.count ?? 0}
                isActive={isReviewActive}
                onClick={() => onFolderSelect(reviewId)}
                isHinted={isReviewHinted}
              />
            </div>
          )}
        </div>

        {/* Saved Searches Section */}
        <div className="pt-2 pb-2">
          <SectionHeader
            label="Saved Searches"
            isExpanded={savedSearchExpanded}
            onToggle={() => setSavedSearchExpanded(!savedSearchExpanded)}
          />
        </div>
      </div>
    </div>
  );
}
