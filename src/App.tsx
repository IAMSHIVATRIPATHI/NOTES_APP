import React, { useEffect, useState } from 'react';
import { PlusSquare } from 'lucide-react';
import { Note, MenuState, SortOption } from './types';
import { NoteList } from './components/NoteList';
import { NoteEditor } from './components/NoteEditor';
import { Menu } from './components/Menu';

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [menuState, setMenuState] = useState<MenuState>({
    isOpen: true,
    search: '',
    sortBy: 'updated' as SortOption,
    showFavoritesOnly: false,
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            createNewNote();
            break;
          case 's':
            e.preventDefault();
            // Save is automatic
            break;
          case 'f':
            e.preventDefault();
            (document.querySelector('input[type="text"]') as HTMLInputElement)?.focus();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  const activeNote = notes.find((note) => note.id === activeNoteId) || null;

  const createNewNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorite: false,
      tags: [],
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (noteChanges: Partial<Note>) => {
    if (!activeNoteId) return;

    setNotes(notes.map((note) =>
      note.id === activeNoteId
        ? {
            ...note,
            ...noteChanges,
            updatedAt: new Date().toISOString(),
          }
        : note
    ));
  };

  const deleteNote = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter((note) => note.id !== id));
      if (activeNoteId === id) {
        setActiveNoteId(notes[0]?.id || null);
      }
    }
  };

  const toggleFavorite = (id: string) => {
    setNotes(notes.map((note) =>
      note.id === id
        ? { ...note, favorite: !note.favorite }
        : note
    ));
  };

  const handleExportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'notes.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportNotes = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedNotes = JSON.parse(e.target?.result as string);
            if (Array.isArray(importedNotes)) {
              setNotes([...notes, ...importedNotes]);
            }
          } catch (error) {
            alert('Error importing notes. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const showKeyboardShortcuts = () => {
    alert(
      'Keyboard Shortcuts:\n\n' +
      'Ctrl/Cmd + N: New Note\n' +
      'Ctrl/Cmd + F: Focus Search\n' +
      'Ctrl/Cmd + S: Save (Automatic)\n'
    );
  };

  const filteredAndSortedNotes = notes
    .filter((note) => {
      if (menuState.showFavoritesOnly && !note.favorite) return false;
      if (menuState.search) {
        const search = menuState.search.toLowerCase();
        return (
          note.title.toLowerCase().includes(search) ||
          note.content.toLowerCase().includes(search) ||
          note.tags.some(tag => tag.toLowerCase().includes(search))
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (menuState.sortBy) {
        case 'updated':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'favorite':
          return Number(b.favorite) - Number(a.favorite);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Notepad</h1>
          <button
            onClick={createNewNote}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusSquare className="mr-2" size={16} />
            New Note
          </button>
        </div>
      </header>

      <Menu
        menuState={menuState}
        onMenuStateChange={(changes) => setMenuState({ ...menuState, ...changes })}
        onExportNotes={handleExportNotes}
        onImportNotes={handleImportNotes}
        onShowKeyboardShortcuts={showKeyboardShortcuts}
      />

      <main className="flex-1 flex overflow-hidden">
        <NoteList
          notes={filteredAndSortedNotes}
          activeNoteId={activeNoteId}
          onNoteSelect={setActiveNoteId}
          onDeleteNote={deleteNote}
          onToggleFavorite={toggleFavorite}
        />
        <NoteEditor note={activeNote} onUpdateNote={updateNote} />
      </main>
    </div>
  );
}

export default App