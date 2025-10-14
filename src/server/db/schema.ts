// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { bigint, mysqlTableCreator, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type z from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `${name}`);

export const reactHooks = createTable("react_hooks", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull().unique(),
  description: text("description"),
  code: text("code").notNull(),
  documentation: text("documentation").notNull(),
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});

export const ReactHookSchema = createSelectSchema(reactHooks);
export const ReactHookTitleOnlySchema = ReactHookSchema.pick({
  title: true
});
export const NewReactHookSchema = createInsertSchema(reactHooks);

export type ReactHook = z.infer<typeof ReactHookSchema>;
export type ReactHookTitleOnly = z.infer<typeof ReactHookTitleOnlySchema>;
export type NewReactHook = z.infer<typeof NewReactHookSchema>;

export const reactionCounters = createTable("reaction_counters", {
  id: serial("id").primaryKey(),
  hook_id: bigint("hook_id", { mode: "number" })
    .references(() => reactHooks.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  likes: bigint("likes", { mode: "number" }).default(0).notNull(),
  dislikes: bigint("dislikes", { mode: "number" }).default(0).notNull()
});

export const ReactionCounterSchema = createSelectSchema(reactionCounters);
export const NewReactionCounterSchema = createInsertSchema(reactionCounters);

export type ReactionCounter = z.infer<typeof ReactionCounterSchema>;
export type NewReactionCounter = z.infer<typeof NewReactionCounterSchema>;
