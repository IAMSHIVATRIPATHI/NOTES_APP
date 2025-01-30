import React from 'react';
import { 
  Search, 
  Star, 
  Clock, 
  Type, 
  Download,
  Upload,
  Keyboard
} from 'lucide-react';
import { MenuState, SortOption } from '../types';

interface MenuProps {
  menuState: MenuState;
  onMenuStateChange: (changes: Partial<MenuState>) => void;
  onExportNotes: () => void;
  onImportNotes: () => void;
  onShowKeyboardShortcuts: () => void;
}

export function Menu({ 
  menuState, 
  onMenuStateChange,
  onExportNotes,
  onImportNotes,
  onShowKeyboardShortcuts
}: MenuProps) {
  const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
    { value: 'updated', label: 'Last Updated', icon: <Clock size={16} /> },
    { value: 'created', label: 'Created Date', icon: <Clock size={16} /> },
    { value: 'title', label: 'Title', icon: <Type size={16} /> },
    { value: 'favorite', label: 'Favorites', icon: <Star size={16} /> },
  ];

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search notes..."
            value={menuState.search}
            onChange={(e) => onMenuStateChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={menuState.sortBy}
            onChange={(e) => onMenuStateChange({ sortBy: e.target.value as SortOption })}
            className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => onMenuStateChange({ showFavoritesOnly: !menuState.showFavoritesOnly })}
            className={`p-2 rounded-md ${
              menuState.showFavoritesOnly 
                ? 'bg-yellow-100 text-yellow-600' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Star size={16} />
          </button>

          <div className="border-l border-gray-300 h-6 mx-2" />

          <button
            onClick={onExportNotes}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
            title="Export Notes"
          >
            <Download size={16} />
          </button>

          <button
            onClick={onImportNotes}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
            title="Import Notes"
          >
            <Upload size={16} />
          </button>

          <button
            onClick={onShowKeyboardShortcuts}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
            title="Keyboard Shortcuts"
          >
            <Keyboard size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}