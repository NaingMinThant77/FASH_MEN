// npm install @tiptap/react @tiptap/pm @tiptap/starter-kit

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { Lowercase } from "./extensions-tiptap/lowercase";
import { Uppercase } from "./extensions-tiptap/uppercase";
import { BulletList, ListItem, OrderedList } from "@tiptap/extension-list";
import Heading from "@tiptap/extension-heading";
import { useEffect } from "react";

interface TipTapProp {
  value: string;
  onChange: (value: string) => void;
}

const Tiptap = ({ value, onChange }: TipTapProp) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Lowercase,
      Uppercase,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-3 space-y-3">
      {/* Toolbar */}
      <Toolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="prose prose-sm sm:prose-base max-w-none focus:outline-none"
      />
    </div>
  );
};

export default Tiptap;
