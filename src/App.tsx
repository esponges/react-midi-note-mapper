import React, { useEffect } from "react";
import { Track } from "@tonejs/midi";

import "./App.css";

import { midiToBlob } from "./utils/midi";

type Note = Track['notes'][number] | null;

function App() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const playinRef = React.useRef<boolean>(false);
  const timeRef = React.useRef<number>(0);

  const [midi, setMidi] = React.useState<Track>();
  const [note, setNote] = React.useState<Note>(null);
  const [noteId, setNoteId] = React.useState<number|null>(null);

  useEffect(() => {
    const getMidi = async () => {
      const song = await midiToBlob("/songs/Beethoven-Moonlight-Sonata.mid");
      setMidi(song);
    };
    getMidi();
  }, []);

  const handleMapNote = (note: Note) => {
    setNote(note);
  }
  
  useEffect(() => {
    let currentTimeout: ReturnType<typeof setTimeout>;
    
    if (playinRef.current && midi) {
      const nextNoteIdx = midi.notes.findIndex(n => n.velocity === noteId) + 1;
      const nextNote = midi.notes[nextNoteIdx];

      if (nextNote) {
        const nextTime = nextNote.time - timeRef.current;
        currentTimeout = setTimeout(() => {
          handleMapNote(nextNote);
        }, nextTime);
      }
    }

    return () => {
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
    }
  } , [midi, noteId]);

  // useEffect(() => {
  //   let currentTimeout: ReturnType<typeof setTimeout>;

  //   if (isPlaying && midi) {
  //     const nextNoteIdx = midi.notes.findIndex(n => n.velocity === noteId) + 1;
  //     const nextNote = midi.notes[nextNoteIdx];



  const handleAudioPlay = () => {
    if (audioRef.current && !!midi) {
      audioRef.current.play();
      // map the very first note in the state
      // velocity is the closest we have to an unique id
      playinRef.current = true;
      handleMapNote(midi.notes[0]);
    }
  }

  const handleAudioReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  const handleAudioStop = () => {
    if (audioRef.current && !!midi) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      handleMapNote(null);
      playinRef.current = false;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h5>Current Note</h5>
        <p>
          {note?.name}
        </p>
        <div>
          <button onClick={handleAudioPlay}>Play</button>
          <button onClick={handleAudioReplay}>Replay</button>
          <button onClick={handleAudioStop}>Stop</button>
        </div>
        <audio ref={audioRef}>
          <source
            src="/songs/Beethoven-Moonlight-Sonata.mp3"
            type="audio/mpeg"
          />
        </audio>
      </header>
    </div>
  );
}

export default App;
