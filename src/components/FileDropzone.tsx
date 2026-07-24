"use client";

import { useCallback } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { useLocale } from "@/lib/i18n/localeContext";
import styles from "./FileDropzone.module.css";

interface FileDropzoneProps {
  onFilesAccepted: (files: File[]) => void;
}

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

export function FileDropzone({ onFilesAccepted }: FileDropzoneProps) {
  const { t } = useLocale();

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      if (accepted.length > 0) {
        onFilesAccepted(accepted);
      }
      if (rejected.length > 0) {
        console.warn("Rejected files:", rejected);
      }
    },
    [onFilesAccepted],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxSize: MAX_FILE_SIZE_BYTES,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`${styles.dropzone} ${isDragActive ? styles.active : ""}`}
    >
      <input {...getInputProps()} aria-label={t.compressImage.dropzoneIdle} />

      <svg
        className={styles.icon}
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 16V4m0 0L7 9m5-5l5 5M5 20h14"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p className={styles.label}>
        {isDragActive
          ? t.compressImage.dropzoneActive
          : t.compressImage.dropzoneIdle}
      </p>
      <p className={styles.hint}>{t.compressImage.dropzoneHint}</p>
    </div>
  );
}
