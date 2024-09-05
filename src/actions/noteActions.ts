"use server";

import { notes } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

export async function updateNote(id: string, content: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  const note = await db
    .update(notes)
    .set({
      content,
    })
    .where(eq(notes.noteId, id))
    .returning();

  return note;
}
