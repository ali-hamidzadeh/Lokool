"use client";

import { useLocale } from "@/lib/i18n/localeContext";
import {
  COMPRESSION_PRESETS,
  type CompressionMode,
} from "@/lib/compressionPresets";
import styles from "./CompressionModeSelector.module.css";

interface CompressionModeSelectorProps {
  mode: CompressionMode;
  onChange: (mode: CompressionMode) => void;
}

const MODES = Object.keys(COMPRESSION_PRESETS) as CompressionMode[];

export function CompressionModeSelector({
  mode,
  onChange,
}: CompressionModeSelectorProps) {
  const { t } = useLocale();

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{t.compressImage.presets.label}</span>
      <div
        className={styles.group}
        role="radiogroup"
        aria-label={t.compressImage.presets.label}
      >
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={mode === m}
            className={`${styles.option} ${mode === m ? styles.selected : ""}`}
            onClick={() => onChange(m)}
          >
            {t.compressImage.presets[m]}
          </button>
        ))}
      </div>
    </div>
  );
}
