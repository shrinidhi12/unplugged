/** The kinds of note a visitor can drop in the suggestion box. */
export const SUGGESTION_KINDS = {
  idea: {
    emoji: "💡",
    label: "Idea",
    placeholder: "It'd be amazing if Unplugg Me could…",
  },
  bug: {
    emoji: "🐛",
    label: "Something's broken",
    placeholder: "I clicked ___ and then ___ happened…",
  },
  love: {
    emoji: "💌",
    label: "Love note",
    placeholder: "Okay, I just have to say…",
  },
  other: {
    emoji: "🎲",
    label: "Something else",
    placeholder: "Tell me anything…",
  },
} as const;

export type SuggestionKind = keyof typeof SUGGESTION_KINDS;

export const MAX_SUGGESTION_LENGTH = 5000;

export function isSuggestionKind(value: string): value is SuggestionKind {
  return Object.prototype.hasOwnProperty.call(SUGGESTION_KINDS, value);
}
