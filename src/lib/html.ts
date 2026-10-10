/** Lightweight HTML helpers for admin rich-text fields (no external sanitizer). */

const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "ul",
  "ol",
  "li",
  "h2",
  "h3",
  "h4",
  "a",
  "blockquote",
]);

const BLOCK_TAGS = new Set(["p", "ul", "ol", "li", "h2", "h3", "h4", "blockquote"]);

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function sanitizeHref(href: string): string | null {
  const trimmed = href.trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("/") ||
    lower.startsWith("#")
  ) {
    return trimmed;
  }
  return null;
}

/** Strip disallowed tags/attributes while keeping a small formatting allowlist. */
export function sanitizeRichHtml(input: string): string {
  if (!input?.trim()) return "";

  let html = input
    .replace(/<\s*script[\s\S]*?>[\s\S]*?<\s*\/\s*script\s*>/gi, "")
    .replace(/<\s*style[\s\S]*?>[\s\S]*?<\s*\/\s*style\s*>/gi, "")
    .replace(/on\w+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");

  html = html.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (full, rawTag: string, attrs: string) => {
    const tag = rawTag.toLowerCase();
    const isClosing = full.startsWith("</");
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (isClosing) return `</${tag}>`;

    if (tag === "br") return "<br />";

    if (tag === "a") {
      const hrefMatch = attrs.match(/href\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const rawHref = hrefMatch?.[2] ?? hrefMatch?.[3] ?? hrefMatch?.[4] ?? "";
      const href = sanitizeHref(decodeEntities(rawHref));
      if (!href) return "";
      return `<a href="${href.replace(/"/g, "&quot;")}" rel="noopener noreferrer" target="_blank">`;
    }

    return `<${tag}>`;
  });

  // Collapse empty noise
  return html
    .replace(/(<p>\s*<\/p>)+/gi, "")
    .replace(/\u00a0/g, " ")
    .trim();
}

export function isBlankRichHtml(html: string): boolean {
  const text = decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  return text.length === 0;
}

/** Convert newline-separated plain text / bullet lines into simple HTML lists/paragraphs. */
export function linesToRichHtml(lines: string[]): string {
  const items = lines.map((l) => l.trim()).filter(Boolean);
  if (items.length === 0) return "";
  return `<ul>${items.map((item) => `<li>${escapeText(item)}</li>`).join("")}</ul>`;
}

export function escapeText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function plainTextToRichHtml(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeText(paragraph).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

/** Extract readable plain text from rich HTML (emails / previews). */
export function richHtmlToPlainText(html: string): string {
  if (!html) return "";
  return decodeEntities(
    html
      .replace(/<\/(p|h2|h3|h4|li|blockquote)>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\n{3,}/g, "\n\n"),
  )
    .trim();
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export { BLOCK_TAGS };
