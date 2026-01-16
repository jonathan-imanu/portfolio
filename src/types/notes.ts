export interface ProcessedNote {
  id: string;
  path: string;
  title: string;
  content: string;
  metadata: {
    date: string;
    updated: string;
  };
  images: string[];
  links: string[];
}

export interface NoteMetadata {
  id: string;
  path: string;
  title: string;
  metadata: {
    date: string;
    updated: string;
  };
}

export interface NotesIndex {
  version: string;
  lastSync: string;
  notes: {
    [key: string]: NoteMetadata;
  };
}
