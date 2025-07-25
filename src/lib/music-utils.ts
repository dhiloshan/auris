import majorScales from '@/lib/major-scales.json'
import minorScales from '@/lib/minor-scales.json'
import { Note } from '@/types/earTrainer';

export function getMajorKey() {
    let randomScale = Math.round(Math.random() * 5);
    let data = majorScales.sharpKeys[randomScale];
    return data;
}

export function calculateInterval(note1: Note, note2: Note): number {
    const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    const note1Name = note1.noteName.replace(/\d/g, '');
    const note2Name = note2.noteName.replace(/\d/g, '');
    
    const note1Index = chromaticScale.indexOf(note1Name);
    const note2Index = chromaticScale.indexOf(note2Name);
    
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
    const intervalNames = [
        'Unison', 'Minor Second', 'Major Second', 'Minor Third', 'Major Third',
        'Perfect Fourth', 'Tritone', 'Perfect Fifth', 'Minor Sixth', 'Major Sixth',
        'Minor Seventh', 'Major Seventh', 'Octave'
    ];
    
    return intervalNames[interval] || 'Unknown';
}

export function generateRandomInterval(): { note1: Note, note2: Note, interval: number, intervalName: string } {
    const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    const note1Index = Math.floor(Math.random() * chromaticScale.length);
    const note1Name = chromaticScale[note1Index];
    
    const interval = Math.floor(Math.random() * 12) + 1;
    
    const note2Index = (note1Index + interval) % 12;
    const note2Name = chromaticScale[note2Index];
    
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

export function testUser(): { question: string, answer: string, note1: Note, note2: Note } {
    const { note1, note2, intervalName } = generateRandomInterval();
    
    return {
        question: `What interval is ${note1.noteName} to ${note2.noteName}?`,
        answer: intervalName,
        note1,
        note2
    };
}
