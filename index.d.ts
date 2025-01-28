import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";

declare module "hanav" {

  export interface NavBarProps extends HTMLAttributes<HTMLElement> {
    dur?: number;
    gap?: number;
    dynamicWidth?: boolean;
    onlyKeyFocus?: boolean;
    close?: boolean | number;
  }

  export const NavBar: React.FC<NavBarProps>;

  export type Trans = {
    [K in keyof React.CSSProperties]?: React.CSSProperties[K][] | React.CSSProperties[K];
  };

  export interface ContentProps extends HTMLAttributes<HTMLDivElement> {
    outer?: HTMLAttributes<HTMLDivElement>;
    onExpanding?: () => void;
    onExpanded?: () => void;
    onCollapsing?: () => void;
    onCollapsed?: () => void;

    trans?: Trans;
    xTrans?: Trans;
    yTrans?: Trans;
  }

  export const Content: React.FC<ContentProps>

  export const Trigger: React.FC<HTMLAttributes<HTMLDivElement>>;

  export const CustomXMotionContent: React.FC<ContentProps>;

  export const CustomYMotionContent: React.FC<ContentProps>;

  export const CustomMotionContent: React.FC<ContentProps>;

  export const ReducedMotionContent: React.FC<ContentProps>;

  export const Group: React.FC<HTMLAttributes<HTMLDivElement>>;

  export const MiniNavBar: React.FC<HTMLAttributes<HTMLElement>>;

  export const MiniMenu: React.FC<HTMLAttributes<HTMLDivElement>>;

  export const MiniTrigger: React.FC<HTMLAttributes<HTMLDivElement>>;

  export const MiniContent: React.FC<HTMLAttributes<HTMLDivElement>>;

  export const MiniToggle: React.FC<ButtonHTMLAttributes<HTMLButtonElement>>;

  export const MiniBack: React.FC<ButtonHTMLAttributes<HTMLButtonElement>>;
}