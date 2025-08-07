import * as Tone from "tone";

export interface Note {
    noteName: string,
    pitch: number,
    length?: Tone.Unit.Time;
}

export interface Interval {
    quality: string,
    distance: number
}