import { Midi } from "@tonejs/midi";

export const midiToBlob = async (src: string): Promise<Midi> => {
  const blob = await fetch(src).then((res) => res.blob());

  return blobToJs(blob);
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
