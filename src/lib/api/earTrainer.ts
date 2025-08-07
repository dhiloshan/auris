import * as Tone from "tone";
import { Note } from '@/types/earTrainer'
import { makeValidNote } from "../music-utils";
import { pianoLoaded, pianoLoading, initPiano, getInstrument } from "./load_instrument";

export async function playSoundNow(note : Note) {
    if (!pianoLoaded && !pianoLoading) {
        await initPiano();
    }
    
    const instrument = getInstrument();
    instrument.triggerAttackRelease(`${makeValidNote(note.noteName)}${note.pitch}`, note.length || '4n');
    if(note.length == undefined) console.log('Myself: Note length was not defined.')
}

export async function playIntervalSound(root : Note, upper : Note, playbackForm : string) {
    if(!pianoLoaded && !pianoLoading) {
        await initPiano();
    }

    const instrument = getInstrument();

    if (playbackForm == 'ascending melodic') {
        playSoundNow(root);
        setTimeout(() => { playSoundNow(upper) }, 1000);
    }
    else if (playbackForm == 'descending melodic') {
        playSoundNow(upper);
        setTimeout(() => { playSoundNow(root) }, 1000);
    }
    else if (playbackForm == 'harmonic') {
        playSoundNow(root); 
        playSoundNow(upper);
    }
}

export async function playChord(notes: Note[]) {
    if (!pianoLoaded && !pianoLoading) {
        await initPiano();
    }
    
    const instrument = getInstrument();
    notes.forEach((note, i) => {
        instrument.triggerAttackRelease(`${note.noteName}${note.pitch}`, "2n", Tone.now() + i * 0.1);
    });
}

export async function playMelodicSequence(notes: Note[]) {
    if (!pianoLoaded && !pianoLoading) {
        await initPiano();
    }
    
    const instrument = getInstrument();
    notes.forEach((note, i) => {
        instrument.triggerAttackRelease(`${note.noteName}${note.pitch}`, note.length || "4n", Tone.now() + i * 0.8);
    });
}



export function testUser(){
    // Using a simple scale for testing since getMajorKey doesn't exist
    let scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    let idx1 = Math.round(Math.random() * 6), idx2 = Math.round(Math.random() * 6);

    let note1 : Note = { noteName: scale[idx1], pitch: 4, length: "4n" };
    let note2 : Note = { noteName: scale[idx2], pitch: 4, length: "4n" };
    playSoundNow(note1); 
    setTimeout(() => {
        console.log("This message appears after 1 seconds.");
        playSoundNow(note2);
        console.log(`Notes are: ${scale[idx1]} and ${scale[idx2]}`);
    }, 1000);
}