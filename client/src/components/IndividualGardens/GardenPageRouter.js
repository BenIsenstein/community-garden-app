import { BrowserRouter as Router, Switch, Route, Redirect, useRouteMatch } from "react-router-dom"
import LandingPage from "./LandingPage"
import GardenSearchAutocomplete from "./GardenSearchAutocomplete"

export default function GardenPageRouter() {
  let { path } = useRouteMatch()

  return (
    <Router>
      <Switch>
        <Route path={`${path}/search`}>
          <GardenSearchAutocomplete />
        </Route>
        <Route path={`${path}/:gardenName`}>
          <LandingPage />
        </Route>
        <Route path={path} render={() => <Redirect to={`${path}/search`} />}></Route>
      </Switch>
    </Router>
  )
}
