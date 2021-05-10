import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import SuperheroesTable from "./components/SuperheroesTable";
import Signup from "./components/Signup";
import LoggedOn from "./components/LoggedOn";

// const App = () => {
//   return (
//     <div>
//       <div className="title-bar">
//         <h1>Superhero Registry</h1>
//       </div>
//       {/* <SuperheroesTable /> */}
//       <Signup />
//     </div>
//   );
// };

const App = () => {
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <Signup />;
}

export default App;
