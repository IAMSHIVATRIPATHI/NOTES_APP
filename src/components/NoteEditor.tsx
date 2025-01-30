import React, { useState } from 'react';
import { Note } from '../types';
import { Tag } from 'lucide-react';

interface NoteEditorProps {
  note: Note | null;
  onUpdateNote: (note: Partial<Note>) => void;
}

export function NoteEditor({ note, onUpdateNote }: NoteEditorProps) {
  const [newTag, setNewTag] = useState('');

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a note or create a new one</p>
      </div>
    );
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      if (!note.tags.includes(newTag.trim())) {
        onUpdateNote({ tags: [...note.tags, newTag.trim()] });
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onUpdateNote({
      tags: note.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <input
        type="text"
        value={note.title}
        onChange={(e) => onUpdateNote({ title: e.target.value })}
        placeholder="Note title"
        className="px-4 py-3 text-xl font-semibold focus:outline-none"
      />
      
      <div className="px-4 py-2 border-t border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Tag size={16} className="text-gray-400" />
          <div className="flex flex-wrap gap-2 items-center">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add tag..."
              className="border-none bg-transparent focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>

      <textarea
        value={note.content}
        onChange={(e) => onUpdateNote({ content: e.target.value })}
        placeholder="Start writing..."
        className="flex-1 p-4 text-gray-800 resize-none focus:outline-none"
      />
    </div>
  );
}