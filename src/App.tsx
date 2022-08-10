import React, { useEffect } from "react";
import { Track } from "@tonejs/midi";

import logo from "./logo.svg";
import "./App.css";

import { midiToBlob } from "./utils/midi";

function App() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [midi, setMidi] = React.useState<Track>();

  useEffect(() => {
    const getMidi = async () => {
      const song = await midiToBlob("/songs/Beethoven-Moonlight-Sonata.mid");
      setMidi(song);
    };
    getMidi();
  }, []);

  console.log(midi);

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <button onClick={handleAudioPlay}>Play</button>
          <button onClick={handleAudioReplay}>Replay</button>
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
