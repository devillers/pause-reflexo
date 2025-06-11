import sanitizeHtml from "sanitize-html";

export function sanitizeMarkdown(markdown) {
  return sanitizeHtml(markdown, {
    allowedTags: [
      "b", "i", "em", "strong", "a", "p", "ul", "ol", "li",
      "blockquote", "h1", "h2", "h3", "h4", "h5", "br", "hr",
      "img", "code", "pre"
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt"]
    },
    allowedSchemes: ["http", "https", "mailto"]
  });
}