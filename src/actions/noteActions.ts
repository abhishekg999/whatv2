"use server";

import { validateRequest } from "@/auth";
import { db } from "@/db/drizzle";
import { notes } from "@/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";

export type NoteError = {
  error: string;
}

export type SelectNote = InferSelectModel<typeof notes> & { error: null };

export async function getOrCreateNote(): Promise<NoteError | SelectNote> {
  const { user } = await validateRequest();
  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const result = await db.select().from(notes).where(eq(notes.owner, user.id));

  if (result.length === 0) {
    const note = await db.insert(notes).values({
      owner: user.id,
      content: `# Welcome!\n\nWrite something here.\n`
    }).returning();

    if (note.length === 0) {
      return {
        error: "Failed to create note.",
      }
    }

    return { error: null, ...note[0] };
  }

  return { error: null, ...result[0] };
}

export async function updateNote(content: string) {
  const { user } = await validateRequest();
  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const result = await db.update(notes).set({
    content
  }).where(eq(notes.owner, user.id)).returning();

  if (result.length === 0) {
    return {
      error: "Note not found",
    }
  }

  return { error: null, ...result[0] };
}
