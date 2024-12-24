import React, { cloneElement, useContext } from "react";
import { ContextForMiniItem, ContextForMiniItemOrder } from "./context";

export default function Head({ children }) {
  const { headFocusItemInContent } = useContext(ContextForMiniItem)
  const orderI = useContext(ContextForMiniItemOrder);
  return cloneElement(children, { ref: e => headFocusItemInContent.current[orderI] = e });
}