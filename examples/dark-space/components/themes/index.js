"use client"

import { ThemeContext } from "@/app/[[...lng]]/body"
import { useContext, useLayoutEffect } from "react"
import styles from "./index.module.css";

export default function Themes() {
  const setT = useContext(ThemeContext);

  useLayoutEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeQuery.addEventListener("change", e => {
      setT(e.matches ? "dark" : "light");
    });
  }, []);

  return <ul className={styles.ts}>
    <li className={styles.ll}><button className={styles.l} onClick={() => setT("light")}>Use Light Mode</button></li>
    <li className={styles.ld}><button className={styles.d} onClick={() => setT("dark")}>Use Dark Mode</button></li>
  </ul>;
}