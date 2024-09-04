"use client";

import { useLocalStorage } from "@/lib/hooks";
import {
  MDXEditor, MDXEditorMethods,
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
import { FC, Fragment, useContext, useEffect } from "react";
import { Toolbar } from "./EditorToolbar";
import { debounce } from "@/lib/utils";
import { TimedMessageContext } from "../_contexts/TimedMessageContext";
import { SAVED_NOTE, SAVING_NOTE } from "@/lib/snippets";

// import "@mdxeditor/editor/style.css";


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
  codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
  codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'Plain Text', tsx: 'TypeScript', '': 'Unspecified' } }),
  markdownShortcutPlugin()
]

interface EditorProps {
  id: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const defaultMarkdown = `
# Welcome!

Write something here.
`

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({ id, editorRef }) => {
  const [content, setContent] = useLocalStorage(id, defaultMarkdown);
  const { setTimedValue } = useContext(TimedMessageContext);

  return (
    <div className="flex flex-col justify-center align-middle mx-auto max-w-full">

      <Fragment>
        <MDXEditor
          onChange={debounce((e: string) => {
            setTimedValue(SAVING_NOTE);
            setContent(e);
            setTimedValue(SAVED_NOTE, 2000);
          }, 1000)}
          ref={editorRef}
          markdown={content}
          plugins={ALL_PLUGINS}
          contentEditableClassName="prose prose-invert max-w-[80ch] mx-auto"
          className="dark-theme dark-editor scroll-p-16"
        />

      </Fragment>
    </div>
  );
};

export default Editor;

