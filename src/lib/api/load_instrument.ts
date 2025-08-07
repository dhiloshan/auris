import * as Tone from "tone";

let piano: Tone.Sampler | null = null;
let synth: Tone.Synth | null = null;
let pianoLoaded = false;
let pianoLoading = false;

export const getInstrument = () => {
    if (piano && pianoLoaded && piano.loaded) {
        return piano;
    }
    
    if (!synth) {
        synth = new Tone.Synth().toDestination();
    }
    return synth;
};

export const initPiano = async () => {
    if (pianoLoading) return; // race condition prevention
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
        const maxAttempts = 40;
        
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

export { pianoLoaded, pianoLoading };