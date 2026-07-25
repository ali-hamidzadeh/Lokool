"use client";

import { saveAs } from "file-saver";
import { useLocale } from "@/lib/i18n/localeContext";
import { formatBytes } from "@/lib/format";
import type { CompressedFileState } from "@/hooks/useImageCompressor";
import styles from "./ProcessingStatus.module.css";

interface ProcessingStatusProps {
  files: CompressedFileState[];
  onRemove: (id: string) => void;
}

export function ProcessingStatus({ files, onRemove }: ProcessingStatusProps) {
  const { t } = useLocale();

  if (files.length === 0) return null;

  return (
    <ul className={styles.list}>
      {files.map((file) => (
        <li key={file.id} className={styles.row}>
          <div className={styles.info}>
            <span className={styles.fileName}>{file.fileName}</span>

            {file.status === "processing" && (
              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-valuenow={file.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={styles.progressFill}
                  style={{ width: `${file.progress}%` }}
                />
              </div>
            )}

            {file.status === "done" && file.newSize !== undefined && (
              <div className={styles.sizeRow}>
                <span>
                  {t.compressImage.originalSize}:{" "}
                  {formatBytes(file.originalSize)}
                </span>
                <span>
                  {t.compressImage.newSize}: {formatBytes(file.newSize)}
                </span>
                <span className={styles.reduction}>
                  −{Math.round((1 - file.newSize / file.originalSize) * 100)}%
                </span>
              </div>
            )}

            {file.status === "error" && (
              <span className={styles.error}>{t.compressImage.error}</span>
            )}
          </div>

          <div className={styles.actions}>
            {file.status === "done" && file.blob && (
              <button
                className={styles.downloadButton}
                onClick={() => saveAs(file.blob as Blob, file.fileName)}
              >
                {t.compressImage.download}
              </button>
            )}
            <button
              className={styles.removeButton}
              onClick={() => onRemove(file.id)}
              aria-label={t.compressImage.removeFile}
            >
              ×
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
