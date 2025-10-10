import { Search, Edit3, Plus, RefreshCw } from "lucide-react";
import { Input } from "./ui/input";
import { Note } from "@/hooks/useFileSystem";
import { Button } from "./ui/button";
import { useState } from "react";

interface NotesListProps {
  notes: Note[];
  isLoading: boolean;
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onCreateNote: (fileName: string) => void;
  onRefresh: () => void;
}

export const NotesList = ({ notes, isLoading, selectedNote, onSelectNote, onCreateNote, onRefresh }: NotesListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter(note => 
    note.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNote = () => {
    const fileName = `note-${Date.now()}.md`;
    onCreateNote(fileName);
  };

  const formatTimestamp = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  const getPreview = (content: string) => {
    return content.split('\n').find(line => line.trim() && !line.startsWith('#')) || '';
  };

  return (
    <div className="notes-list">
      <div className="notes-header">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All Notes ({notes.length})</h2>
          <div className="flex gap-2">
            <Button onClick={onRefresh} variant="ghost" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button onClick={handleCreateNote} variant="ghost" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search notes..." 
            className="notes-search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="notes-items">
        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground">Loading notes...</div>
        ) : filteredNotes.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            {notes.length === 0 ? 'No notes found. Open a vault to get started.' : 'No matching notes.'}
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div 
              key={note.name} 
              className={`note-item cursor-pointer ${selectedNote?.name === note.name ? 'bg-primary/10' : ''}`}
              onClick={() => onSelectNote(note)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="note-title">{note.name.replace('.md', '')}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="note-timestamp">{formatTimestamp(note.lastModified)}</span>
                  </div>
                  <p className="note-preview">{getPreview(note.content).substring(0, 80)}...</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
