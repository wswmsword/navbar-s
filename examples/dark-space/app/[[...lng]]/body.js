"use client"

import { createContext, useLayoutEffect, useState } from "react";

export const ThemeContext = createContext();

export default function Body({ children }) {

  const [theme, setTm] = useState(null);

  useLayoutEffect(() => {
    // avoid reset theme when changing language
    setTm(document.body.classList.add(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  }, []);

  return <body className={theme}><ThemeContext.Provider value={setTm}>{children}</ThemeContext.Provider></body>;
}