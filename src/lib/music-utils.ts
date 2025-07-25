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

export function generateChordProgression(): { notes: Note[], chordType: string, answer: string } {
    const chordTypes = [
        { name: 'Major Triad', intervals: [0, 4, 7], answer: 'Major' },
        { name: 'Minor Triad', intervals: [0, 3, 7], answer: 'Minor' },
        { name: 'Diminished Triad', intervals: [0, 3, 6], answer: 'Diminished' },
        { name: 'Augmented Triad', intervals: [0, 4, 8], answer: 'Augmented' }
    ];
    
    const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = Math.floor(Math.random() * chromaticScale.length);
    const chordType = chordTypes[Math.floor(Math.random() * chordTypes.length)];
    
    const notes: Note[] = chordType.intervals.map(interval => {
        const noteIndex = (rootIndex + interval) % 12;
        return {
            noteName: chromaticScale[noteIndex],
            pitch: 4,
            length: "2n"
        };
    });
    
    return {
        notes,
        chordType: chordType.name,
        answer: chordType.answer
    };
}

export function generateMelodicSequence(length: number = 4): { notes: Note[], sequence: string } {
    const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const notes: Note[] = [];
    let currentIndex = Math.floor(Math.random() * chromaticScale.length);
    
    for (let i = 0; i < length; i++) {
        const noteName = chromaticScale[currentIndex];
        notes.push({
            noteName,
            pitch: 4,
            length: "4n"
        });
        
        const step = Math.floor(Math.random() * 5) - 2;
        currentIndex = (currentIndex + step + 12) % 12;
    }
    
    const sequence = notes.map(note => note.noteName).join(' - ');
    
    return { notes, sequence };
}

export function generateScaleRecognition(): { notes: Note[], scaleType: string, answer: string } {
    const scales = [
        ...majorScales.sharpKeys.map(s => ({ ...s, type: 'Major' })),
        ...majorScales.flatKeys.map(s => ({ ...s, type: 'Major' })),
        ...minorScales.sharpKeys.map(s => ({ ...s, type: 'Minor' })),
        ...minorScales.flatKeys.map(s => ({ ...s, type: 'Minor' }))
    ];
    
    const randomScale = scales[Math.floor(Math.random() * scales.length)];
    const notes: Note[] = randomScale.notes.map(noteName => ({
        noteName,
        pitch: 4,
        length: "4n"
    }));
    
    return {
        notes,
        scaleType: randomScale.type,
        answer: randomScale.type
    };
}

export function generateRhythmPattern(): { pattern: string[], answer: string } {
    const patterns = [
        { pattern: ['4n', '4n', '4n', '4n'], answer: 'Four quarter notes' },
        { pattern: ['2n', '2n'], answer: 'Two half notes' },
        { pattern: ['8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n'], answer: 'Eight eighth notes' },
        { pattern: ['4n', '8n', '8n', '4n'], answer: 'Quarter, two eighths, quarter' },
        { pattern: ['8n', '8n', '4n', '4n'], answer: 'Two eighths, two quarters' }
    ];
    
    return patterns[Math.floor(Math.random() * patterns.length)];
}
