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

  // serverNote acts as a note from a remote source. 
  // If the user is authenticated, it will be populated with the note from the server.
  // Otherwise it will be populated with a default note created at Date(0)
  let serverNote: InsertNote;

  // If the user is logged in, check if they have a note. If not, create one.
  // Pass the note to the editor.
  if (user) {
    const note = await getOrCreateNote();
    if (!note.error) {
      const selectNote = note as SelectNote;
      serverNote = {
        owner: selectNote.owner,
        content: selectNote.content,
        createdAt: selectNote.createdAt,
        updatedAt: selectNote.updatedAt,
      }
    } else {
      serverNote = createDefaultNote();
    }
  } else {
    serverNote = createDefaultNote();
  }

  return (
    <main className="flex flex-1 flex-col max-w-full">
      <Suspense fallback={null}>
        <UserAuthProvider user={user}>
          <EditorComp note={serverNote} />
        </UserAuthProvider>
      </Suspense>
    </main>
  );
}
