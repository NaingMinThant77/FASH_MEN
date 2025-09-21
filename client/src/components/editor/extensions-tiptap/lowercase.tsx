import { Extension } from "@tiptap/core";
import type { Command, CommandProps } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lowercase: {
      transformToLowercase: () => ReturnType;
    };
  }
}

export const Lowercase = Extension.create({
  name: "lowercase",

  addCommands() {
    return {
      transformToLowercase:
        (): Command =>
        ({ editor, state, tr }: CommandProps) => {
          const { from, to } = state.selection;

          if (from === to) return false;

          const selectedText = state.doc.textBetween(from, to);

          tr.insertText(selectedText.toLowerCase(), from, to);
          editor.view.dispatch(tr);

          return true;
        },
    };
  },
});
