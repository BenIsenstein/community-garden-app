import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import GardenListAndForm from "./components/GardenListAndForm/GardenListAndForm";
import Signup from "./components/Signup";
import LoggedOn from "./components/LoggedOn";
import GetWeather from "./components/GetWeather";

import GardenMap from "./components/gardenMap/GardenMapReact";

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
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/weather">Weather</Link>
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
          <Route path="/loggedon">
            <LoggedOn />
          </Route>
          <Route path="/gardenlistandform">
            <div className="App">
              <header className="App-header">
                <GardenListAndForm />
              </header>
            </div>
          </Route>
          <Route path='/gardenmapreact'>
            <GardenMap />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path = "/GetWeather">
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <Signup />;
}

function GetWeather() {
  return <weather />;
}


export default App;

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
