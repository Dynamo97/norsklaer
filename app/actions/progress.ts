"use server"

import { auth } from "@/auth";
import { getOrCreateUser, updateWordProgress, getUserWeakWords } from "@/lib/db/queries";

export async function recordWordAttempt(wordId: string, isCorrect: boolean) {
    try {
        const session = await auth();

        if (!session?.user) {
            // User not authenticated, skip tracking
            return { success: false, reason: 'not_authenticated' };
        }

        // Ensure user exists in database
        const user = await getOrCreateUser(session);

        // Record the attempt
        await updateWordProgress(user.id, wordId, isCorrect);

        return { success: true };
    } catch (error) {
        console.error('Error recording word attempt:', error);
        return { success: false, reason: 'error' };
    }
}

export async function getWeakWords(limit: number = 20) {
    try {
        const session = await auth();

        if (!session?.user) {
            return { success: false, words: [] };
        }

        const user = await getOrCreateUser(session);
        const weakWords = await getUserWeakWords(user.id, limit);

        return { success: true, words: weakWords };
    } catch (error) {
        console.error('Error getting weak words:', error);
        return { success: false, words: [] };
    }
}
