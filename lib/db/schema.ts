import { pgTable, uuid, text, timestamp, serial, integer, uniqueIndex } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey(),
    email: text('email').notNull(),
    name: text('name'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const wordProgress = pgTable('word_progress', {
    id: serial('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    wordId: text('word_id').notNull(),
    firstSeenAt: timestamp('first_seen_at').defaultNow().notNull(),
    lastSeenAt: timestamp('last_seen_at').defaultNow().notNull(),
    correctCount: integer('correct_count').default(0).notNull(),
    incorrectCount: integer('incorrect_count').default(0).notNull(),
    lastIncorrectAt: timestamp('last_incorrect_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
    userWordIdx: uniqueIndex('user_word_idx').on(table.userId, table.wordId),
}));
