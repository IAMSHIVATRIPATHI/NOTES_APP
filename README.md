# Notepad Application

This project is a note-taking application built with React, TypeScript, and Vite. It features a user-friendly interface for creating, editing, and managing notes.

## Features

- **Note Management**: Create, update, delete, and search notes.
- **Tagging**: Add and remove tags to categorize notes.
- **Favorites**: Mark notes as favorites for quick access.
- **Sorting and Filtering**: Sort notes by updated date, creation date, title, or favorites, and filter notes based on search queries.
- **Keyboard Shortcuts**: Use keyboard shortcuts for quick actions like creating a new note or focusing on the search bar.
- **Data Persistence**: Save notes to local storage and import/export notes as JSON files.
- **Responsive Design**: Built with Tailwind CSS for a responsive and modern UI.


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/notepad-app.git
    cd notepad-app
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for linting errors.
- `npm run preview`: Preview the production build.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript.
- **Vite**: Next-generation frontend tooling.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React**: Icon library for React.

## Components

- [`App`](src/App.tsx ): Main application component.
- [`Menu`](src/components/Menu.tsx ): Menu component for search, sorting, and other actions.
- [`NoteEditor`](src/components/NoteEditor.tsx ): Component for editing notes.
- [`NoteList`](src/components/NoteList.tsx ): Component for displaying the list of notes.

## Types

- [`Note`](src/types.ts ): Interface for note objects.
- [`SortOption`](src/types.ts ): Type for sorting options.
- [`MenuState`](src/types.ts ): Interface for menu state.

## Configuration

- [`vite.config.ts`](vite.config.ts ): Vite configuration file.
- [`tailwind.config.js`](tailwind.config.js ): Tailwind CSS configuration file.
- [`tsconfig.json`](tsconfig.json ): TypeScript configuration file.
- [`eslint.config.js`](eslint.config.js ): ESLint configuration file.


