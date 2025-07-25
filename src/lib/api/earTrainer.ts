import * as Tone from "tone";
import { Note } from '@/types/earTrainer'
import { getMajorKey } from "../music-utils";

let piano: Tone.Sampler | null = null;
let synth: Tone.Synth | null = null;
let pianoLoaded = false;
let pianoLoading = false;

const getInstrument = () => {
    if (piano && pianoLoaded && piano.loaded) {
        return piano;
    }
    
    if (!synth) {
        synth = new Tone.Synth().toDestination();
    }
    return synth;
};

const initPiano = async () => {
    if (pianoLoading) return;
    pianoLoading = true;
    
    try {
        piano = new Tone.Sampler({
            urls: {
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3", 
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
            },
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination();
        
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!piano.loaded && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (piano.loaded) {
            pianoLoaded = true;
        } else {
            console.log("Piano samples failed to load, using synth instead");
            piano = null;
            pianoLoaded = false;
        }
    } catch (error) {
        console.log("Piano samples failed to load, using synth instead");
        piano = null;
        pianoLoaded = false;
    }
    pianoLoading = false;
};

export async function playSoundNow(note : Note) {
    if (!pianoLoaded && !pianoLoading) {
        await initPiano();
    }
    
    const instrument = getInstrument();
    instrument.triggerAttackRelease(`${note.noteName}${note.pitch}`, note.length);
}

export async function playScale(scale : string[], pitch : number, length : Tone.Unit.Time)  {
    if (!pianoLoaded && !pianoLoading) {
        await initPiano();
    }
    
    const instrument = getInstrument();
    scale.forEach((note, i) => {
        instrument.triggerAttackRelease(`${note}${pitch}`, length, Tone.now() + i * 0.5);
        if(note[0] == 'B') pitch++;
    });
    instrument.triggerAttackRelease(`${scale[0]}${pitch}`, length, Tone.now() + 3.5);
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
        instrument.triggerAttackRelease(`${note.noteName}${note.pitch}`, note.length, Tone.now() + i * 0.8);
    });
}

export async function playRhythmPattern(pattern: string[]) {
    if (!pianoLoaded && !pianoLoading) {
        await initPiano();
    }
    
    const instrument = getInstrument();
    pattern.forEach((rhythm, i) => {
        instrument.triggerAttackRelease("C4", rhythm, Tone.now() + i * 0.5);
    });
}

export function testUser(){
    let idx1 = Math.round(Math.random() * 7), idx2 = Math.round(Math.random() * 7);
    let scale = getMajorKey().notes;

    let note1 : Note = { noteName: scale[idx1], pitch: 4, length: "4n" };
    let note2 : Note = { noteName: scale[idx2], pitch: 4, length: "4n" };
    playSoundNow(note1); 
    setTimeout(() => {
        console.log("This message appears after 1 seconds.");
        playSoundNow(note2);
        console.log(`Notes are: ${scale[idx1]} and ${scale[idx2]}`);
    }, 1000);
}