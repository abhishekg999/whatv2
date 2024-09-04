import { integer, text, pgTable, serial, uuid, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
});

export const notes = pgTable("notes", {
    id: serial('id').primaryKey(),
    noteId: uuid('note_id').unique().notNull().defaultRandom(),
    title: text('title'),
    content: text('content'),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date())
});
