import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import "./App.css"
import GardenListAndForm from "./components/GardenListAndForm/GardenListAndForm"
import Signup from "./components/Signup/Signup"
import Login from "./components/LogIn/LogIn"
import LoggedOn from "./components/LoggedOn"
import GetWeather from "./components/Weather/GetWeather"
import GetForecast from "./components/Weather/GetForecast"
import GardenMap from "./components/gardenMap/GardenMapReact"
import TestComponent from "./components/formAutocomplete/NewReactAutoFill"
import GardenTable from "./components/DataTable/GardenTable"
import GardenPageRouter from "./components/IndividualGardens/GardenPageRouter"

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/weather">Weather</Link>
            </li>
            <li>
              <Link to="/gardens">Gardens</Link>
            </li>
            <li>
              <Link to="/garden-page/search">Search For A Garden</Link>
            </li>
            <li>
              <Link to="/forecast">Forecast</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
          <Route path="/gardens">
            <GardenListAndForm />
          </Route>
          <Route path="/gardenMap">
            <GardenMap />
          </Route>
          <Route path="/weather">
            <GetWeather weatherData="Weather Conditions" />
          </Route>
          <Route path="/forecast">
            <GetForecast forecastData="Forecast" />
          </Route>
          <Route path="/table">
            <GardenTable />
          </Route>
          <Route path="/garden-page">
            <GardenPageRouter />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

// function Users() {
//   return <Signup />
// }

export default App

// export default class App extends React.Component {
//   state = {
//     users: [],
//   };
//   componentDidMount() {
//     axios.get("/users.json").then((response) => {
//       this.setState({ users: response.data });
//     });
//   }

//   render() {
//     const { users } = this.state;
//     return (
//       <div>
//         <ul className="users">
//           {users.map((user) => (
//             <li className="user">
//               <p>
//                 <strong>Name:</strong> {user.name}
//               </p>
//               <p>
//                 <strong>Email:</strong> {user.email}
//               </p>
//               <p>
//                 <strong>City:</strong> {user.address.city}
//               </p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }
