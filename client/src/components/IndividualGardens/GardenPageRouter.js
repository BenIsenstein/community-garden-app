import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useRouteMatch
} from "react-router-dom";

import LandingPage from './LandingPage'


export default function GardenPageRouter() {
    let { path } = useRouteMatch()
    
    return (
      <Router>
        <Switch>
          <Route path={`${path}/:gardenName`}>
            <LandingPage />
          </Route>
          <Route exact path={path}>
            <Redirect exact from={path} to="/gardens" />
          </Route>
        </Switch>
      </Router>
    )
}