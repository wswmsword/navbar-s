import React, { cloneElement, useEffect, useRef, forwardRef } from "react";
import { ContextForArrFocus } from "./context";

/** spatial navigation component */
export default forwardRef(function ArrowFocus({ children, ...otherProps }, ref) {
  const { onKeyDown, ..._otherProps } = otherProps;
  const items = useRef([]);
  const dirMap = useRef();

  useEffect(() => {
    const squares = items.current.map(e => {
      const t = e.getBoundingClientRect();
      const { x, y, width, height } = t;
      const halfW = width / 2;
      const halfH = height / 2;
      return [x + halfW, y + halfH, halfW, halfH, e];
    });
    dirMap.current = genDir(squares);
  }, []);

  const _onKeydown = e => {
    onKeyDown(e);
    const active = document.activeElement;
    const d = items.current[0];
    const target = dirMap.current.get(active) || { left: d, right: d, up: d, down: d };
    if (e.key === "ArrowRight" || e.keyCode === 39) focus(target.right);
    else if (e.key === "ArrowLeft" || e.keyCode === 37) focus(target.left);
    else if (e.key === "ArrowUp" || e.keyCode === 38) focus(target.up);
    else if (e.key === "ArrowDown" || e.keyCode === 40) focus(target.down);

    function focus(tar) {
      if (tar) {
        tar.focus();
        e.preventDefault();
      }
    }
  }
  return <ContextForArrFocus.Provider value={items}>
    {cloneElement(children, { onKeyDown: _onKeydown, ref, ..._otherProps })}
  </ContextForArrFocus.Provider>;
});


function genDir(squares) {
  const sortedX = [...squares];
  sortedX.sort((s1, s2) => s1[0] - s2[0]);
  const sortedY = [...squares];
  sortedY.sort((s1, s2) => s1[1] - s2[1]);
  const dirMap = new Map();
  squares.forEach((s, i) => {
    const [x, y, t1, t2, e] = s;

    const sOrderY = sortedY.findIndex(e => e === s);
    const sOrderX = sortedX.findIndex(e => e === s);
    // next down element
    let minDownDis = Infinity;
    let downS = null;
    sortedY.slice(sOrderY + 1).forEach(s2 => {
      const [x2, y2, t1a, t2a, e2] = s2;
      let dis = Infinity;
      if (y + t2 <= y2 - t2a) { // is below
        if (x2 - t1a >= x + t1) { // is right corner

          if (x2 - t1a - x - t1 < y2 - t2a - y - t2) {

            dis = getDistance(x + t1, y + t2, x2 - t1a, y2 - t2a);
          }
        } else if (x2 + t1a <= x - t1) { // is left corner

          if (x - t1 - x2 - t1a < y2 - t2a - y - t2) {
            dis = getDistance(x + t1, y + t2, x2 + t1a, y2 - t2a);
          }
        } else { // is project
          dis = Math.pow(y2 - t2a - y - t2, 2);
        }
      }

      if (dis < minDownDis) {
        downS = e2;
        minDownDis = dis;
      }
    });

    // next up element
    let minUpDis = Infinity;
    let upS = null;
    sortedY.slice(0, sOrderY).forEach(s2 => {
      const [x2, y2, t1a, t2a, e2] = s2;
      let dis = Infinity;
      if (y - t2 >= y2 + t2a) { // is above
        if (x2 - t1a >= x + t1) { // is right corner
          if (x2 - t1a - x - t1 < y - t2 - y2 - t2a) {
            dis = getDistance(x + t1, y - t2, x2 - t1a, y2 + t2a);
          }
        } else if (x2 + t1a <= x - t1) { // is left corner
          if (x - t1 - x2 - t1a < y - t2 - y2 - t2a) {
            dis = getDistance(x - t1, y - t2, x2 + t1a, y2 + t2a);
          }
        } else { // is project
          dis = Math.pow(y - t2 - y2 - t2a, 2);
        }
      }

      if (dis < minUpDis) {
        upS = e2;
        minUpDis = dis;
      }
    });

    // next left element
    let minLDis = Infinity;
    let lS = null;
    sortedX.slice(0, sOrderX).forEach(s2 => {
      const [x2, y2, t1a, t2a, e2] = s2;
      let dis = Infinity;
      if (x - t1 >= x2 + t1a) { // is left
        if (y2 + t2a <= y - t2) { // is top corner
          if (y - t2 - y2 - t2a < x - t1 - x2 - t1a) { // closer x
            dis = getDistance(x - t1, y - t2, x2 + t1a, y2 + t2a);
          }
        } else if (y2 - t2a >= y + t2) { // is bottom corder
          if (y2 - t2a - y - t2 < x - t1 - x2 - t1a) { // closer x
            dis = getDistance(x - t1, y + t2, x2 + t1a, y2 - t2a);
          }
        } else { // is project
          dis = Math.pow(x - t1 - x2 - t1a, 2);
        }
      }

      if (dis < minLDis) {
        lS = e2;
        minLDis = dis;
      }
    })

    // next right element
    let minRDis = Infinity;
    let rS = null;
    sortedX.slice(sOrderX + 1).forEach(s2 => {
      const [x2, y2, t1a, t2a, e2] = s2;
      let dis = Infinity;
      if (x2 - t1a >= x + t1) { // is right
        if (y2 + t2a <= y - t2) { // is top corner
          if (y - t2 - y2 - t2a < x2 - t1a - x - t1) { // closer x
            dis = getDistance(x + t1, y - t2, x2 - t1a, y2 + t2a);
          }
        } else if (y2 - t2a >= y + t2) { // is bottom corder
          if (y2 - t2a - y - t2 < x2 - t1a - x - t1) {
            dis = getDistance(x + t1, y + t2, x2 - t1a, y2 - t2a);
          }
        } else {
          dis = Math.pow(x2 - t1a - x - t1, 2);
        }
      }

      if (dis < minRDis) {
        rS = e2;
        minRDis = dis;
      }
    });

    dirMap.set(e, {
      up: upS,
      down: downS,
      left: lS,
      right: rS,
    });
  });

  return dirMap;
}

function getDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy; // without sqrt
}