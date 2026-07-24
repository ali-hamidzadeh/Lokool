
import imageCompression from "browser-image-compression";

export interface CompressRequest {
  type: "compress";
  id: string;
  file: File;
  maxSizeMB: number;
  maxWidthOrHeight: number;
}

export type CompressResponse =
  | { type: "progress"; id: string; progress: number }
  | {
      type: "done";
      id: string;
      blob: Blob;
      originalSize: number;
      newSize: number;
      fileName: string;
    }
  | { type: "error"; id: string; message: string };

self.onmessage = async (event: MessageEvent<CompressRequest>) => {
  const { type, id, file, maxSizeMB, maxWidthOrHeight } = event.data;
  if (type !== "compress") return;

  try {
    const originalSize = file.size;

    const compressedBlob = await imageCompression(file, {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker: false, 
      onProgress: (progress: number) => {
        const message: CompressResponse = { type: "progress", id, progress };
        self.postMessage(message);
      },
    });

    const response: CompressResponse = {
      type: "done",
      id,
      blob: compressedBlob,
      originalSize,
      newSize: compressedBlob.size,
      fileName: file.name,
    };
    self.postMessage(response);
  } catch (err) {
    const response: CompressResponse = {
      type: "error",
      id,
      message: err instanceof Error ? err.message : "Unknown error",
    };
    self.postMessage(response);
  }
};

export {};