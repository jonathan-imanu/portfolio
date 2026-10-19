const DISPLAY_MATH_DELIMITER = "$$";

// Obsidian permits top-level line breaks in display math, as MathJax does.
export const katexOptions = {
  strict: (errorCode: string): "ignore" | "warn" =>
    errorCode === "newLineInDisplayMode" ? "ignore" : "warn",
};

/**
 * Put Obsidian display-math delimiters on their own lines for remark-math,
 * including blocks introduced by prose such as `So $$...$$`. Track whether
 * we're inside math so opening and closing delimiters stay in sync.
 */
export function normalizeDisplayMathDelimiters(markdown: string): string {
  const output: string[] = [];
  let fence: string | null = null;
  let inlineCode: string | null = null;
  let inMath = false;

  for (const line of markdown.split("\n")) {
    if (fence) {
      const closing = line.trim().match(/^(`{3,}|~{3,})$/)?.[1];
      if (closing?.[0] === fence[0] && closing.length >= fence.length) {
        fence = null;
      }
      output.push(line);
      continue;
    }

    if (!inMath && !inlineCode) {
      const opening = line.trimStart().match(/^(`{3,}|~{3,})/)?.[1];
      if (opening) {
        fence = opening;
        output.push(line);
        continue;
      }
    }

    let normalized = "";
    let start = 0;
    for (const match of line.matchAll(/`+|\$\$/g)) {
      const token = match[0];
      const index = match.index;
      let backslashes = 0;
      for (let before = index - 1; before >= 0 && line[before] === "\\"; before--) {
        backslashes++;
      }
      if (!inlineCode && backslashes % 2 === 1) continue;

      if (token.startsWith("`")) {
        if (!inMath) {
          if (!inlineCode) inlineCode = token;
          else if (inlineCode === token) inlineCode = null;
        }
        continue;
      }
      if (inlineCode) continue;

      normalized += line.slice(start, index);
      if (line.slice(0, index).trim()) {
        normalized += inMath ? "\n" : "\n\n";
      }
      normalized += DISPLAY_MATH_DELIMITER;
      if (line.slice(index + token.length).trim()) {
        normalized += inMath ? "\n\n" : "\n";
      }
      inMath = !inMath;
      start = index + token.length;
    }
    output.push(normalized + line.slice(start));
  }

  return output.join("\n");
}
