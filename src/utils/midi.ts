import { Midi, Track } from "@tonejs/midi";

export const midiToBlob = async (src: string): Promise<Track> => {
// secondary method using a Blob
//   const blob = await fetch(src).then((res) => res.blob());
//   return blobToJs(blob);

const midi = await Midi.fromUrl(src);
const tracks = midi.tracks.filter((track) => track.endOfTrackTicks !== 0);

return tracks[0];
};

export const blobToJs = (file: Blob) =>
  new Promise<Midi>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = reader.result as ArrayBuffer;
      const midi = new Midi(data);
      resolve(midi);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
