import React, { cloneElement, useContext, useRef } from "react";
import { ContextForArrFocus } from "./context";

export default function ArrowFocusItem({ children }) {
  const fItems = useContext(ContextForArrFocus);
  const fItem = useRef();
  return cloneElement(children, {
    ref(e) {
      if (e) {
        fItem.current = e;
        if (!fItems.current.includes(e))
          fItems.current.push(e);
      } else {
        fItems.current = fItems.current.filter(e => e !== fItem.current);
      }
    }
  });
}