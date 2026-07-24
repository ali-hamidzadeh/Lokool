"use client";

import { useLocale } from "@/lib/i18n/localeContext";
import styles from "./PrivacyBadge.module.css";

export function PrivacyBadge() {
  const { t } = useLocale();

  return (
    <div className={styles.badge} role="status">
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{t.privacy.badge}</span>
      <span className={styles.detail}>{t.privacy.detail}</span>
    </div>
  );
}
