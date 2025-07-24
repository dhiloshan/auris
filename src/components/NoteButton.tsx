"use client";

import React, { JSX } from 'react';
import * as Tone from "tone";
import { playSoundNow } from '@/lib/api/earTrainer';
import { Note } from '@/types/earTrainer'


const NoteButton = ({ noteName, pitch, length  } : Note): JSX.Element => {
    return (
        <div>
            <button onClick={() => playSoundNow( {noteName, pitch, length} )} className="btn bg-[#B20D30] text-white text-3xl">
                {noteName}
            </button>
        </div>
    )
}

export default NoteButton