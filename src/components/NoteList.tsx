import React from 'react';
import { Note } from '../types';
import { Clock, Trash2, Star } from 'lucide-react';

interface NoteListProps {
  notes: Note[];
  activeNoteId: string | null;
  onNoteSelect: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function NoteList({ 
  notes, 
  activeNoteId, 
  onNoteSelect, 
  onDeleteNote,
  onToggleFavorite 
}: NoteListProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Notes</h2>
        <div className="space-y-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                activeNoteId === note.id
                  ? 'bg-blue-100 hover:bg-blue-200'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onNoteSelect(note.id)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-900 truncate flex-1">
                  {note.title || 'Untitled'}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(note.id);
                    }}
                    className={`${
                      note.favorite 
                        ? 'text-yellow-500' 
                        : 'text-gray-400 hover:text-yellow-500'
                    } transition-colors`}
                  >
                    <Star size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNote(note.id);
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <Clock size={12} className="mr-1" />
                {new Date(note.updatedAt).toLocaleDateString()}
              </div>
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}