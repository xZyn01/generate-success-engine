import { Search, Edit3, CheckCircle2, Circle, Flag } from "lucide-react";
import { Input } from "./ui/input";

interface Note {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  tags?: string[];
  progress?: { current: number; total: number };
  isPinned?: boolean;
  icon?: React.ReactNode;
}

const notes: Note[] = [
  {
    id: "1",
    title: "Record a webpage with background transparency using Puppeteer",
    preview: "[Support for transparent video background. (Differ...",
    timestamp: "31 minutes",
  },
  {
    id: "2",
    title: "Migrate ESLint YAML config to flat mjs config",
    preview: "Working on updating this repo: [GitHub - inkdropa...",
    timestamp: "31 minutes",
  },
  {
    id: "3",
    title: "Fluid animations with threejs",
    preview: "[Rain & Water Effect Experiments | Codrops]( http...",
    timestamp: "31 minutes",
  },
  {
    id: "4",
    title: "Create a new PouchDB adapter for op-sqlite",
    preview: "old repo: https://github.com/craftzdog/pouchdb-a...",
    timestamp: "32 minutes",
    tags: ["React Native", "Database"],
    progress: { current: 2, total: 2 },
  },
  {
    id: "5",
    title: "Bump up deps of the web app",
    preview: "Bump up stripe From 14 to 17.4.0 https://www.npm...",
    timestamp: "33 minutes",
    progress: { current: 5, total: 7 },
  },
  {
    id: "6",
    title: "Feature idea",
    preview: "[Editor hold to select interests with gesture navig...",
    timestamp: "36 minutes",
    progress: { current: 2, total: 5 },
    icon: <Circle className="w-4 h-4 text-primary" />,
  },
  {
    id: "7",
    title: "Mermaid diagrams",
    preview: "graph LR A --- B B-->C[fa:fa-ban forbidden] B-->...",
    timestamp: "11 days",
  },
  {
    id: "8",
    title: "Fix a bug",
    preview: "",
    timestamp: "",
    icon: <Flag className="w-4 h-4 text-accent" />,
  },
];

export const NotesList = () => {
  return (
    <div className="notes-list">
      <div className="notes-header">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All Notes</h2>
          <Edit3 className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search" className="notes-search" />
        </div>
      </div>
      <div className="notes-items">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="flex items-start gap-3">
              {note.icon && <div className="mt-1">{note.icon}</div>}
              <div className="flex-1 min-w-0">
                <h3 className="note-title">{note.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="note-timestamp">{note.timestamp}</span>
                  {note.progress && (
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-muted-foreground">
                        {note.progress.current} of {note.progress.total}
                      </span>
                    </div>
                  )}
                  {note.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="note-tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {note.preview && <p className="note-preview">{note.preview}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
