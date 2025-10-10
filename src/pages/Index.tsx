import { Sidebar } from "@/components/Sidebar";
import { NotesList } from "@/components/NotesList";
import { EditorPanel } from "@/components/EditorPanel";

const Index = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <NotesList />
      <EditorPanel />
    </div>
  );
};

export default Index;
