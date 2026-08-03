// src/lib/db/schema.ts

import { pgTable, serial, text, integer, timestamp, boolean, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { type AdapterAccount } from '@auth/drizzle-adapter'; // There is no AdapterAccount in the @auth/drizzle-adapter package.

export const users = pgTable('users', {
    id: text('id').primaryKey(),
    name: text('name'),
    email: text('email').unique().notNull(),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    image: text('image'),
    username: text('username').unique(),
    bio: text('bio'),
    theme: text('theme').default('light'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const accounts = pgTable(
    'accounts',
    {
        userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
        type: text('type').$type<AdapterAccount['type']>().notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('provider_account_id').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    (account) => ({
        compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    })
);

export const sessions = pgTable('sessions', {
    sessionToken: text('session_token').primaryKey(),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
    'verification_tokens',
    {
        identifier: text('identifier').notNull(),
        token: text('token').notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);

// ============ Your App Tables ============

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

// ============ Relations ============

export const usersRelations = relations(users, ({ many }) => ({
    links: many(links),
    accounts: many(accounts),
    sessions: many(sessions),
}));

export const linksRelations = relations(links, ({ one }) => ({
    user: one(users, {
        fields: [links.userId],
        references: [users.id],
    }),
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
