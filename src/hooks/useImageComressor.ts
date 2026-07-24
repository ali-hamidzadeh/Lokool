"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CompressRequest,
  CompressResponse,
} from "@/lib/workers/image-compress.worker";

export interface CompressedFileState {
  id: string;
  fileName: string;
  status: "processing" | "done" | "error";
  progress: number;
  originalSize: number;
  newSize?: number;
  blob?: Blob;
  errorMessage?: string;
}

const MAX_SIZE_MB = 1.5;
const MAX_DIMENSION = 2000;

export function useImageCompressor() {
  const [files, setFiles] = useState<CompressedFileState[]>([]);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../lib/workers/image-compress.worker.ts", import.meta.url),
    );

    workerRef.current.onmessage = (event: MessageEvent<CompressResponse>) => {
      const msg = event.data;
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== msg.id) return f;
          if (msg.type === "progress") return { ...f, progress: msg.progress };
          if (msg.type === "done")
            return {
              ...f,
              status: "done",
              progress: 100,
              newSize: msg.newSize,
              blob: msg.blob,
            };
          if (msg.type === "error")
            return { ...f, status: "error", errorMessage: msg.message };
          return f;
        }),
      );
    };

    return () => workerRef.current?.terminate();
  }, []);

  const addFiles = useCallback((incoming: File[]) => {
    const newEntries: CompressedFileState[] = incoming.map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      fileName: file.name,
      status: "processing",
      progress: 0,
      originalSize: file.size,
    }));

    setFiles((prev) => [...prev, ...newEntries]);

    incoming.forEach((file, i) => {
      const request: CompressRequest = {
        type: "compress",
        id: newEntries[i].id,
        file,
        maxSizeMB: MAX_SIZE_MB,
        maxWidthOrHeight: MAX_DIMENSION,
      };
      workerRef.current?.postMessage(request);
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return { files, addFiles, removeFile };
}
