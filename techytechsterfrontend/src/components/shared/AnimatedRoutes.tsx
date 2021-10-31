import Landing from '../../pages/Landing';
import NotFound from '../../pages/NotFound';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import Resume from '../../pages/Resume';
import Projects from '../../pages/Projects';
import Blog from '../../pages/Blog';
import styled from 'styled-components';
import { DefaultProps } from '../../interface';
import { ShilohPlayer } from './SoundCloudPlayers';
export function AnimatedRoutes(props: DefaultProps) {
  const location = useLocation();
  return (
    <>
      <TransitionGroup className={props.className}>
        <CSSTransition
          timeout={300}
          classNames='fade'
          key={location.key}
        >
          <Switch location={location}>
            <Route exact path="/">
              <Landing className="abs" />
            </Route>
            <Route path="/projects">
              <Projects className="abs" />
            </Route>
            <Route exact path="/resume">
              <Resume />
            </Route>
            <Route path="/blog">
              <Blog className="abs" />
            </Route>
            <Route>
              <NotFound className="abs" />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <ShilohPlayer />
    </>
  )
}
export default styled(AnimatedRoutes)`
.abs {
  position: absolute;
}
`;