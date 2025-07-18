"use client";

import React, { JSX } from 'react';
import * as Tone from "tone";

export interface Note {
    noteName: string,
    pitch: number,
    length: Tone.Unit.Time;
}

function playSound(note : Note): void {
    const synth = new Tone.Synth().toDestination();
    
    synth.triggerAttackRelease(`${note.noteName}${note.pitch}`, note.length);
}

const NoteButton = ({ noteName, pitch, length  } : Note): JSX.Element => {
    return (
        <div>
            <button onClick={() => playSound( {noteName, pitch, length} )} className="btn bg-[#B20D30] text-white text-3xl">
                {noteName}
            </button>
        </div>
    )
}

export default NoteButton