import majorScales from '@/lib/major-scales.json';
import minorScales from '@/lib/minor-scales.json';
import { Note } from '@/types/earTrainer';
import { CHROMATIC_SCALE, CHORD_TYPES } from './constants';

export function getMajorKey() {
    let randomScale = Math.round(Math.random() * 5);
    let data = majorScales.sharpKeys[randomScale];
    return data;
}

export function generateChordProgression(): { notes: Note[], chordType: string, answer: string } {
    const rootIndex = Math.floor(Math.random() * CHROMATIC_SCALE.length);
    const chordType = CHORD_TYPES[Math.floor(Math.random() * CHORD_TYPES.length)];
    
    const notes: Note[] = chordType.intervals.map(interval => {
        const noteIndex = (rootIndex + interval) % 12;
        return {
            noteName: CHROMATIC_SCALE[noteIndex],
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
    const notes: Note[] = [];
    let currentIndex = Math.floor(Math.random() * CHROMATIC_SCALE.length);
    
    for (let i = 0; i < length; i++) {
        const noteName = CHROMATIC_SCALE[currentIndex];
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
