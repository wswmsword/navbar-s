import React from "react";
import ContentWrapper from "./base";

export default function MotionContentWrapper({ children, ...props }) {

  function moveY(collapseOrTEnded, gap, dur) {
    return {
      display: "flex",
      alignItems: "flex-start",
      transform: collapseOrTEnded ? `translateY(calc(-100% - ${gap}px))` : `translateY(0)`,
      transition: `transform ${dur}s`,
    }
  }

  return <ContentWrapper
    style2={gap => ({
      clipPath: `inset(-${gap}px -100vw -100vw -100vw)`,
    })}
    innerStyle2={moveY}
    tp="transform"
    {...props}>
    {children}
  </ContentWrapper>
}