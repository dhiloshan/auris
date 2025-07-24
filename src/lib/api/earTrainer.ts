import * as Tone from "tone";
import { Note } from '@/types/earTrainer'
import { getMajorKey } from "../music-utils";

export function playSoundNow(note : Note) {
    const synth = new Tone.Synth().toDestination();
    
    synth.triggerAttackRelease(`${note.noteName}${note.pitch}`, note.length);
}

export function playScale(scale : string[], pitch : number, length : Tone.Unit.Time)  {
    const synth = new Tone.Synth().toDestination();

    scale.forEach((note, i) => {
        synth.triggerAttackRelease(`${note}${pitch}`, length, Tone.now() + i * 0.5);
        if(note[0] == 'B') pitch++;
    });
    synth.triggerAttackRelease(`${scale[0]}${pitch}`, length, Tone.now() + 3.5);
}

export function testUser(){
    let idx1 = Math.round(Math.random() * 7), idx2 = Math.round(Math.random() * 7);
    let scale = getMajorKey().notes;

    let note1 : Note = {
        noteName: scale[idx1],
        pitch: 4,
        length: "4n"
    };
    let note2 : Note = {
        noteName: scale[idx2],
        pitch: 4,
        length: "4n"
    };
    playSoundNow(note1); 
    setTimeout(() => {
        console.log("This message appears after 1 seconds.");
        playSoundNow(note2);
        console.log(`Notes are: ${scale[idx1]} and ${scale[idx2]}`);
    }, 1000);
}