import React from "react";
import ContentWrapper from "./base";

export default function CustomMotionContentWrapper({ children, trans = {}, className = "", ...props }) {

  const { className: cnByTrans = "", transition, ...otherTrans } = trans;
  const _className = className.concat(" ", cnByTrans);

  function moveY(collapseOrTEnded, _, dur) {
    const [start, end, stringProps] = Object.keys(otherTrans).reduce((acc, cur) => {
      if (typeof trans[cur] === "string") {
        return [acc[0], acc[1], {
          ...acc[2],
          [cur]: otherTrans[cur],
        }]
      }
      return [{
        ...acc[0],
        [cur]: trans[cur][0]
      }, {
        ...acc[1],
        [cur]: trans[cur][1]
      }, acc[2]];
    }, [{}, {}, {}]);
    const style = collapseOrTEnded ? start : end;
    const hasTransition = transition !== false;
    return {
      ...style,
      ...stringProps,
      transition: hasTransition ? (() => {
        if (transition == null) {
          const tProps = Object.keys(otherTrans || {}).filter(p => Array.isArray(otherTrans[p]));
          return tProps.map(p => `${p} ${dur}s`).join();
        }
        return transition;
      })() : null,
      display: "flex",
      alignItems: "flex-start",
    };
  }

  return <ContentWrapper
    innerStyle2={moveY}
    className={_className}
    tp={Object.keys(otherTrans).find(p => Array.isArray(otherTrans[p]))}
    {...props}>
    {children}
  </ContentWrapper>
}