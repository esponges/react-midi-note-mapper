import React, { useEffect } from "react";
import { Track } from "@tonejs/midi";

import "./App.css";

import { midiToBlob } from "./utils/midi";

function App() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const timeRef = React.useRef<number>(0);

  const [midi, setMidi] = React.useState<Track>();
  const [note, setNote] = React.useState<string|null>(null);

  useEffect(() => {
    const getMidi = async () => {
      const song = await midiToBlob("/songs/Beethoven-Moonlight-Sonata.mid");
      setMidi(song);
    };
    getMidi();
  }, []);

  console.log(midi);
  const handleMapNote = (note: string) => {
    setNote(note);
  }

  const handleAudioPlay = () => {
    if (audioRef.current && !!midi) {
      audioRef.current.play();
      // map the very first note in the state
      setNote(midi.notes[0].name);
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
      setNote(null);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h5>Current Note</h5>
        <p>
          {note}
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
