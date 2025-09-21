import type { Editor } from "@tiptap/react";
import { Button } from "../ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  UnderlineIcon,
  CaseLower,
  CaseUpper,
} from "lucide-react";

interface ToolbarProps {
  editor: Editor | null;
}

function Toolbar({ editor }: ToolbarProps) {
  if (!editor) return null; // ✅ handle null safely

  return (
    <div className="flex flex-wrap gap-2 border-b pb-2 mb-2">
      <Button
        type="button"
        size="sm"
        variant={editor.isActive("bold") ? "default" : "secondary"}
        onClick={() => editor.commands.toggleBold()}
      >
        <Bold size={16} />
      </Button>

      <Button
        type="button"
        size="sm"
        variant={editor.isActive("italic") ? "default" : "secondary"}
        onClick={() => editor.commands.toggleItalic()}
      >
        <Italic size={16} />
      </Button>

      <Button
        type="button"
        size="sm"
        variant={editor.isActive("strike") ? "default" : "secondary"}
        onClick={() => editor.commands.toggleStrike()}
      >
        <Strikethrough size={16} />
      </Button>

      <Button
        type="button"
        size="sm"
        variant={editor.isActive("bulletList") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </Button>

      <Button
        type="button"
        size="sm"
        variant={editor.isActive("orderedList") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </Button>

      <Button
        type="button"
        size="sm"
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "secondary"
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 size={16} />
      </Button>

      <Button
        type="button"
        size="sm"
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "secondary"
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 size={16} />
      </Button>

      <Button
        type="button"
        size="sm"
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "secondary"
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 size={16} />
      </Button>

      <Button
        type="button"
        size={"sm"}
        variant={editor.isActive("horizontalRule") ? "default" : "secondary"}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        disabled={!editor.can().chain().focus().setHorizontalRule().run()}
      >
        <UnderlineIcon size={16} />
      </Button>

      <Button
        type="button"
        size="sm"
        variant="secondary" // no isActive check
        onClick={() => editor.chain().focus().transformToLowercase().run()}
      >
        <CaseLower size={16} />
      </Button>

      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => editor.chain().focus().transformToUppercase().run()}
      >
        <CaseUpper size={16} />
      </Button>
    </div>
  );
}

export default Toolbar;
