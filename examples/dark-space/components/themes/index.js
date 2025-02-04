"use client"

import { ThemeContext } from "@/app/[[...lng]]/body"
import { useContext, useLayoutEffect } from "react"
import styles from "./index.module.css";
import { useTranslation } from "@/i18n/client";

export default function Themes({ lng }) {
  const setT = useContext(ThemeContext);
  const { t } = useTranslation(lng);

  useLayoutEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeQuery.addEventListener("change", e => {
      setT(e.matches ? "dark" : "light");
    });
  }, []);

  return <ul className={styles.ts}>
    <li className={styles.ll}><button className={styles.l} onClick={() => setT("light")}>{t("light")}</button></li>
    <li className={styles.ld}><button className={styles.d} onClick={() => setT("dark")}>{t("dark")}</button></li>
  </ul>;
}