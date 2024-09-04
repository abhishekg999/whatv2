"use client";

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
import { FC, Fragment, useContext } from "react";
import { Toolbar } from "./EditorToolbar";
import { debounce } from "@/lib/utils";
import { TimedMessageContext } from "../_contexts/TimedMessageContext";
import { SAVING_NOTE, SAVED_NOTE } from "@/app/_components/ui/snippets";
import { useLocalStorage } from "@/lib/hooks";
import { updateNote } from "@/actions/noteActions";

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



const Editor: FC<EditorProps> = ({ id, editorRef }) => {
    const [content, setContent] = useLocalStorage(id, defaultMarkdown);
    const { setTimedValue } = useContext(TimedMessageContext);

    const debouncedSave = debounce(async (e: string) => {
        setTimedValue(SAVING_NOTE);
        setContent(e);
        const result = await updateNote(content);
        setTimedValue(SAVED_NOTE, 2000);
    }, 1000);

    const handleContentChange = (e: string) => {
        debouncedSave(e);
    }

    return (
        <div className="flex flex-col justify-center align-middle mx-auto max-w-full">

            <Fragment>
                <MDXEditor
                    onChange={handleContentChange}
                    ref={editorRef}
                    markdown={content}
                    plugins={ALL_PLUGINS}
                    autoFocus={true}
                    contentEditableClassName="prose prose-invert max-w-[80ch] mx-auto pt-8"
                    className="dark-theme dark-editor scroll-p-16"
                />

            </Fragment>
        </div>
    );
};

export default Editor;

