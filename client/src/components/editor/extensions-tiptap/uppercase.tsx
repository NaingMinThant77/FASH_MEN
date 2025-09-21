import { Extension } from "@tiptap/core";
import type { Command, CommandProps } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    uppercase: {
      transformToUppercase: () => ReturnType;
    };
  }
}

export const Uppercase = Extension.create({
  name: "uppercase",

  addCommands() {
    return {
      transformToUppercase:
        (): Command =>
        ({ editor, state, tr }: CommandProps) => {
          const { from, to } = state.selection;

          if (from === to) return false; // no selection

          const selectedText = state.doc.textBetween(from, to);

          tr.insertText(selectedText.toUpperCase(), from, to);
          editor.view.dispatch(tr);

          return true;
        },
    };
  },
});
