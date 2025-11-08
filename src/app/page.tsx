import dynamic from "next/dynamic";
import { Suspense } from "react";
import { validateRequest } from "@/auth";
import { UserAuthProvider } from "./_contexts/UserAuthContext";
import { createDefaultNote, InsertNote } from "@/lib/note";
import { getOrCreateNote, SelectNote } from "@/actions/noteActions";

const EditorComp = dynamic(() => import("./_components/Editor"), {
  ssr: false,
});

export default async function App() {
  const { user } = await validateRequest();

  let serverNote: InsertNote = createDefaultNote();

  if (user) {
    const note = await getOrCreateNote();
    if (!note.error) {
      const selectNote = note as SelectNote;
      serverNote = {
        owner: selectNote.owner,
        content: selectNote.content,
        createdAt: selectNote.createdAt,
        updatedAt: selectNote.updatedAt,
      };
    }
  }

  return (
    <main className="flex flex-1 flex-col w-full min-h-0">
      <Suspense fallback={null}>
        <UserAuthProvider user={user}>
          <EditorComp note={serverNote} />
        </UserAuthProvider>
      </Suspense>
    </main>
  );
}
