import React, { useState, useContext, useEffect, useRef } from "react";
import { ContextForMiniMenu } from "./context";

export default function Menu({ children, ...otherProps }) {

  const [h, setH] = useState(0);
  const { navRef, expanded, setE, btnsRef, openedMenuIdx,
    tailFocusItemInContent, headFocusItemInContent, menuId, menuRef, mockTailFocusByWrap, mockTail, mockHeadFocusByWrap, mockHead, } = useContext(ContextForMiniMenu);
  const [supportDvh, setDvh] = useState(false);

  useEffect(() => {
    setH(navRef.current.clientHeight);
    setDvh(supportsDynamicViewportHeight());
  }, []);

  const { style, ..._otherProps } = otherProps;

  if (!expanded) return null;

  return <div
    id={menuId}
    role="dialog"
    aria-modal
    aria-label="Menu"
    tabIndex={-1}
    ref={menuRef}
    style={{
      height: `calc(100${supportDvh ? "d" : ""}vh - ${h}px)`,
      position: "absolute",
      left: 0,
      top: "100%",
      width: "100%",
      ...style,
    }}
    onKeyDown={trapTab}
    {..._otherProps}>
    {children}
  </div>;

  function trapTab(e) {
    if (e.key === "Escape" || e.keyCode === 27)
      setE(false);
    else if (e.key === "Tab" || e.keyCode === 9) {

      const btnsCount = btnsRef.current.length;

      // 焦点矫正
      if (e.shiftKey && e.target === menuRef.current) {
        if (openedMenuIdx < 0) {
          btnsRef.current.slice(-1)[0].focus();
          e.preventDefault();
        } else {
          const tail = tailFocusItemInContent.current[openedMenuIdx];
          if (tail) {
            tail.focus();
            e.preventDefault();
          } else {
            mockTailFocusByWrap.current = true;
            mockTail.current.focus();
          }
        }
      }
      else if (!e.shiftKey && e.target === menuRef.current) {
        if (openedMenuIdx > -1) {
          const head = headFocusItemInContent.current[openedMenuIdx];
          if (head) {
            head.focus();
            e.preventDefault();
          } else {
            mockHeadFocusByWrap.current = true;
            mockHead.current.focus();
          }
        }
      }

      // 内容面板内的首尾聚焦
      else if (e.shiftKey && openedMenuIdx > -1 && e.target === headFocusItemInContent.current[openedMenuIdx]) {
        const tail = tailFocusItemInContent.current[openedMenuIdx] || menuRef.current;
        tail.focus();
        e.preventDefault();
      }
      else if (!e.shiftKey && openedMenuIdx > -1 && e.target === tailFocusItemInContent.current[openedMenuIdx]) {
        const head = headFocusItemInContent.current[openedMenuIdx] || menuRef.current;
        head.focus();
        e.preventDefault();
      }

      // 触发器的首尾聚焦
      else if (e.shiftKey && openedMenuIdx < 0 && e.target === btnsRef.current[0]) {
        btnsRef.current[btnsCount - 1].focus();
        e.preventDefault();
      }
      else if (!e.shiftKey && openedMenuIdx < 0 && e.target === btnsRef.current[btnsCount - 1]) {
        btnsRef.current[0].focus();
        e.preventDefault();
      }
    }
  }
}

function supportsDynamicViewportHeight() {
  const testElement = document.createElement('div');
  testElement.style.height = '1dvh';
  document.body.appendChild(testElement);

  // Check if the computed height is greater than 0
  const isSupported = testElement.clientHeight > 0;
  document.body.removeChild(testElement);

  return isSupported;
}