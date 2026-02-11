import { db } from './index';
import { users, wordProgress } from './schema';
import { eq, and, desc } from 'drizzle-orm';
import type { Session } from 'next-auth';

export async function getOrCreateUser(session: Session) {
    if (!session.user?.email) {
        throw new Error('User email not found in session');
    }

    const userId = session.user.id || session.user.email; // Fallback to email if id not available

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (existingUser.length > 0) {
        return existingUser[0];
    }

    // Create new user
    const newUser = await db.insert(users).values({
        id: userId,
        email: session.user.email,
        name: session.user.name || null,
    }).returning();

    return newUser[0];
}

export async function getWordProgress(userId: string, wordId: string) {
    const progress = await db
        .select()
        .from(wordProgress)
        .where(and(eq(wordProgress.userId, userId), eq(wordProgress.wordId, wordId)))
        .limit(1);

    return progress[0] || null;
}

export async function updateWordProgress(userId: string, wordId: string, isCorrect: boolean) {
    const existing = await getWordProgress(userId, wordId);

    if (existing) {
        // Update existing record
        const updateData: any = {
            lastSeenAt: new Date(),
            updatedAt: new Date(),
        };

        if (isCorrect) {
            updateData.correctCount = existing.correctCount + 1;
        } else {
            updateData.incorrectCount = existing.incorrectCount + 1;
            updateData.lastIncorrectAt = new Date();
        }

        await db
            .update(wordProgress)
            .set(updateData)
            .where(eq(wordProgress.id, existing.id));
    } else {
        // Create new record
        await db.insert(wordProgress).values({
            userId,
            wordId,
            correctCount: isCorrect ? 1 : 0,
            incorrectCount: isCorrect ? 0 : 1,
            lastIncorrectAt: isCorrect ? null : new Date(),
        });
    }
}

export async function getUserWeakWords(userId: string, limit: number = 20) {
    // Get words where user has more incorrect than correct answers, ordered by most recent failures
    const weakWords = await db
        .select()
        .from(wordProgress)
        .where(eq(wordProgress.userId, userId))
        .orderBy(desc(wordProgress.lastIncorrectAt))
        .limit(limit);

    return weakWords.filter(w => w.incorrectCount > w.correctCount);
}
