import { Note } from '@/types/earTrainer';
import { CHROMATIC_SCALE, semitoneToInterval, INTERVAL_NAMES, QUALITY_ORDER, DISTANCE_ORDER, FLAT_CHROMATIC_SCALE, NOTE_LETTERS} from './constants';
import { playIntervalSound } from './api/earTrainer';
import NoteButton from '@/components/NoteButton';
import majorScales from '@/lib/major-scales.json';

export function intervalDist(interval: string) {
    if (interval === 'Unison') return 1;
    const distance = interval.split(' ')[1];
    switch (distance) {
        case 'Second': return 2;
        case 'Third': return 3;
        case 'Fourth': return 4;
        case 'Fifth': return 5;
        case 'Sixth': return 6;
        case 'Seventh': return 7;
        case 'Octave': return 8;
        case 'Ninth': return 9;
        default: 
            console.log("Me: Interval Length isn't Valid");
            return undefined;
    }
}

export function isPerfectInterval(intervalLen : number) : boolean {
    intervalLen %= 8; // accounts for compound interval
    if (intervalLen == 1 || intervalLen == 4 || intervalLen == 5 || intervalLen == 0) {
        return true;
    }
    else return false;  
}

export function genInterval(root : Note, interval : string) : Note {
    // for chord generation
    let rootIndex = NOTE_LETTERS.indexOf(root.noteName);
    let upperNoteName = (rootIndex + (intervalDist(interval) || 0)) % 7;
    let upperPitchIncrease = Math.floor((rootIndex + (intervalDist(interval) || 0)) / 7);

   
    // if the root is a flat note, then the upper note can be natural or flat
    // if the root note is a natural note, then the upper note can be flat, natural, or sharp
    /*
    For any note, there is 5 options(3 usually)
    Note double flat, Note flat, Note natural, Note Sharp, Note Double Sharp
    Have an array for C D E ... B so we can find the note to use
    In terms of whether to put a sharp or flat and how much, use this:

    refer to the major scales json to make a major or perfect interval
    let sharp be a +1 and a flat be -1 and natural be 0
    a augmented 6th requires a plus 1, so we add 1 to the score

    if the score is -2: two flats, -1: one flat, 0: nothing, +1: 1 sharp, +2: 2 sharps
    */
}

export function genRandomInterval() : string {
    let rootIndex = Math.floor(Math.random() * FLAT_CHROMATIC_SCALE.length);
    let root : Note = {noteName: FLAT_CHROMATIC_SCALE[rootIndex], 
        pitch: 2 + Math.round(Math.random() * 2),
        length: "1n"};
    // generate a major (perfect), minor, diminished, or augmented interval
    // do NOT generate a doubly augmented or doubly diminished interval

    let semitones = Math.round(Math.random() * 14); // interval length [1,9] uses 0 to 14 semitones
    let intervalName = semitoneToInterval[semitones];
    
    let upperIndex = (rootIndex + semitones) % 12;
    let upper : Note = {noteName: FLAT_CHROMATIC_SCALE[upperIndex],
        pitch: root.pitch,
        length: "1n" };

    if (rootIndex + semitones >= 24) upper.pitch += 2;
    else if (rootIndex + semitones >= 12) upper.pitch++;    

    playIntervalSound(root, upper, "ascending melodic");
    setTimeout(() => playIntervalSound(root, upper, "harmonic"), 2500);

    console.log(`This is the root note: ${root.noteName} with pitch ${root.pitch}`); 
    console.log(`This is the upper note: ${upper.noteName} with pitch ${upper.pitch}`);
    
    return intervalName;
}