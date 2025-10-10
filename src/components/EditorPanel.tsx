import { Hash, Bold, Italic, Strikethrough, Link2, List, ListOrdered, CheckSquare, Code, Smile, Code2, Minus, Image, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Note } from "@/hooks/useFileSystem";
import { Button } from "./ui/button";

interface EditorPanelProps {
  note: Note | null;
  onSave: (content: string) => void;
}

export const EditorPanel = ({ note, onSave }: EditorPanelProps) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    if (note) {
      onSave(content);
    }
  };

  if (!note) {
    return (
      <div className="editor-panel flex items-center justify-center">
        <p className="text-muted-foreground">Select a note to start editing or create a new one</p>
      </div>
    );
  }

  return (
    <div className="editor-panel">
      <div className="editor-header">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">{note.name.replace('.md', '')}</h1>
          <Button onClick={handleSave} size="sm" className="gap-2">
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
        <div className="editor-toolbar">
          <Hash className="w-4 h-4" />
          <Bold className="w-4 h-4" />
          <Italic className="w-4 h-4" />
          <Strikethrough className="w-4 h-4" />
          <Link2 className="w-4 h-4" />
          <List className="w-4 h-4" />
          <ListOrdered className="w-4 h-4" />
          <CheckSquare className="w-4 h-4" />
          <Code className="w-4 h-4" />
          <Smile className="w-4 h-4" />
          <Code2 className="w-4 h-4" />
          <Minus className="w-4 h-4" />
          <Image className="w-4 h-4" />
        </div>
      </div>
      <div className="editor-content">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[calc(100vh-14rem)] font-mono text-sm bg-editor-background border-0 focus-visible:ring-0 resize-none"
          placeholder="Start writing your markdown note..."
        />
      </div>
    </div>
  );
};
