import "../../../src/App.css"
import "./about.css"
import Brady from "../../components/images/brady.jpg"
import Christy from "../../components/images/Christy.jpg"
import DonnaD from "../../components/images/DonnaD.jpg"
import Ben from "../../components/images/Ben.jpg"
import HTMLlogo from "../../components/images/html5-logo-31819.png"
import NodeLogo from "../../components/images/Node.js_logo.svg"
import ReactIcon from "../../components/images/React-icon.svg"
import Express from "../../components/images/express.png"
import OpenWeather from "../../components/images/OpenWeatherAPI.jpg"
import googlemap from "../../components/images/googlemap.png"
import Git from "../../components/images/git.svg"
import MongoDBicon from "../../components/images/mongoDBatlas.png"
import Mongoose from "../../components/images/mongoose.png"
import Passport from "../../components/images/passport.png"
import ClipboardJS from 'clipboard'


export default function About() {
  const clipboard = new ClipboardJS('.About-button')

  clipboard.on('success', (event) => {
    alert(`'${event.text}' has been copied to your clipboard.`)
    event.clearSelection()
    }
  )

  return (
    <div className="pageBackground">
      <div style={{height: '100%'}}>
        <div className="about-section">
          <h1>About Our Project</h1>
        </div>

        <div className="about-subsection">
          <h2 className="about-heading">The Team</h2>
          <div className="about-cards">
            <div className="about-column">
              <div className="card">
                <div
                  className="team-image"
                  style={{
                    backgroundImage: "url(" + Ben + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                  }}>
                  </div>
                <div className="groupmember-container">
                  <h2>Ben</h2>
                  <p>I spent the first five years of my working life as a performing musician in Toronto, Calgary, Montreal and Italy. This year I'm growing zuchini, lettuce, curly kale, wild arugula and potatoes. I'm very excited to be in the EvolveU progam at InceptionU, and creatively solving problems through software!</p>
                </div>
                <button 
                  className="About-button"
                  data-clipboard-text="ben.isenstein@gmail.com"
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="about-column">
              <div className="card">
                <div
                  className="team-image"
                  style={{
                    backgroundImage: "url(" + Brady + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                  }}>
                  </div>
                <div className="groupmember-container">
                  <h2>Brady</h2>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                </div>
                <button 
                  className="About-button"
                  data-clipboard-text="brady@example.com"
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="about-column">
              <div className="card">
                <div
                  className="team-image"
                  style={{
                    backgroundImage: "url(" + Christy + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                  }}>
                  </div>
                <div className="groupmember-container">
                  <h2>Christy</h2>
                  <p>I enjoy experimenting in the garden and often buy my groceries based on what I think can be regrown from seeds or cuttings. My favourite things to grow are carrots, tomatoes, and coding skills.</p>
                </div>
                <button 
                  className="About-button"
                  data-clipboard-text="christyclement001@gmail.com"
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="about-column">
              <div className="card">
                <div
                  className="team-image"
                  style={{
                    backgroundImage: "url(" + DonnaD + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                  }}>
                  </div>
                <div className="groupmember-container">
                  <h2>Donna</h2>
                  <p>
                    Beans, peas and pattypan squash are among my most succesful garden crops. Growing
                    my full-stack development skill-set.
                  </p>
                </div>
                <button 
                  className="About-button"
                  data-clipboard-text="dgswitzer@gmail.com"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="about-subsection">
          <h2 className="about-heading">The Problem</h2>
          <div className="row">
            <p>
              
              Grow Calgary began with four software developers-in-training who shared an interest in solving municipal problems. Passion for the outdoors led us to problems many people face in the world of gardening.
              <br />
              <br />
              For people just beginning their gardening journey, common barriers look like:
              <br />
              <ul>
                <li>
                  Not knowing where to start
                </li>
                <li>
                  Not knowing anyone who can provide mentorship
                </li>
                <li>
                  No access to garden equipment or funds
                </li>
                <li>
                  Fear of entering a new community and making friends
                </li>
              </ul>
              <br />
              <br />

              Experienced gardeners have their own host of problems:
              <ul>
                <li>
                  Desire to have a consistent high-quality harvest
                </li>
                <li>
                  No one to share their craft with
                </li>
                <li>
                  No one to take their gardening to the next level with
                </li>
              </ul>
              <br />
              <br />
              Garden organizers with an administrative role have the greatest challenges:
              <ul>
                <li>
                  No reliable way to communicate updates
                </li>
                <li>
                  Inundated with tasks
                </li>
                <li>
                  Members who often miss updates or neglect responsibilities
                </li>
                <li>
                  No way of tracking activities in the community and holding members accountable
                </li>
              </ul>
            </p>
          </div>
        </div>
        <div className="about-subsection">
          <h2 className="about-heading">The Solution</h2>
          <div className="row">
            <p>
            Through thoughtful problem-setting and collaboration, our team arrived at the solution: 
            <br />
            <br />
            Grow.
            <br />
            <br />
            Grow is a web application offering helpful and easy-to-use tools for gardening beginners, pros, and organizers alike. Users can add their community garden to the app, search for gardens in the city of Calgary, access weather, share best practices via message board, and more.
            <br />
            <br />
            Features:
            <ul>
              <li>
                Master list of every garden in our system including location, website and how to join
              </li>
              <li>
                Five-day weather forecast with temperature, wind, and precipitation
              </li>
              <li>
                User sign-up
              </li>
              <li>
                Ability to easily add your community garden
              </li>
              <li>
                Option to indicate wheelchair accessibility of your garden
              </li>
              <li>
                Home page for each garden including basic information, message board and todo list
              </li>
            </ul>
            <br />
            We're really proud of our product, and we had an incredible time building it together. We're confident you'll love it too. 
            <br />
            <br />
            The Grow Calgary Team 

            </p>
          </div>
        </div>
        <div className="about-subsection">
          <h2 className="about-heading">The Technologies</h2>
          <div class="logoColumn"> 
              <img src={ReactIcon} alt="React Logo"/>
              <img src={HTMLlogo} alt="HTML Logo" />  
              <img src={NodeLogo} alt="Node Logo"/>          
              <img src={Git} alt="Git Logo"/>
              <img src={Mongoose} alt="Mongoose Logo"/>         
              <img src={Passport} alt="Passport Logo"/>
              <img src={OpenWeather} alt="Open Weather API Logo"/>
              <img src={googlemap} alt="Google Map Logo"/>
              <img src={MongoDBicon} alt="MongoDB Logo"/>
              <img src={Express} alt="Express Logo"/>         
          </div>
        </div>
      </div>
    </div>
  )
}
