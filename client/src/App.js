import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Signup from "./components/User/Signup"
import Login from "./components/User/Login"
import LoggedOn from "./components/User/LoggedOn"
import GetWeather from "./components/Weather/GetWeather"
import GetForecast from "./components/Weather/GetForecast"
import GardenPageRouter from "./components/IndividualGardens/GardenPageRouter"
import AuthenticationProvider from "./AuthenticationProvider"
import LogInOrOut from "./components/User/LogInOrOut"
import AdministratorOnly from "./components/User/AdministratorOnly"


function App() {
  return (
    <Router>
      <AuthenticationProvider>
        <div className="pageBody">
          <nav className="pageNavbar">
            <h1 style={{ color: "#5CDB95", padding: "0 10px" }}>Grow Calgary</h1>
            <ul style={{ display: "flex", justifyContent: "space-around", listStyle: "none", fontSize: "16px", paddingBottom: "5px", fontWeight: "bold" }}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/forecast">Current Weather and Forecast</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <LogInOrOut />
              </li>
              <li>
                <AdministratorOnly>
                  <Link to="/loggedon">Logged On</Link>
                </AdministratorOnly>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/loggedon">
              <LoggedOn />
            </Route>
            <Route path="/weather">
              <GetWeather />
            </Route>
            <Route path="/forecast">
              <GetWeather />
              <GetForecast />
            </Route>
            <Route path="/garden-page">
              <GardenPageRouter />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </AuthenticationProvider>
    </Router>
  )
}

export default App