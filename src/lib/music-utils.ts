import { Note } from '@/types/earTrainer';

/*
export function getMajorKey() {
    let randomScale = Math.round(Math.random() * 5);
    let data = majorScales.sharpKeys[randomScale];
    return data;
}
*/

export function makeValidNote(noteName : string){
    if (noteName == 'D♭') return 'C#';
    else if (noteName == 'E♭') return 'D#';
    else if (noteName == 'G♭') return 'F#';
    else if (noteName == 'A♭') return 'G#';
    else if (noteName == 'B♭') return 'A#';
    else return noteName;
}
