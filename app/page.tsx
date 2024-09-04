import { hasEnvVars } from "@/utils/supabase/check-env-vars";

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const EditorComp = dynamic(() => import('./_components/Editor'), { ssr: false });
const id = "note";

export default async function App() {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <EditorComp id={id} />
        </Suspense>
    )
}