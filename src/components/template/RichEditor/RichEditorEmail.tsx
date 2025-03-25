"use client";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Code,
  FlipVertical,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  QuoteIcon,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaFont } from "react-icons/fa";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Link.configure({ openOnClick: false }),
];

const RichEditorEmail = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group prose space-y-4">
      <EditorContent
        className="[&>.tiptap.ProseMirror]:px-4 [&>.tiptap.ProseMirror]:bg-white [&>.tiptap.ProseMirror]:my-0 [&>.tiptap.ProseMirror]:border "
        editor={editor}
      />
      <div className="button-group flex gap-2">
        <Button 
          size="xs"
          variant={"outline"}
          className={"py-1 "+ editor.isActive("textStyle") ? "bg-primary" : "bg-gray-50"}
        >
          <input
            type="color"
            className="size-6"
            onInput={(event) =>
              editor.chain().focus().setColor(event.currentTarget.value).run()
            }
            title="Choose color"
          />
        </Button>
        <Button
          size="xs"
          onClick={() =>
            editor
              .chain()
              .focus()
              .setLink({ href: prompt("ff") as string })
              .run()
          }
          className={editor.isActive("link") ? "bg-primary" : "bg-gray-50"}
        >
          <Link2 className="size-4" />
        </Button>
        <Button
          size="xs"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-primary" : "bg-gray-50"}
        >
          <Bold className={`size-4" `} />
        </Button>
        <Button
          size="xs"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-primary" : "bg-gray-50"}
        >
          <Italic className={`size-4`} />
        </Button>
        <Button
          size="xs"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-primary" : "bg-gray-50"}
        >
          <Strikethrough className={`size-4`} />
        </Button>
        <Button
          size="xs"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "bg-primary" : "bg-gray-50"}
        >
          <FaFont className="size-4" />
        </Button>
        <Button
          size="xs"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "bg-primary"
              : "bg-gray-50"
          }
        >
          <Heading3 className="size-4" />
        </Button>

        <Button
          size="xs"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList") ? "bg-primary" : "bg-gray-50"
          }
        >
          <List className="size-4" />
        </Button>
        <Button
          size="xs"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList") ? "bg-primary" : "bg-gray-50"
          }
        >
          <ListOrdered className="size-4" />
        </Button>
        <Button
          size="xs"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "bg-primary" : "bg-gray-50"}
        >
          <Code className="size-4" />
        </Button>
        <Button
          size="xs"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote") ? "bg-primary" : "bg-gray-50"
          }
        >
          <QuoteIcon className="size-4" />
        </Button>
        <Button
          size="xs"
          variant={"ghost"}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <FlipVertical />
        </Button>
        <Button
          size="xs"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          variant={"ghost"}
        >
          <Undo className="size-4" />
        </Button>
        <Button
          size="xs"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          variant={"ghost"}
        >
          <Redo className="size-4" />
        </Button>
      </div>
    </div>
  );
};

const content = `
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ipsum eaque, aliquam voluptatem officia est, laboriosam quasi eligendi doloremque id mollitia sit distinctio quam recusandae rem libero veniam! Expedita, est!
</p>
<blockquote>
  Lorem ipsum dolor sit amet. 👏
  <br />
  — Bye
</blockquote>`;

export default RichEditorEmail;
