import { useEffect, useRef, useState } from "react";

export interface NoteHeading {
  id: string;
  text: string;
  html: string;
  level: number;
}

export function NoteTableOfContents({
  headings,
}: {
  headings: NoteHeading[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = headings.map(({ id }) => document.getElementById(id));
    let frame = 0;

    const updateActiveHeading = () => {
      frame = 0;
      let current: string | null = headings[0]?.id ?? null;
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        if (!element || !element.getClientRects().length) continue;
        if (element.getBoundingClientRect().top > 32) break;
        current = headings[index].id;
      }

      // The last section can be too short to reach the reading position.
      const page = document.documentElement;
      if (
        page.scrollHeight > window.innerHeight + 1 &&
        window.scrollY + window.innerHeight >= page.scrollHeight - 2
      ) {
        current = headings.at(-1)?.id ?? null;
      }
      setActiveId(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveHeading);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    const content = elements[0]?.closest(".note-content");
    if (content) observer.observe(content);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer.disconnect();
    };
  }, [headings]);

  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!nav || !active) return;
    const bounds = nav.getBoundingClientRect();
    const item = active.getBoundingClientRect();
    if (item.top < bounds.top || item.bottom > bounds.bottom) {
      nav.scrollTop +=
        item.top - bounds.top - nav.clientHeight / 2 + item.height / 2;
    }
  }, [activeId]);

  if (!headings.length) return null;

  const minLevel = Math.min(...headings.map(({ level }) => level));

  return (
    <aside className="note-toc">
      <div className="note-toc-panel">
        <p className="mb-3 text-sm font-medium text-gray-900">On this page</p>
        <nav ref={navRef} aria-label="Table of contents" className="note-toc-nav">
          <ul className="note-toc-list">
            {headings.map(({ id, text, html, level }) => (
              <li key={id}>
                <a
                  href={`#${encodeURIComponent(id)}`}
                  aria-current={id === activeId ? "location" : undefined}
                  title={text}
                  onClick={() => setActiveId(id)}
                  style={{ paddingLeft: `${(level - minLevel) * 12 + 12}px` }}
                  className="note-toc-link">
                  {/* Reuse the rendered heading, retaining KaTeX and inline formatting. */}
                  <span
                    className="note-toc-label"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
