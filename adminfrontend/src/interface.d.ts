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
  mr?: number;
  variant?: "inherit" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline" | "srOnly";
  component?: React.ElementType<any>;
}
export interface CreateProps extends DefaultProps {
  update?: boolean;
  oldtitle?: string;
  oldcontent?: string;
  oldauthor?: string;
}
export interface Page {
  pageNo: number;
  pageKey: string | undefined;
}
export interface Blog {
  BlogTitle: string;
  Content: string;
  Date: string;
  Author: string;
}
export interface BlogPrviewProps extends DefaultProps {
  blog: Blog
}
export interface BlogListProps extends DefaultProps {
  Posts: Blog[]
}
export interface BlogPageNavProps extends DefaultProps {
  pageCount: number;
  nextPage: () => void;
  prevPage: () => void;
}
export interface WindowsStyleButtonProps extends DefaultProps {
  children: React.ReactNode;
  onClick: () => void;
  toggle: boolean;
  toggleVar?: boolean;
}
export interface WindowsRichTextProps extends DefaultProps {
  onChange: (content: string) => void;
  initialState?: string;
}
export interface WindowsRichPreviewProps extends DefaultProps {
  initialState: string;
}
export interface BlogDeletePromptProps extends DefaultProps {
  open: boolean;
  blogTitle: string;
  setOpen: (boolean) => void;
}