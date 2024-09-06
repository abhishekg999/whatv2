"use client";

import { useNoteLocalStorage } from "@/lib/hooks";
import {
  MDXEditor,
  MDXEditorMethods,
  markdownShortcutPlugin,
  frontmatterPlugin,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
} from "@mdxeditor/editor";
import { FC, Fragment, useContext } from "react";
import { Toolbar } from "./EditorToolbar";
import { debounce } from "@/lib/utils";
import { TimedMessageContext } from "../_contexts/TimedMessageContext";
import { UserAuthContext } from "../_contexts/UserAuthContext";
import { FAIL_SAVE_NOTE, NOT_LOGGED_IN, SAVED_NOTE, SAVING_NOTE } from "@/lib/snippets";
import { updateNote } from "@/actions/noteActions";
import { InsertNote } from "@/lib/note";

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
  codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "JavaScript",
      css: "CSS",
      txt: "Plain Text",
      tsx: "TypeScript",
      "": "Unspecified",
    },
  }),
  markdownShortcutPlugin(),
];

interface EditorProps {
  note: InsertNote;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const Editor: FC<EditorProps> = ({ note, editorRef }) => {
  console.log("Editor.tsx: EditorProps: ", note);
  const [curNote, setCurNote] = useNoteLocalStorage("note", note);
  const { setTimedValue } = useContext(TimedMessageContext);
  const user = useContext(UserAuthContext);

  if (user) {
    updateNote(curNote.content || "").then(() => {
      console.log("Editor.tsx: Updated note on first render.");
    });
  }

  const handleChange = debounce(async (content: string) => {
    setTimedValue(<SAVING_NOTE/>);
    setCurNote((note) => { return {
      ...note, 
      content, 
      updatedAt: new Date(),
    }});

    if (user) {
      const updatedNote = await updateNote(content);
      if (!updatedNote.error) {
        setTimedValue(<SAVED_NOTE/>, 4000);
      } else {
        setTimedValue(<FAIL_SAVE_NOTE/>, 4000);
      }
    } else {
      setTimedValue(<NOT_LOGGED_IN/>, 4000);
    }

  }, 800);

  return (
    <div className="flex flex-col justify-center align-middle mx-auto max-w-full">
      <Fragment>
        <MDXEditor
          onChange={handleChange}
          ref={editorRef}
          markdown={curNote.content || ""}
          plugins={ALL_PLUGINS}
          contentEditableClassName="prose prose-invert max-w-[80ch] mx-auto"
          className="dark-theme dark-editor scroll-p-16"
        />
      </Fragment>
    </div>
  );
};

export default Editor;
