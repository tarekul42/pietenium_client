export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[&/\\#,+()$~%.'":*?<>{}–]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
