import { BlockTypeSelect, BoldItalicUnderlineToggles, CodeToggle, CreateLink, InsertCodeBlock, InsertTable, InsertThematicBreak, ListsToggle, Separator, StrikeThroughSupSubToggles, UndoRedo } from "@mdxeditor/editor"


export const Toolbar = () => {
    return (
        <>
            <UndoRedo />
            <Separator />
            <BoldItalicUnderlineToggles />
            <CodeToggle />
            <InsertCodeBlock />
            <Separator />

            <BlockTypeSelect />

            <Separator />

            <StrikeThroughSupSubToggles />
            <Separator />
            <ListsToggle />
            <Separator />

            <CreateLink />
            {/* <InsertImage /> */}

            <Separator />

            <InsertTable />
            <InsertThematicBreak />
        </>
    )
}