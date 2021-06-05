import Landing from '../../pages/Landing';
import NotFound from '../../pages/NotFound';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";
export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition
        timeout={300}
        classNames='fade'
        key={location.key}
      >
        <Switch location={location}>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}