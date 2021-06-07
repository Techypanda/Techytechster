import { ReactNode } from "react";

export interface DefaultProps {
  className?: string;
  children?: ReactNode
}
export interface TypedProps extends DefaultProps {
  title: string;
}
export interface ScreenSize {
  width: number;
  height: number;
}