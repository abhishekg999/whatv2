import dynamic from "next/dynamic";
import { Suspense } from "react";

const EditorComp = dynamic(() => import("./_components/Editor"), {
  ssr: false,
});
const id = "note";

export default function App() {
  return (
    <main className="flex flex-1 flex-col max-w-full">
      <Suspense fallback={<div>loading...</div>}>
        <EditorComp id={id} />
      </Suspense>
    </main>
  );
}
