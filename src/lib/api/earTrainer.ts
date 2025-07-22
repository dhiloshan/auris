import * as Tone from "tone";
import { Note } from '@/types/earTrainer'

export function playSound(note : Note) {
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