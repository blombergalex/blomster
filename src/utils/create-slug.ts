import { randomUUID } from "crypto";

const slugify = (text: string) => {
  return text
  .toLowerCase()
  .replace(/[\u0300-\u036f]/g, "") // Remove accents
  .trim()                         // Trim leading/trailing white space
  .replace(/[^\w\s-]/g, "")       // Remove non-alphanumeric characters
  .replace(/[\s_]+/g, "-")        // Replace spaces/underscores with hyphens
  .replace(/-+/g, "-")            // Collapse multiple hyphens
  .replace(/^-+|-+$/g, "")        // Trim hyphens at start/end
}

export const createSlug = (parsedData: { title: string}, username: string) => {
  return `${username}-${slugify(parsedData.title).slice(0, 50)}-${randomUUID()}`;
};
