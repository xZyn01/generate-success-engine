import { ChevronRight, ChevronDown, Settings, SortAsc, FileText, Folder } from "lucide-react";
import { useState } from "react";
import { FolderItem } from "@/hooks/useFileSystem";

interface SidebarItemProps {
  item: FolderItem;
  level?: number;
  onSelectFolder: (folderPath: string | null) => void;
  selectedFolder: string | null;
}

const SidebarItemComponent = ({ item, level = 0, onSelectFolder, selectedFolder }: SidebarItemProps) => {
  const [isExpanded, setIsExpanded] = useState(level < 1);
  const isSelected = selectedFolder === item.path;

  const handleClick = () => {
    if (item.children) {
      setIsExpanded(!isExpanded);
    }
    onSelectFolder(item.path);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`sidebar-item ${isSelected ? 'bg-primary/10' : ''}`}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {item.children && (
            <span className="sidebar-chevron">
              {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </span>
          )}
          <span className="sidebar-icon">
            <Folder className="w-4 h-4" />
          </span>
          <span className="sidebar-label">{item.name}</span>
        </div>
        {item.noteCount !== undefined && item.noteCount > 0 && (
          <span className="sidebar-count">{item.noteCount}</span>
        )}
      </button>
      {item.children && isExpanded && (
        <div>
          {item.children.map((child) => (
            <SidebarItemComponent 
              key={child.id} 
              item={child} 
              level={level + 1}
              onSelectFolder={onSelectFolder}
              selectedFolder={selectedFolder}
            />
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
  onSelectFolder: (folderPath: string | null) => void;
  selectedFolder: string | null;
  totalNotes: number;
}

export const Sidebar = ({ onOpenVault, folderStructure, vaultName, onSelectFolder, selectedFolder, totalNotes }: SidebarProps) => {
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
        <button
          onClick={() => onSelectFolder(null)}
          className={`sidebar-item ${selectedFolder === null ? 'bg-primary/10' : ''}`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="sidebar-icon">
              <FileText className="w-4 h-4" />
            </span>
            <span className="sidebar-label">All Notes</span>
          </div>
          <span className="sidebar-count">{totalNotes}</span>
        </button>
        
        {folderStructure.length > 0 ? (
          folderStructure.map((item) => (
            <SidebarItemComponent 
              key={item.id} 
              item={item}
              onSelectFolder={onSelectFolder}
              selectedFolder={selectedFolder}
            />
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
