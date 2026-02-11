#!/usr/bin/env node
import { readFileSync } from 'fs';
import { Client } from 'pg';

// Read .env.local manually
const envContent = readFileSync('.env.local', 'utf8');
const dbUrl = envContent.match(/DATABASE_URL='([^']+)'/)?.[1];

if (!dbUrl) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
}

async function migrate() {
    console.log('Running database migrations...');

    const client = new Client({ connectionString: dbUrl });

    try {
        await client.connect();

        // Create users table
        await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        email TEXT NOT NULL,
        name TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
        console.log('✓ Users table created');

        // Create word_progress table
        await client.query(`
      CREATE TABLE IF NOT EXISTS word_progress (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        word_id TEXT NOT NULL,
        first_seen_at TIMESTAMP DEFAULT NOW() NOT NULL,
        last_seen_at TIMESTAMP DEFAULT NOW() NOT NULL,
        correct_count INTEGER DEFAULT 0 NOT NULL,
        incorrect_count INTEGER DEFAULT 0 NOT NULL,
        last_incorrect_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
        CONSTRAINT user_word_unique UNIQUE (user_id, word_id)
      );
    `);
        console.log('✓ Word_progress table created');

        // Create index for efficient queries
        await client.query(`
      CREATE INDEX IF NOT EXISTS word_progress_user_last_incorrect_idx 
      ON word_progress(user_id, last_incorrect_at);
    `);
        console.log('✓ Indexes created');

        console.log('✅ Migration completed successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    } finally {
        await client.end();
    }
}

migrate();
