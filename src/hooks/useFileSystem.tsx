import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export interface Note {
  name: string;
  handle: FileSystemFileHandle;
  content: string;
  lastModified: number;
}

export const useFileSystem = () => {
  const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const selectDirectory = useCallback(async () => {
    try {
      // Check if API is supported
      if (!('showDirectoryPicker' in window)) {
        toast({
          title: "Not Supported",
          description: "Your browser doesn't support local file access. Please use Chrome, Edge, or another Chromium-based browser.",
          variant: "destructive",
        });
        return;
      }

      const handle = await (window as any).showDirectoryPicker({
        mode: 'readwrite',
      });
      
      setDirectoryHandle(handle);
      await loadNotes(handle);
      
      toast({
        title: "Vault Connected",
        description: `Connected to ${handle.name}`,
      });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error selecting directory:', error);
        toast({
          title: "Error",
          description: "Failed to select directory",
          variant: "destructive",
        });
      }
    }
  }, []);

  const loadNotes = useCallback(async (dirHandle: FileSystemDirectoryHandle) => {
    setIsLoading(true);
    const loadedNotes: Note[] = [];

    try {
      for await (const entry of (dirHandle as any).values()) {
        if (entry.kind === 'file' && entry.name.endsWith('.md')) {
          const file = await entry.getFile();
          const content = await file.text();
          
          loadedNotes.push({
            name: entry.name,
            handle: entry,
            content,
            lastModified: file.lastModified,
          });
        }
      }

      // Sort by last modified
      loadedNotes.sort((a, b) => b.lastModified - a.lastModified);
      setNotes(loadedNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
      toast({
        title: "Error",
        description: "Failed to load notes from directory",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveNote = useCallback(async (handle: FileSystemFileHandle, content: string) => {
    try {
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();

      // Update the note in state
      setNotes(prev => prev.map(note => 
        note.handle === handle 
          ? { ...note, content, lastModified: Date.now() }
          : note
      ));

      toast({
        title: "Saved",
        description: "Note saved successfully",
      });
    } catch (error) {
      console.error('Error saving note:', error);
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive",
      });
    }
  }, []);

  const createNote = useCallback(async (fileName: string) => {
    if (!directoryHandle) return;

    try {
      const handle = await directoryHandle.getFileHandle(fileName, { create: true });
      const writable = await handle.createWritable();
      await writable.write('# New Note\n\n');
      await writable.close();

      const file = await handle.getFile();
      const content = await file.text();

      const newNote: Note = {
        name: fileName,
        handle,
        content,
        lastModified: Date.now(),
      };

      setNotes(prev => [newNote, ...prev]);

      toast({
        title: "Created",
        description: `${fileName} created successfully`,
      });

      return newNote;
    } catch (error) {
      console.error('Error creating note:', error);
      toast({
        title: "Error",
        description: "Failed to create note",
        variant: "destructive",
      });
    }
  }, [directoryHandle]);

  const refreshNotes = useCallback(async () => {
    if (directoryHandle) {
      await loadNotes(directoryHandle);
    }
  }, [directoryHandle, loadNotes]);

  return {
    directoryHandle,
    notes,
    isLoading,
    selectDirectory,
    saveNote,
    createNote,
    refreshNotes,
  };
};
