import React, { cloneElement, useContext } from "react";
import { ContextForItem, ContextForItemOrder } from "./context";

export default function Tail({ children }) {
  const { tailFocusItemInContent } = useContext(ContextForItem);
  const orderI = useContext(ContextForItemOrder);
  return tailFocusItemInContent == null ? children : cloneElement(children, { ref: e => tailFocusItemInContent.current[orderI] = e });
}