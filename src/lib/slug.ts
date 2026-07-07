import { customAlphabet } from "nanoid";

// Public event slug: lowercase, no ambiguous characters (0/o, 1/l/i).
const slugAlphabet = "23456789abcdefghjkmnpqrstuvwxyz";
export const newSlug = customAlphabet(slugAlphabet, 8);

// Secret host manage token: long + full alphanumeric, unguessable.
const tokenAlphabet =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const newEditToken = customAlphabet(tokenAlphabet, 32);

// RSVP id.
export const newId = customAlphabet(tokenAlphabet, 16);
