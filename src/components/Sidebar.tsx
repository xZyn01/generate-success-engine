import { ChevronRight, ChevronDown, Settings, SortAsc, FileText, Folder } from "lucide-react";
import { useState } from "react";
import { FolderItem } from "@/hooks/useFileSystem";

interface SidebarItemProps {
  item: FolderItem;
  level?: number;
}

const SidebarItemComponent = ({ item, level = 0 }: SidebarItemProps) => {
  const [isExpanded, setIsExpanded] = useState(level < 1);

  const icon = item.type === 'folder' ? (
    <Folder className="w-4 h-4" />
  ) : (
    <FileText className="w-4 h-4" />
  );

  return (
    <div>
      <button
        onClick={() => item.children && setIsExpanded(!isExpanded)}
        className="sidebar-item"
        style={{ paddingLeft: `${level * 12 + 12}px` }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {item.children && (
            <span className="sidebar-chevron">
              {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </span>
          )}
          <span className="sidebar-icon">{icon}</span>
          <span className="sidebar-label">{item.name}</span>
        </div>
        {item.noteCount !== undefined && item.noteCount > 0 && (
          <span className="sidebar-count">{item.noteCount}</span>
        )}
      </button>
      {item.children && isExpanded && (
        <div>
          {item.children.map((child) => (
            <SidebarItemComponent key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  onOpenVault: () => void;
  folderStructure: FolderItem[];
  vaultName?: string;
}

export const Sidebar = ({ onOpenVault, folderStructure, vaultName }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button onClick={onOpenVault} className="text-xs px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 transition-colors">
          {vaultName || "Open Vault"}
        </button>
        <div className="flex gap-2">
          <Settings className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
          <SortAsc className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
        </div>
      </div>
      <nav className="sidebar-nav">
        {folderStructure.length > 0 ? (
          folderStructure.map((item) => (
            <SidebarItemComponent key={item.id} item={item} />
          ))
        ) : (
          <div className="px-3 py-4 text-sm text-muted-foreground text-center">
            Open a vault to see folders
          </div>
        )}
      </nav>
      <div className="sidebar-footer">
        <span className="text-sm">Local Vault</span>
        <span className="text-xs text-muted-foreground">Markdown Notes</span>
      </div>
    </aside>
  );
};
