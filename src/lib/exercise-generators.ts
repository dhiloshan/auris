import majorScales from '@/lib/major-scales.json';
import minorScales from '@/lib/minor-scales.json';
import { Note } from '@/types/earTrainer';
import { CHROMATIC_SCALE, CHORD_TYPES } from './constants';

export function getMajorKey() {
    let randomScale = Math.round(Math.random() * 5);
    let data = majorScales.sharpKeys[randomScale];
    return data;
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

