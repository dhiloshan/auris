import { Note } from '@/types/earTrainer';
import { generateRandomInterval, getIntervalName } from './interval-utils';

export function testUser(): { question: string, answer: string, note1: Note, note2: Note, options: string[] } {
    const { note1, note2, interval, intervalName } = generateRandomInterval();
    
    const options = [intervalName];
    
    return {
        question: `Listen carefully to the two notes. What interval do you hear?`,
        answer: intervalName,
        note1,
        note2,
        options
    };
}

export * from './interval-utils';
export * from './exercise-generators';
