import React, { cloneElement, useContext } from "react";
import { ContextForMiniItem, ContextForMiniItemOrder } from "./context";

export default function Tail({ children }) {
  const { tailFocusItemInContent } = useContext(ContextForMiniItem);
  const orderI = useContext(ContextForMiniItemOrder);
  return cloneElement(children, { ref: e => tailFocusItemInContent.current[orderI] = e });
}