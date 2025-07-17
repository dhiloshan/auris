"use client";

import Form from 'next/form'
import * as Tone from "tone";

function playSampleSound() {
  const synth = new Tone.Synth().toDestination();

  synth.triggerAttackRelease("D#4", "4n");
}

export default function Home() {
  return (
    <button onClick={playSampleSound}>Play a note!</button>
  )
}