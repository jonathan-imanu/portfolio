import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { getNote, getBreadcrumbs, getNotesIndex } from "../utils/notes";
import type { ProcessedNote } from "../types/notes";
import { NoteSkeleton } from "./NoteSkeleton";

export function NoteViewer() {
  const { noteId } = useParams<{ noteId: string }>();
  const [note, setNote] = useState<ProcessedNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [breadcrumbLinks, setBreadcrumbLinks] = useState<
    Array<{ name: string; path: string; noteId?: string }>
  >([]);

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

  useEffect(() => {
    if (!note) return;

    const breadcrumbs = getBreadcrumbs(note.path);
    // Initialize with breadcrumbs (without note IDs first)
    setBreadcrumbLinks(breadcrumbs.map((crumb) => ({ ...crumb })));

    // Then load note IDs asynchronously
    getNotesIndex().then((notesIndex) => {
      const links = breadcrumbs.map((crumb) => {
        const noteEntry = Object.values(notesIndex.notes).find(
          (n) => n.path === crumb.path
        );
        return {
          ...crumb,
          noteId: noteEntry?.id,
        };
      });
      setBreadcrumbLinks(links);
    });
  }, [note?.path]);

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
        className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">
        ← Back to Home
      </Link>

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        {breadcrumbLinks.map((crumb, index) => (
          <span key={crumb.path} className="flex items-center gap-2">
            {index > 0 && (
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            {index < breadcrumbLinks.length - 1 ? (
              // For folders, link to folder view; for notes, link to note
              crumb.noteId ? (
                <Link
                  to={`/notes/${crumb.noteId}`}
                  className="hover:text-gray-900 transition-colors">
                  {crumb.name}
                </Link>
              ) : (
                <Link
                  to={`/?folder=${encodeURIComponent(crumb.path)}`}
                  className="hover:text-gray-900 transition-colors">
                  {crumb.name}
                </Link>
              )
            ) : (
              <span className="text-gray-900 font-medium">{crumb.name}</span>
            )}
          </span>
        ))}
      </nav>

      <h1 className="text-2xl font-bold text-black">{note.title}</h1>

      <div className="flex gap-2 text-xs text-gray-500">
        <span>{new Date(note.metadata.date).toLocaleDateString()}</span>
      </div>

      <div className="body-text">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            a: ({ href, children }) => {
              if (!href) {
                return <span>{children}</span>;
              }

              const isInternal = href.startsWith("/notes/");

              if (isInternal) {
                return (
                  <Link
                    to={href}
                    className="text-gray-900 underline hover:text-gray-700">
                    {children}
                  </Link>
                );
              }

              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 underline hover:text-gray-700">
                  {children}
                </a>
              );
            },

            p: ({ children }) => <p className="body-text mb-4">{children}</p>,

            h1: ({ children }) => (
              <h1 className="text-2xl font-bold text-black mt-6 mb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-bold text-black mt-5 mb-3">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-bold text-black mt-4 mb-2">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-base font-bold text-black mt-3 mb-2">
                {children}
              </h4>
            ),

            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-1 body-text ml-4">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-1 body-text ml-4">
                {children}
              </ol>
            ),

            code: ({ className, children, ...props }) => {
              const isInline = !className;
              return isInline ? (
                <code
                  className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
                  {...props}>
                  {children}
                </code>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto my-4">
                {children}
              </pre>
            ),

            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic body-text my-4">
                {children}
              </blockquote>
            ),

            img: (props) => {
              const { src, alt, title, ...rest } = props;

              if (!src) {
                return null;
              }

              let imageSrc = src;
              if (imageSrc.startsWith("/images/")) {
                const filename = imageSrc.replace("/images/", "");
                imageSrc = `/images/${encodeURIComponent(filename)}`;
              } else if (
                !imageSrc.startsWith("http") &&
                !imageSrc.startsWith("data:")
              ) {
                imageSrc = encodeURI(src);
              }

              return (
                <img
                  {...rest}
                  src={imageSrc}
                  alt={alt || ""}
                  title={title}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full h-auto my-4 rounded"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    imageRendering: "auto",
                  }}
                />
              );
            },
          }}>
          {note.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
