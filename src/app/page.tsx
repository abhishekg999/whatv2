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
  // If there is a server, it will be populated with the note from the server.
  // Otherwise it will be populated with a default note created at Date(0)
  // The Editor will merge this data with localStorage to determine which is latest.
  let serverNote: InsertNote;

  // If the user is logged in, check if they have a note. If not, create one.
  // Pass the note to the editor.
  if (user) {
    const note = await getOrCreateNote();
    // TODO: fix typing pepegery here
    if (!note.error) {
      serverNote = {
        owner: (note as SelectNote).owner,
        content: (note as SelectNote).content,
        createdAt: (note as SelectNote).createdAt,
        updatedAt: (note as SelectNote).updatedAt,
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
