import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export interface Note {
  name: string;
  handle: FileSystemFileHandle;
  content: string;
  lastModified: number;
  path: string;
}

export interface FolderItem {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FolderItem[];
  noteCount?: number;
}

export const useFileSystem = () => {
  const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [folderStructure, setFolderStructure] = useState<FolderItem[]>([]);
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

  const loadFolderStructure = useCallback(async (
    dirHandle: FileSystemDirectoryHandle,
    path: string = ''
  ): Promise<FolderItem[]> => {
    const items: FolderItem[] = [];

    for await (const entry of (dirHandle as any).values()) {
      const itemPath = path ? `${path}/${entry.name}` : entry.name;
      
      if (entry.kind === 'directory') {
        const subDirHandle = await dirHandle.getDirectoryHandle(entry.name);
        const children = await loadFolderStructure(subDirHandle, itemPath);
        const noteCount = countNotesInFolder(children);
        
        items.push({
          id: itemPath,
          name: entry.name,
          path: itemPath,
          type: 'folder',
          children,
          noteCount,
        });
      }
    }

    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const countNotesInFolder = (items: FolderItem[]): number => {
    return items.reduce((count, item) => {
      if (item.type === 'folder' && item.children) {
        return count + (item.noteCount || 0);
      }
      return count;
    }, 0);
  };

  const loadNotesRecursively = async (
    dirHandle: FileSystemDirectoryHandle,
    path: string = '',
    loadedNotes: Note[] = []
  ): Promise<Note[]> => {
    for await (const entry of (dirHandle as any).values()) {
      const itemPath = path ? `${path}/${entry.name}` : entry.name;
      
      if (entry.kind === 'file' && entry.name.endsWith('.md')) {
        const file = await entry.getFile();
        const content = await file.text();
        
        loadedNotes.push({
          name: entry.name,
          handle: entry,
          content,
          lastModified: file.lastModified,
          path: itemPath,
        });
      } else if (entry.kind === 'directory') {
        const subDirHandle = await dirHandle.getDirectoryHandle(entry.name);
        await loadNotesRecursively(subDirHandle, itemPath, loadedNotes);
      }
    }
    
    return loadedNotes;
  };

  const loadNotes = useCallback(async (dirHandle: FileSystemDirectoryHandle) => {
    setIsLoading(true);
    
    try {
      const loadedNotes = await loadNotesRecursively(dirHandle);
      
      // Sort by last modified
      loadedNotes.sort((a, b) => b.lastModified - a.lastModified);
      setNotes(loadedNotes);

      // Load folder structure
      const structure = await loadFolderStructure(dirHandle);
      
      // Count notes for root
      const totalNotes = loadedNotes.length;
      structure.forEach(item => {
        if (item.type === 'folder') {
          const folderNotes = loadedNotes.filter(note => 
            note.path.startsWith(item.path + '/')
          ).length;
          item.noteCount = folderNotes;
        }
      });
      
      setFolderStructure(structure);
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
  }, [loadFolderStructure]);

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
        path: fileName,
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
    folderStructure,
    isLoading,
    selectDirectory,
    saveNote,
    createNote,
    refreshNotes,
  };
};
