import NoteButton from '@/components/NoteButton';
import Form from 'next/form'
import * as Tone from "tone";

export default function Home() {
  return (
    <>
      <h1 className="text-center text-5xl py-4">Home Page</h1>
      <div className="h-50"></div>
      <div className="flex space-x-5 bg-[#F0E2E7] justify-center items-center h-40"> 
        <NoteButton note={{ noteName: "C#", pitch: 4, length: "8n"}}/>
        <NoteButton note={{ noteName: "D#", pitch: 4, length: "8n"}}/>
        <NoteButton note={{ noteName: "F#", pitch: 4, length: "8n"}}/>
        <NoteButton note={{ noteName: "G#", pitch: 4, length: "8n"}}/>
        <NoteButton note={{ noteName: "A#", pitch: 4, length: "8n"}}/>
      </div>
      <div className="flex space-x-5 bg-[#F0E2E7] justify-center items-center h-40"> 
        <NoteButton note={{ noteName: "C", pitch: 4, length: "8n"}}/>
        <NoteButton note={{ noteName: "D", pitch: 4, length: "8n"}}/>
        <NoteButton note={{ noteName: "E", pitch: 4, length: "8n"}}/>
        <NoteButton note={{ noteName: "F", pitch: 4, length: "8n"}}/>
        <NoteButton note={{ noteName: "G", pitch: 4, length: "8n"}}/>
        <NoteButton note={{ noteName: "A", pitch: 4, length: "8n"}}/>
        <NoteButton note={{ noteName: "B", pitch: 4, length: "8n"}}/>
        <NoteButton note={{ noteName: "C", pitch: 5, length: "8n"}}/>
      </div>
    </>
  )
}