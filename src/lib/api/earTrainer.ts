import * as Tone from "tone";
import { Note } from '@/types/earTrainer'

export function playSound(note : Note): void {
    const synth = new Tone.Synth().toDestination();
    
    synth.triggerAttackRelease(`${note.noteName}${note.pitch}`, note.length);
}