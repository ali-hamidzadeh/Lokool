"use client";

import { useLocale } from "@/lib/i18n/localeContext";
import { useImageCompressor } from "@/hooks/useImageCompressor";
import { FileDropzone } from "@/components/FileDropzone";
import { ProcessingStatus } from "@/components/ProcessingStatus";
import { PrivacyBadge } from "@/components/PrivacyBadge";
import styles from "./page.module.css";

export default function CompressImagePage() {
  const { t } = useLocale();
  const { files, addFiles, removeFile } = useImageCompressor();

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t.compressImage.title}</h1>
        <p className={styles.description}>{t.compressImage.description}</p>
        <PrivacyBadge />
      </div>

      <FileDropzone onFilesAccepted={addFiles} />
      <ProcessingStatus files={files} onRemove={removeFile} />
    </main>
  );
}
