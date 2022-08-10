import React, { useEffect } from "react";
import { Track } from "@tonejs/midi";

import logo from "./logo.svg";
import "./App.css";

import { midiToBlob } from "./utils/midi";

function App() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [midi, setMidi] = React.useState<Track>();
  const [note, setNote] = React.useState<string|null>(null);

  useEffect(() => {
    const getMidi = async () => {
      const song = await midiToBlob("/songs/Beethoven-Moonlight-Sonata.mid");
      setMidi(song);
      setNote(song.notes[0].name);
    };
    getMidi();
  }, []);
  
  const handleAudioPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  const handleAudioReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  const handleAudioStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
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
