import { Hash, Bold, Italic, Strikethrough, Link2, List, ListOrdered, CheckSquare, Code, Smile, Code2, Minus, Image } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const EditorPanel = () => {
  const [content, setContent] = useState(`### Migration

Specify the absolute path

- [op-sqlite Configuration](https://ospfranco.notion.site/Configuration-6b8b9564afcc4ac6b6b377fe34475090#38a5b477bbc543f2ae3c75d5b5365226)

\`\`\`typescript
import {
  IOS_LIBRARY_PATH, // Default iOS
  IOS_DOCUMENT_PATH,
  ANDROID_DATABASE_PATH, // Default Android
  ANDROID_FILES_PATH,
  ANDROID_EXTERNAL_FILES_PATH, // Android SD Card
  open,
} from '@op-engineering/op-sqlite';

const db = open({
  name: 'myDb',
  location: Platform.OS === 'ios' ? IOS_LIBRARY_PATH :
    ANDROID_DATABASE_PATH,
});
\`\`\``);

  return (
    <div className="editor-panel">
      <div className="editor-header">
        <h1 className="text-xl font-semibold mb-4">Create a new PouchDB adapter for op-sqlite</h1>
        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" className="checkbox" />
          <select className="editor-select">
            <option>Awesome SaaS : Mobile app</option>
          </select>
          <select className="editor-select">
            <option>Status</option>
          </select>
          <span className="editor-tag">React Native</span>
          <span className="editor-tag accent">Database</span>
          <button className="text-sm text-muted-foreground hover:text-foreground">Add Tags</button>
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
          className="min-h-[calc(100vh-16rem)] font-mono text-sm bg-editor-background border-0 focus-visible:ring-0 resize-none"
          placeholder="Start writing your markdown note..."
        />
      </div>
    </div>
  );
};
