import { DefaultProps } from "../interface";
import styled from 'styled-components';
import { useViewport } from "../components/shared/ViewportProvider";
import DesktopView from "../components/landing/LandingDesktopView";
import LandingTabletView from "../components/landing/LandingTabletView";
import LandingMobileView from "../components/landing/LandingMobileView";

function Landing(props: DefaultProps) {
  const TabletBreakpoint = 1100;
  const MobileBreakpoint = 650;
  const { width } = useViewport();
  if (width > TabletBreakpoint) {
    return <DesktopView className={props.className} />
  } else if (width > MobileBreakpoint) {
    return  <LandingTabletView className={props.className} />
  } else {
    return <LandingMobileView className={props.className} />
  }
}
export default styled(Landing)`
`;