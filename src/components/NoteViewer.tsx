import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { getNote } from "../utils/notes";
import { katexOptions, normalizeDisplayMathDelimiters } from "../utils/markdown";
import type { ProcessedNote } from "../types/notes";
import { NoteSkeleton } from "./NoteSkeleton";
import { markdownComponents } from "./MarkdownComponents";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { Breadcrumbs } from "./Breadcrumbs";
import { NoteTableOfContents } from "./NoteTableOfContents";
import type { NoteHeading } from "./NoteTableOfContents";

export function NoteViewer() {
  const { noteId } = useParams<{ noteId: string }>();
  const [note, setNote] = useState<ProcessedNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const breadcrumbLinks = useBreadcrumbs(note?.path);
  const [headings, setHeadings] = useState<NoteHeading[]>([]);
  const collectHeadings = useCallback((content: HTMLDivElement | null) => {
    if (!content) return;

    const usedIds = new Set<string>();
    const entries = Array.from(
      content.querySelectorAll("h1, h2, h3, h4, h5, h6")
    ).map((heading) => {
      const label = heading.cloneNode(true) as HTMLElement;
      label.querySelectorAll("a").forEach((link) => {
        link.replaceWith(...Array.from(link.childNodes));
      });
      label
        .querySelectorAll("[id]")
        .forEach((node) => node.removeAttribute("id"));
      const html = label.innerHTML;
      label
        .querySelectorAll(".katex-html, annotation")
        .forEach((node) => node.remove());
      const text =
        label.textContent?.replace(/\s+/g, " ").trim() || "Untitled section";
      const slug = text
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/^-|-$/g, "");
      const base = heading.id || `heading-${slug || "section"}`;
      let id = base;
      let suffix = 2;
      while (
        usedIds.has(id) ||
        (document.getElementById(id) && document.getElementById(id) !== heading)
      ) {
        id = `${base}-${suffix++}`;
      }
      usedIds.add(id);
      heading.id = id;
      return { id, text, html, level: Number(heading.tagName[1]) };
    });

    setHeadings(entries);
    const target = entries.find(
      ({ id }) => `#${encodeURIComponent(id)}` === window.location.hash
    );
    if (target) {
      requestAnimationFrame(() => {
        document.getElementById(target.id)?.scrollIntoView();
      });
    }
  }, []);

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

      <div className="note-layout">
        <NoteTableOfContents headings={headings} />
        <div ref={collectHeadings} className="body-text note-content">
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkBreaks]}
            rehypePlugins={[rehypeRaw, [rehypeKatex, katexOptions]]}
            components={markdownComponents}>
            {normalizeDisplayMathDelimiters(note.content)}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
