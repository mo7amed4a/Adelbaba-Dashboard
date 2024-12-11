"use client";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  EditorContent,
  EditorProvider,
  useCurrentEditor,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Link from "@tiptap/extension-link";
import { Bold, Code, Code2, Heading1, Heading2, Heading3, Heading3Icon, Heading4, Italic, Link2, List, ListOrdered, Quote, QuoteIcon, Redo, Strikethrough, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaFont, FaParagraph } from "react-icons/fa";

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

const MenuBar = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group prose">
      <div className="button-group flex gap-4">
        <Button variant={"outline"} className={
            editor.isActive("textStyle")
              ? "bg-primary" : "bg-gray-50"
          }>
          <input
            type="color"
            className="size-6"
            onInput={(event) =>
              editor.chain().focus().setColor(event.currentTarget.value).run()
            }
            title="اختر اللون"
          />
        </Button>
        <Button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setLink({ href: prompt("ff") as string })
              .run()
          }
          className={
            editor.isActive("link")
              ? "bg-primary" : "bg-gray-50"
          }
        >
                 <Link2 className="size-4"/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-primary" : "bg-gray-50"}
        >
          <Bold  className={`size-4" `}/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-primary" : "bg-gray-50"}
        >
          <Italic  className={`size-4`}/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-primary" : "bg-gray-50"}
        >
          <Strikethrough  className={`size-4`}/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "bg-primary" : "bg-gray-50"}
        >
          <FaFont className="size-4"/>
        </Button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </button>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "bg-primary" : "bg-gray-50"}
        >
          <FaParagraph className="size-4"/>
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "bg-primary" : "bg-gray-50"
          }
        >
          <Heading1 className="size-4"/>
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "bg-primary" : "bg-gray-50"
          }
        >
          <Heading2 className="size-4"/>
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "bg-primary" : "bg-gray-50"
          }
        >
          <Heading3 className="size-4"/>
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "bg-primary" : "bg-gray-50"
          }
        >
          <Heading4 className="size-4"/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-primary" : "bg-gray-50"}
        >
          <List className="size-4"/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-primary" : "bg-gray-50"}
        >
          <ListOrdered className="size-4"/>

        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "bg-primary" : "bg-gray-50"}
        >
          <Code className="size-4"/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "bg-primary" : "bg-gray-50"}
        >
          <QuoteIcon className="size-4"/>
        </Button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          variant={"ghost"}
        >
          <Undo className="size-4"/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          variant={"ghost"}
        >
          
          <Redo className="size-4"/>
        </Button>
        <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          
        >
          Purple
        </button>
      </div>
      <EditorContent editor={editor} />
      <p
        className="prose"
        dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
      ></p>
    </div>
  );
};

const content = `<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>`;

export default () => {
  return (
    <div>
      <MenuBar />
    </div>
  );
};
