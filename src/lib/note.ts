import { notes } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";


export type InsertNote = InferInsertModel<typeof notes>;
export function createDefaultNote(): InsertNote {
  return {
    content: `# Welcome!\n\nWrite something here.\n`,
    owner: "",
    createdAt: new Date(),
    updatedAt: new Date(0),
  };
}