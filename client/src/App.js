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
  // const[user, setUser] = useState()
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     console.log("Logged on (line 21)")
  //     setUser(foundUser);
  //     fetch
  //   }
  // }, []);
  // if (user) {
  //   return <div>{user.name} is loggged in</div>;
  // } else
  return (
    <Router>
      <AuthenticationProvider>
        <div style={{ backgroundColor: "#8EE4AF" }}>
          <nav style={{ backgroundColor: "#05386B" }}>
            <h1 style={{ color: "#5CDB95" }}>Grow Calgary</h1>
            <ul style={{ display: "flex", justifyContent: "space-around", listStyle: "none" }}>
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
                {/* <Link to="/login">Log In</Link> */}
                <LogInOrOut />
              </li>
              <li>
                <AdministratorOnly>
                  <Link to="/loggedon">Logged On</Link>
                </AdministratorOnly>
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

// function About() {
//  return <h2>About</h2>
// }

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
