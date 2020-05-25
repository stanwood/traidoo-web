import sanitizeHtml from "sanitize-html";

export const htmlSanitize = (html: string): { __html: string } => {
  return {
    __html: sanitizeHtml(html, {
      allowedTags: [
        "b",
        "i",
        "em",
        "strong",
        "a",
        "div",
        "span",
        "p",
        "li",
        "ul",
        "table",
        "td",
        "tr",
        "br",
      ],
      allowedAttributes: {
        a: ["href", "target"],
      },
    }),
  };
};
