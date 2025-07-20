import NoteButton from '@/components/NoteButton';
import Form from 'next/form'
import * as Tone from "tone";
import Link from 'next/link';

export default function demo() {
  return (
    <>
      <h1 className="text-center text-5xl py-4">Piano</h1>
      <div className="h-50"></div>
      <div className="flex space-x-5 bg-[#F0E2E7] justify-center items-center h-40"> 
        <NoteButton noteName="C#" pitch={4} length="8n" />
        <NoteButton noteName="D#" pitch={4} length="8n" />
        <NoteButton noteName="F#" pitch={4} length="8n" />
        <NoteButton noteName="G#" pitch={4} length="8n" />
        <NoteButton noteName="A#" pitch={4} length="8n" />
      </div>
      <div className="flex space-x-5 bg-[#F0E2E7] justify-center items-center h-40"> 
        <NoteButton noteName="C" pitch={4} length="8n" />
        <NoteButton noteName="D" pitch={4} length="8n" />
        <NoteButton noteName="E" pitch={4} length="8n" />
        <NoteButton noteName="F" pitch={4} length="8n" />
        <NoteButton noteName="G" pitch={4} length="8n" />
        <NoteButton noteName="A" pitch={4} length="8n" />
        <NoteButton noteName="B" pitch={4} length="8n" />
        <NoteButton noteName="C" pitch={5} length="8n" />
      </div>
    </>
  )
}