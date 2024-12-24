import React from "react";
import Items from "../items/slide-motion";
import MotionContentWrapper from "./wrapper/slide-motion";

export default function MotionContent({ children, xTrans, yTrans, trans, ...contentWrapperProps }) {

  return <MotionContentWrapper
    {...contentWrapperProps}>
      {transRunning => <Items transRunning={transRunning}>{children}</Items>}
  </MotionContentWrapper>;
}
