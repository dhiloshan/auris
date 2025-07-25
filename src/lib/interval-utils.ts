import intervals from '@/lib/intervals.json';
import { Note } from '@/types/earTrainer';
import { CHROMATIC_SCALE, INTERVAL_NAMES, QUALITY_ORDER, DISTANCE_ORDER } from './constants';

export function calculateInterval(note1: Note, note2: Note): number {
    const note1Name = note1.noteName.replace(/\d/g, '');
    const note2Name = note2.noteName.replace(/\d/g, '');
    
    const note1Index = CHROMATIC_SCALE.indexOf(note1Name);
    const note2Index = CHROMATIC_SCALE.indexOf(note2Name);
    
    if (note1Index === -1 || note2Index === -1) {
        return -1;
    }
    
    let interval = note2Index - note1Index;
    
    if (interval < 0) {
        interval += 12;
    }
    
    return interval;
}

export function getIntervalName(interval: number): string {
    return INTERVAL_NAMES[interval] || 'Unknown';
}

export function generateRandomInterval(): { note1: Note, note2: Note, interval: number, intervalName: string } {
    const note1Index = Math.floor(Math.random() * CHROMATIC_SCALE.length);
    const note1Name = CHROMATIC_SCALE[note1Index];
    
    const interval = Math.floor(Math.random() * 12) + 1;
    
    const note2Index = (note1Index + interval) % 12;
    const note2Name = CHROMATIC_SCALE[note2Index];
    
    const note1: Note = {
        noteName: note1Name,
        pitch: 4,
        length: "4n"
    };
    
    const note2: Note = {
        noteName: note2Name,
        pitch: 4,
        length: "4n"
    };
    
    return {
        note1,
        note2,
        interval,
        intervalName: getIntervalName(interval)
    };
}

export function getAllIntervalTypes(): string[] {
    const intervalTypes = new Set<string>();
    
    Object.values(intervals).forEach((rootNote: any) => {
        Object.values(rootNote).forEach((intervalArray: any) => {
            if (Array.isArray(intervalArray)) {
                intervalArray.forEach((interval: string) => {
                    intervalTypes.add(interval);
                });
            }
        });
    });
    
    const intervalArray = Array.from(intervalTypes);
    
    return intervalArray.sort((a, b) => {
        const getQuality = (interval: string) => {
            if (interval.includes('diminished')) return 'diminished';
            if (interval.includes('minor')) return 'minor';
            if (interval.includes('major')) return 'major';
            if (interval.includes('augmented')) return 'augmented';
            if (interval.includes('perfect')) return 'perfect';
            return 'unison';
        };
        
        const getDistance = (interval: string) => {
            for (const distance of DISTANCE_ORDER) {
                if (interval.includes(distance)) return distance;
            }
            return 'unison';
        };
        
        const aQuality = getQuality(a);
        const bQuality = getQuality(b);
        const aDistance = getDistance(a);
        const bDistance = getDistance(b);
        
        const distanceComparison = DISTANCE_ORDER.indexOf(aDistance) - DISTANCE_ORDER.indexOf(bDistance);
        if (distanceComparison !== 0) return distanceComparison;
        
        const aQualityIndex = QUALITY_ORDER.indexOf(aQuality);
        const bQualityIndex = QUALITY_ORDER.indexOf(bQuality);
        
        if (aQuality === 'perfect' && bQuality !== 'perfect') return 1;
        if (bQuality === 'perfect' && aQuality !== 'perfect') return -1;
        if (aQuality === 'perfect' && bQuality === 'perfect') return 0;
        
        return aQualityIndex - bQualityIndex;
    });
}

export function generateIntervalTestFromJSON(): { 
    question: string, 
    answer: string, 
    note1: Note, 
    note2: Note, 
    options: string[],
    allOptions: string[]
} {
    const rootNotes = Object.keys(intervals);
    const randomRoot = rootNotes[Math.floor(Math.random() * rootNotes.length)];
    const rootNoteData = (intervals as any)[randomRoot];
    const targetNotes = Object.keys(rootNoteData);
    
    const nonRootTargets = targetNotes.filter(note => note !== randomRoot);
    const randomTarget = nonRootTargets[Math.floor(Math.random() * nonRootTargets.length)];
    
    const intervalArray = rootNoteData[randomTarget];
    const correctInterval = Array.isArray(intervalArray) ? intervalArray[0] : intervalArray;
    
    const rootIndex = CHROMATIC_SCALE.indexOf(randomRoot);
    const targetIndex = CHROMATIC_SCALE.indexOf(randomTarget);
    
    let note1Pitch = 4;
    let note2Pitch = 4;
    
    if (targetIndex < rootIndex) {
        note2Pitch = 5;
    } else if (targetIndex === rootIndex) {
        note2Pitch = 5;
    }
    
    const note1: Note = {
        noteName: randomRoot,
        pitch: note1Pitch,
        length: "4n"
    };
    
    const note2: Note = {
        noteName: randomTarget,
        pitch: note2Pitch,
        length: "4n"
    };
    
    const allOptions = getAllIntervalTypes();
    
    const testOptions = [correctInterval];
    const remainingOptions = allOptions.filter(option => option !== correctInterval);
    
    for (let i = 0; i < 3 && remainingOptions.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * remainingOptions.length);
        testOptions.push(remainingOptions[randomIndex]);
        remainingOptions.splice(randomIndex, 1);
    }
    
    const shuffledOptions = testOptions.sort(() => Math.random() - 0.5);
    
    return {
        question: `Listen carefully to the two notes. What interval do you hear?`,
        answer: correctInterval,
        note1,
        note2,
        options: shuffledOptions,
        allOptions
    };
} 