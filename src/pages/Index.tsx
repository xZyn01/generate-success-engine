import { Sidebar } from "@/components/Sidebar";
import { NotesList } from "@/components/NotesList";
import { EditorPanel } from "@/components/EditorPanel";
import { useFileSystem, Note } from "@/hooks/useFileSystem";
import { useState } from "react";

const Index = () => {
  const fileSystem = useFileSystem();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <div className="app-container">
      <Sidebar onOpenVault={fileSystem.selectDirectory} />
      <NotesList 
        notes={fileSystem.notes}
        isLoading={fileSystem.isLoading}
        selectedNote={selectedNote}
        onSelectNote={setSelectedNote}
        onCreateNote={fileSystem.createNote}
        onRefresh={fileSystem.refreshNotes}
      />
      <EditorPanel 
        note={selectedNote}
        onSave={(content) => selectedNote && fileSystem.saveNote(selectedNote.handle, content)}
      />
    </div>
  );
};

export default Index;
