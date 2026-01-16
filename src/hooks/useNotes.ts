import { useState, useEffect } from "react";
import { getAllNotesMetadata } from "../utils/notes";
import type { NoteMetadata } from "../types/notes";

export function useNotes() {
  const [notes, setNotes] = useState<NoteMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNotesMetadata()
      .then((loadedNotes) => {
        setNotes(loadedNotes);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return { notes, loading };
}
