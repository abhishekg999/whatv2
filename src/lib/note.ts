import { notes } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

export const defaultNoteContent = `
# Welcome!

Write something here.
You can use Markdown syntax to format your text using the toolbar above.

**Like this**, or *this*, or even \`this\`!

---
By default notes are saved in LocalStorage.
If you would like to save notes across devices, you can login via GitHub.
`

export type InsertNote = InferInsertModel<typeof notes>;
export function createDefaultNote(): InsertNote {
  return {
    content: defaultNoteContent,
    owner: "",
    createdAt: new Date(),
    updatedAt: new Date(0),
  };
}