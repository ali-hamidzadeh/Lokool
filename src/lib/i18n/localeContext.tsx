"use client";

import fa from "./fa.json";
import en from "./en.json";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Locale = "fa" | "en";
type Dictionary = typeof fa;

const dictionaries: Record<Locale, Dictionary> = { fa, en };
const STORAGE_KEY = "lokool:locale";

interface LocaleContextValue {
  locale: Locale;
  dir: "rtl" | "ltr";
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): Locale {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "fa" || saved === "en" ? saved : "fa";
}

function getServerSnapshot(): Locale {
  return "fa";
}

function writeLocale(next: Locale) {
  window.localStorage.setItem(STORAGE_KEY, next);
  emitChange();
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const dir: "rtl" | "ltr" = locale === "fa" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const setLocale = (next: Locale) => writeLocale(next);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, dir, t: dictionaries[locale], setLocale }),
    [locale, dir],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
