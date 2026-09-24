const DISPLAY_MATH_DELIMITER = "$$";

function isHorizontalWhitespace(char: string): boolean {
  return char === " " || char === "\t";
}

function leadingWhitespace(line: string): string {
  let index = 0;
  while (index < line.length && isHorizontalWhitespace(line[index])) {
    index += 1;
  }
  return line.slice(0, index);
}

function trimTrailingWhitespace(line: string): string {
  let end = line.length;
  while (end > 0 && isHorizontalWhitespace(line[end - 1])) {
    end -= 1;
  }
  return line.slice(0, end);
}

function fenceOpener(line: string): "```" | "~~~" | null {
  const trimmed = line.trimStart();
  if (trimmed.startsWith("```")) {
    return "```";
  }
  if (trimmed.startsWith("~~~")) {
    return "~~~";
  }
  return null;
}

/**
 * If `$$` starts the line but is stuck to equation text, put the delimiter
 * on its own line. Already-correct delimiter-only lines are left alone.
 */
function splitOpeningDisplayMath(line: string): string[] | null {
  const indent = leadingWhitespace(line);
  const afterIndent = line.slice(indent.length);
  if (!afterIndent.startsWith(DISPLAY_MATH_DELIMITER)) {
    return null;
  }

  const rest = afterIndent.slice(DISPLAY_MATH_DELIMITER.length);
  if (rest.trim() === "") {
    return null;
  }

  return [indent + DISPLAY_MATH_DELIMITER, rest.trimStart()];
}

/**
 * If `$$` ends the line but is stuck to equation text, put the delimiter
 * on its own line. A line that is only `$$` is already a delimiter.
 */
function splitClosingDisplayMath(line: string): string[] | null {
  const withoutTrailingSpace = trimTrailingWhitespace(line);
  if (!withoutTrailingSpace.endsWith(DISPLAY_MATH_DELIMITER)) {
    return null;
  }

  const beforeDelimiter = withoutTrailingSpace.slice(
    0,
    -DISPLAY_MATH_DELIMITER.length
  );
  if (beforeDelimiter.trim() === "") {
    return null;
  }

  return [
    trimTrailingWhitespace(beforeDelimiter),
    DISPLAY_MATH_DELIMITER,
  ];
}

function splitStuckDisplayMathDelimiters(line: string): string[] {
  const opened = splitOpeningDisplayMath(line);
  const remainder = opened ? opened[1] : line;
  const closed = splitClosingDisplayMath(remainder);

  if (opened && closed) {
    return [opened[0], ...closed];
  }
  if (opened) {
    return opened;
  }
  if (closed) {
    return closed;
  }
  return [line];
}

/**
 * remark-math requires display-math `$$` delimiters on their own lines.
 * Obsidian often exports them stuck to the equation, e.g.
 *
 *     $$\begin{align*}
 *     ...
 *     \end{align*}$$
 *
 * or a single-line `$$equation$$`. This peels those delimiters onto
 * neighboring lines without touching fenced code blocks.
 */
export function normalizeDisplayMathDelimiters(markdown: string): string {
  const lines = markdown.split("\n");
  const output: string[] = [];
  let fence: "```" | "~~~" | null = null;

  for (const line of lines) {
    const opener = fenceOpener(line);
    if (opener) {
      if (fence === null) {
        fence = opener;
      } else if (opener === fence) {
        fence = null;
      }
      output.push(line);
      continue;
    }

    if (fence) {
      output.push(line);
      continue;
    }

    output.push(...splitStuckDisplayMathDelimiters(line));
  }

  return output.join("\n");
}
