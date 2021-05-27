import { BrowserRouter as Router, Switch, Route, Redirect, useRouteMatch } from "react-router-dom"
import EditGardenPage from "../../pages/EditGardenPage/EditGardenPage"
import LandingPage from "../../pages/LandingPage/LandingPage"

export default function GardenPageRouter() {
  let { path } = useRouteMatch()

  return (
    <Router>
      <Switch>
        <Route path={`${path}/:gardenName/edit`}>
          <EditGardenPage />
        </Route>
        <Route path={`${path}/:gardenName`}>
          <LandingPage />
        </Route>
        <Route 
          path={path} render={() => <Redirect to={'/'} />}
        > 
        </Route>
      </Switch>
    </Router>
  )
}
