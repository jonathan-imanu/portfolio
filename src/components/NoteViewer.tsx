import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { getNote } from "../utils/notes";
import type { ProcessedNote } from "../types/notes";
import { NoteSkeleton } from "./NoteSkeleton";
import { markdownComponents } from "./MarkdownComponents";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { Breadcrumbs } from "./Breadcrumbs";

export function NoteViewer() {
  const { noteId } = useParams<{ noteId: string }>();
  const [note, setNote] = useState<ProcessedNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const breadcrumbLinks = useBreadcrumbs(note?.path);

  useEffect(() => {
    if (!noteId) {
      setError("No note ID provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getNote(noteId)
      .then((loadedNote) => {
        if (loadedNote) {
          setNote(loadedNote);
        } else {
          setError("Note not found");
        }
      })
      .catch((err) => {
        setError("Failed to load note");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [noteId]);

  if (loading) {
    return (
      <div className="mt-6 body-text text-gray-500">
        <NoteSkeleton />
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="mt-6 body-text text-red-500">
        {error || "Note not found"}
      </div>
    );
  }

  return (
    <article className="mt-6 space-y-4">
      <Link
        to="/"
        className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-flex items-center gap-2">
        <FaChevronLeft className="w-4 h-4" /> Back to Home
      </Link>

      <Breadcrumbs links={breadcrumbLinks} />

      <h1 className="text-2xl font-bold text-black">{note.title}</h1>

      <div className="flex gap-2 text-xs text-gray-500">
        <span>
          Last Updated {new Date(note.metadata.updated).toLocaleDateString()}
        </span>
      </div>

      <div className="body-text">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={markdownComponents}>
          {note.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
