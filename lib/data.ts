import wordList from '@/app/data/word_list.json';

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1+';

export interface Word {
    id: string;
    norwegian: string;
    english: string;
    level: Level;
    category: string;
}

export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1+'];

// Helper to map JSON levels to our App levels
const mapLevel = (jsonLevel: string): Level => {
    if (jsonLevel === 'C1' || jsonLevel === 'C2') return 'C1+';
    return jsonLevel as Level;
};

// Transform and export the data
export const mockWords: Word[] = (wordList as any[]).map((w) => ({
    id: w.id,
    norwegian: w.norwegian,
    english: w.english,
    level: mapLevel(w.level),
    category: w.category,
})).filter(w => LEVELS.includes(w.level)); // Ensure we only keep valid levels
