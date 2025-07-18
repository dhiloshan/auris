"use client";

import NoteButton from '@/components/NoteButton';
import Form from 'next/form'
import * as Tone from "tone";

function playSampleSound() {
  const synth = new Tone.Synth().toDestination();

  synth.triggerAttackRelease("D#4", "4n");
}

export default function Home() {
  return (
    <> 
      <button onClick={playSampleSound}>Play a note!</button>
      <NoteButton note={{ noteName: "C", pitch: 4, length: "4n"}}/>
      <NoteButton note={{ noteName: "D", pitch: 4, length: "4n"}}/>
      <NoteButton note={{ noteName: "E", pitch: 4, length: "4n"}}/>
      <NoteButton note={{ noteName: "F", pitch: 4, length: "4n"}}/>
      <NoteButton note={{ noteName: "G", pitch: 4, length: "4n"}}/>
      <NoteButton note={{ noteName: "A", pitch: 4, length: "4n"}}/>
      <NoteButton note={{ noteName: "B", pitch: 4, length: "4n"}}/>
      <NoteButton note={{ noteName: "C", pitch: 5, length: "4n"}}/>
    </>
  )
}