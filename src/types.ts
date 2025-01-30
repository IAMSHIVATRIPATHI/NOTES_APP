export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  favorite: boolean;
  tags: string[];
}

export type SortOption = 'updated' | 'created' | 'title' | 'favorite';

export interface MenuState {
  isOpen: boolean;
  search: string;
  sortBy: SortOption;
  showFavoritesOnly: boolean;
}