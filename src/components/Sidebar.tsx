import { ChevronRight, ChevronDown, Settings, SortAsc, FileText, Pin, BookOpen, Trash2, Activity } from "lucide-react";
import { useState } from "react";

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
  children?: SidebarItem[];
}

const sidebarData: SidebarItem[] = [
  { id: "all-notes", label: "All Notes", icon: <FileText className="w-4 h-4" />, count: 100 },
  { id: "pinned", label: "Pinned Notes", icon: <Pin className="w-4 h-4" />, count: 1 },
  {
    id: "notebooks",
    label: "Notebooks",
    icon: <BookOpen className="w-4 h-4" />,
    children: [
      {
        id: "awesome-saas",
        label: "Awesome SaaS",
        count: 7,
        children: [
          { id: "desktop-app", label: "Desktop app", count: 9 },
          { id: "ideas", label: "Ideas", count: 3 },
          { id: "mobile-app", label: "Mobile app", count: 8 },
          { id: "operations", label: "Operations", count: 8 },
          { id: "website", label: "Website", count: 4 },
        ],
      },
      { id: "empty", label: "Empty", count: 0 },
      { id: "hobby", label: "Hobby", count: 4 },
      { id: "huga", label: "huga", count: 2 },
      { id: "inbox", label: "Inbox", count: 6 },
      { id: "learn", label: "Learn", count: 24 },
      {
        id: "publishing",
        label: "Publishing",
        count: 5,
        children: [
          { id: "blog", label: "Blog", count: 2 },
          { id: "tips", label: "Tips", count: 18 },
        ],
      },
    ],
  },
  { id: "trash", label: "Trash", icon: <Trash2 className="w-4 h-4" /> },
  {
    id: "status",
    label: "Status",
    icon: <Activity className="w-4 h-4" />,
    children: [
      { id: "active", label: "Active", count: 10 },
      { id: "on-hold", label: "On Hold", count: 6 },
    ],
  },
];

interface SidebarItemProps {
  item: SidebarItem;
  level?: number;
}

const SidebarItemComponent = ({ item, level = 0 }: SidebarItemProps) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);

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
          {item.icon && <span className="sidebar-icon">{item.icon}</span>}
          <span className="sidebar-label">{item.label}</span>
        </div>
        {item.count !== undefined && <span className="sidebar-count">{item.count}</span>}
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
}

export const Sidebar = ({ onOpenVault }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button onClick={onOpenVault} className="text-xs px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 transition-colors">
          Open Vault
        </button>
        <div className="flex gap-2">
          <Settings className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
          <SortAsc className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
        </div>
      </div>
      <nav className="sidebar-nav">
        {sidebarData.map((item) => (
          <SidebarItemComponent key={item.id} item={item} />
        ))}
      </nav>
      <div className="sidebar-footer">
        <span className="text-sm">Takuya Matsuyama</span>
        <span className="text-xs text-muted-foreground">Synced at 11:32:06</span>
      </div>
    </aside>
  );
};
