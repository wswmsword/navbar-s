import React, { cloneElement, useContext } from "react";
import { ContextForItem, ContextForItemOrder } from "./context";

export default function Head({ children }) {
  const { headFocusItemInContent } = useContext(ContextForItem);
  const orderI = useContext(ContextForItemOrder);
  return headFocusItemInContent == null ? children : cloneElement(children, { ref: e => headFocusItemInContent.current[orderI] = e });
}