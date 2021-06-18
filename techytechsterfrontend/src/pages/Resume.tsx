import styled from "styled-components";
import { DefaultProps } from "../interface";
import { useViewport } from "../components/shared/ViewportProvider";
import ResumeDesktopView from "../components/resume/ResumeDesktopView";
import ResumeTabletView from "../components/resume/ResumeTabletView";
import ResumeMobileView from "../components/resume/ResumeMobileView";
function Resume(props: DefaultProps) {
  const TabletBreakpoint = 1100;
  const MobileBreakpoint = 650;
  const { width } = useViewport();
  if (width > TabletBreakpoint) {
    return <ResumeDesktopView className={props.className} />
  } else if (width > MobileBreakpoint) {
    return <ResumeTabletView className={props.className} />
  } else {
    return <ResumeMobileView className={props.className} />
  }
}

export default styled(Resume)`
`;