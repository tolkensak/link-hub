
import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
    id: text('id').primaryKey(), // NextAuth user.id
    name: text('name'),
    email: text('email').unique().notNull(),
    username: text('username').unique().notNull(),
    bio: text('bio'),
    theme: text('theme').default('light'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Links table
export const links = pgTable('links', {
    id: serial('id').primaryKey(),
    userId: text('user_id').references(() => users.id).notNull(),
    title: text('title').notNull(),
    url: text('url').notNull(),
    icon: text('icon'),
    order: integer('order').default(0),
    clicks: integer('clicks').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    links: many(links),
}));

export const linksRelations = relations(links, ({ one }) => ({
    user: one(users, {
        fields: [links.userId],
        references: [users.id],
    }),
}));
