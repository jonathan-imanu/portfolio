import type { ProcessedNote, NoteMetadata, NotesIndex } from "../types/notes";

// Lazy load the notes index to reduce initial bundle size
let indexCache: NotesIndex | null = null;
let indexPromise: Promise<NotesIndex> | null = null;

async function loadNotesIndex(): Promise<NotesIndex> {
  if (indexCache) {
    return indexCache;
  }
  if (indexPromise) {
    return indexPromise;
  }
  indexPromise = import("../data/notes-index.json").then((module) => {
    indexCache = module.default as NotesIndex;
    return indexCache;
  });
  return indexPromise;
}

// Lazy load individual notes
export async function getNote(id: string): Promise<ProcessedNote | undefined> {
  try {
    const module = await import(`../data/notes/${id}.json`);
    return module.default as ProcessedNote;
  } catch (error) {
    console.error(`Note ${id} not found:`, error);
    return undefined;
  }
}

export async function getAllNotesMetadata(): Promise<NoteMetadata[]> {
  const index = await loadNotesIndex();
  return Object.values(index.notes);
}

export async function getNotesIndex(): Promise<NotesIndex> {
  return loadNotesIndex();
}

// Synchronous version for backwards compatibility (loads immediately)
// Use this only if you need synchronous access and index is already loaded
export function getAllNotesMetadataSync(): NoteMetadata[] {
  if (!indexCache) {
    throw new Error("Notes index not loaded. Use getNotesIndex() instead.");
  }
  return Object.values(indexCache.notes);
}

export function getNotesIndexSync(): NotesIndex {
  if (!indexCache) {
    throw new Error("Notes index not loaded. Use getNotesIndex() instead.");
  }
  return indexCache;
}

// Tree structure types
export interface TreeNode {
  name: string;
  fullPath: string;
  children: Map<string, TreeNode>;
  note?: NoteMetadata;
  isLeaf: boolean;
}

// Build a tree structure from notes
export function buildNotesTree(notes: NoteMetadata[]): TreeNode {
  const root: TreeNode = {
    name: "",
    fullPath: "",
    children: new Map(),
    isLeaf: false,
  };

  for (const note of notes) {
    const parts = note.path.split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      const fullPath = parts.slice(0, i + 1).join("/");

      if (!current.children.has(part)) {
        current.children.set(part, {
          name: part,
          fullPath,
          children: new Map(),
          isLeaf: isLast,
          note: isLast ? note : undefined,
        });
      }

      current = current.children.get(part)!;
      if (isLast) {
        current.note = note;
        current.isLeaf = true;
      }
    }
  }

  return root;
}

// Convert tree to sorted array for rendering
export function treeToArray(node: TreeNode): TreeNode[] {
  const result: TreeNode[] = [];
  const sorted = Array.from(node.children.values()).sort((a, b) => {
    // Folders before files
    if (a.isLeaf !== b.isLeaf) {
      return a.isLeaf ? 1 : -1;
    }
    return a.name.localeCompare(b.name);
  });

  for (const child of sorted) {
    result.push(child);
    if (!child.isLeaf && child.children.size > 0) {
      result.push(...treeToArray(child));
    }
  }

  return result;
}

// Search notes by title or path
export function searchNotes(
  notes: NoteMetadata[],
  query: string
): NoteMetadata[] {
  if (!query.trim()) {
    return notes;
  }

  const lowerQuery = query.toLowerCase();
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(lowerQuery) ||
      note.path.toLowerCase().includes(lowerQuery)
  );
}

// Get breadcrumbs from a note path
export function getBreadcrumbs(
  path: string
): Array<{ name: string; path: string }> {
  const parts = path.split("/");
  const breadcrumbs: Array<{ name: string; path: string }> = [];

  for (let i = 0; i < parts.length; i++) {
    const pathSegment = parts.slice(0, i + 1).join("/");
    breadcrumbs.push({
      name: parts[i],
      path: pathSegment,
    });
  }

  return breadcrumbs;
}
