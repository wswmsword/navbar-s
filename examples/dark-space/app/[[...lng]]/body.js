"use client"

import { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function Body({ children }) {

  const [theme, setTm] = useState(null);

  return <body className={theme}><ThemeContext.Provider value={setTm}>{children}</ThemeContext.Provider></body>;
}