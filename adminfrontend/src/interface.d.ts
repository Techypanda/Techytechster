export interface DefaultProps {
  className?: string;
}
export interface BlogNavProps extends DefaultProps {
  location: string;
}
export interface WindowsBtnProps extends DefaultProps {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseDown?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  px?: number;
  py?: number;
  variant?: "inherit" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline" | "srOnly";
  component?: React.ElementType<any>;
}
export interface WindowsStyleButtonProps extends DefaultProps {
  children: React.ReactNode;
  onClick: () => void;
  toggle: boolean;
  toggleVar?: boolean;
}