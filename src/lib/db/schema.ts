// src/lib/db/schema.ts

import {
    pgTable,
    serial,
    text,
    integer,
    timestamp,
    primaryKey
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';  // ✅ Verify this import

// ============ NextAuth Tables ============

export const users = pgTable('users', {
    id: text('id').primaryKey().$defaultFn(() => uuidv4()),
    name: text('name'),
    email: text('email').unique().notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
    username: text('username').unique(),
    bio: text('bio'),
    theme: text('theme').default('light'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});

export const accounts = pgTable('accounts', {
    id: text('id').primaryKey().$defaultFn(() => uuidv4()),  // ✅ Must be here
    userId: text('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
});

export const sessions = pgTable('sessions', {
    sessionToken: text('sessionToken').primaryKey(),            // ✅ camelCase
    userId: text('userId')                                      // ✅ camelCase
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable('verification_tokens', {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
}, (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
}));

// ============ Your App Tables ============

export const links = pgTable('links', {
    id: serial('id').primaryKey(),
    userId: text('userId')                                      // ✅ camelCase
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    url: text('url').notNull(),
    icon: text('icon'),
    order: integer('order').default(0),
    clicks: integer('clicks').default(0),
    createdAt: timestamp('createdAt').defaultNow(),             // ✅ camelCase
    updatedAt: timestamp('updatedAt').defaultNow(),             // ✅ camelCase
});

// ============ Relations ============

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
    links: many(links),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));

export const linksRelations = relations(links, ({ one }) => ({
    user: one(users, {
        fields: [links.userId],
        references: [users.id],
    }),
}));
