"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/localeContext";
import { PrivacyBadge } from "@/components/PrivacyBadge";
import styles from "./page.module.css";

export default function Home() {
  const { t, locale, setLocale } = useLocale();

  return (
    <main className={styles.main}>
      <button
        className={styles.langSwitch}
        onClick={() => setLocale(locale === "fa" ? "en" : "fa")}
      >
        {locale === "fa" ? "English" : "فارسی"}
      </button>

      <div className={styles.hero}>
        <span className={styles.brand}>{t.brand}</span>
        <h1 className={styles.title}>{t.home.title}</h1>
        <p className={styles.subtitle}>{t.home.subtitle}</p>
        <PrivacyBadge />

        <Link href="/tools/compress-image" className={styles.cta}>
          {t.home.goToTool}
        </Link>
      </div>
    </main>
  );
}
