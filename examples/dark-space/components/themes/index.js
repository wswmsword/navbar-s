"use client"

import { ThemeContext } from "@/app/[[...lng]]/body"
import { useContext } from "react"
import styles from "./index.module.css";

export default function Themes() {
  const setT = useContext(ThemeContext);
  return <ul className={styles.ts}>
    <li><button className={styles.l} onClick={() => setT("light")}>light</button></li>
    <li><button className={styles.d} onClick={() => setT("")}>dark</button></li>
  </ul>
}