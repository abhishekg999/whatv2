import { text, pgTable, serial, uuid, timestamp, integer } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  github_id: integer("github_id").unique().notNull(),
  username: text("username").unique().notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  noteId: uuid("note_id").unique().notNull().defaultRandom(),
  title: text("title"),
  content: text("content"),
  owner: text("owner")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});