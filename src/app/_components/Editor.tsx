"use client";

import { updateNote } from "@/actions/noteActions";
import { useNoteLocalStorage } from "@/lib/hooks";
import { defaultNoteContent, InsertNote } from "@/lib/note";
import {
  FAIL_SAVE_NOTE,
  NOT_LOGGED_IN,
  SAVED_NOTE,
  SAVING_NOTE,
} from "@/lib/snippets";
import { debounce } from "@/lib/utils";
import {
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { FC, useContext, useEffect, useRef } from "react";
import { TimedMessageContext } from "../_contexts/TimedMessageContext";
import { UserAuthContext } from "../_contexts/UserAuthContext";
import { Toolbar } from "./EditorToolbar";

export const ALL_PLUGINS = [
  toolbarPlugin({ toolbarContents: () => <Toolbar /> }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  diffSourcePlugin({ viewMode: "rich-text" }),
  codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      "": "Plain Text",
      js: "JavaScript",
      jsx: "JavaScript (JSX)",
      ts: "TypeScript",
      tsx: "TypeScript (TSX)",
      css: "CSS",
      scss: "SCSS",
      sass: "Sass",
      less: "Less",
      html: "HTML",
      xml: "XML",
      json: "JSON",
      yaml: "YAML",
      markdown: "Markdown",
      python: "Python",
      java: "Java",
      c: "C",
      cpp: "C++",
      csharp: "C#",
      go: "Go",
      rust: "Rust",
      ruby: "Ruby",
      php: "PHP",
      swift: "Swift",
      kotlin: "Kotlin",
      scala: "Scala",
      r: "R",
      matlab: "MATLAB",
      sql: "SQL",
      bash: "Bash",
      powershell: "PowerShell",
      perl: "Perl",
      lua: "Lua",
      dart: "Dart",
      elixir: "Elixir",
      erlang: "Erlang",
      haskell: "Haskell",
      clojure: "Clojure",
      dockerfile: "Dockerfile",
      graphql: "GraphQL",
      toml: "TOML",
      ini: "INI",
      diff: "Diff",
      vue: "Vue",
      svelte: "Svelte",
      astro: "Astro",
    },
  }),
  markdownShortcutPlugin(),
];

interface EditorProps {
  note: InsertNote;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const Editor: FC<EditorProps> = ({ note, editorRef }) => {
  const [curNote, setCurNote] = useNoteLocalStorage("note", note);
  const { setTimedValue } = useContext(TimedMessageContext);
  const user = useContext(UserAuthContext);

  useEffect(() => {
    const lastUpdate = curNote.updatedAt
      ? new Date(curNote.updatedAt)
      : new Date();
    setTimedValue(
      user ? (
        <SAVED_NOTE time={lastUpdate} />
      ) : (
        <NOT_LOGGED_IN time={lastUpdate} />
      ),
    );
  }, []);

  const handleChange = useRef(
    debounce(async (content: string) => {
      const now = new Date();
      setCurNote((note) => ({
        ...note,
        content,
        updatedAt: now,
      }));

      if (user) {
        setTimedValue(<SAVING_NOTE />);
        const updatedNote = await updateNote(content);
        if (!updatedNote.error) {
          setTimedValue(<SAVED_NOTE time={now} />);
        } else {
          setTimedValue(<FAIL_SAVE_NOTE />);
        }
      } else {
        setTimedValue(<NOT_LOGGED_IN time={now} />);
      }
    }, 800),
  );

  const handleContainerClick = (e: React.MouseEvent) => {
    if (editorRef?.current && e.target === e.currentTarget) {
      editorRef.current.focus();
    }
  };

  return (
    <div
      className="flex flex-col flex-1 w-full min-h-0 cursor-text"
      onClick={handleContainerClick}
    >
      <MDXEditor
        onChange={(content) => handleChange.current(content)}
        ref={editorRef}
        markdown={curNote.content || defaultNoteContent}
        plugins={ALL_PLUGINS}
        contentEditableClassName="prose prose-invert max-w-[95ch] mx-auto min-h-[calc(100vh-8rem)] pt-6"
        className="dark-theme dark-editor scroll-p-16 h-full"
      />
    </div>
  );
};

export default Editor;
