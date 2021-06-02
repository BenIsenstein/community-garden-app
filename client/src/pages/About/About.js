import "../../../src/App.css"
import "./about.css"
import Brady from "../../components/images/brady.jpg"
import Christy from "../../components/images/Christy.jpg"
import donna from "../../components/images/donna.jpg"
import Ben from "../../components/images/Ben.jpg"

export default function About() {
  return (
    <div className="pageBackground">
      <div>
        <div className="about-section">
          <h1>About Us Page</h1>
          <p>Some text about who we are and what we do.</p>
          <p>Resize the browser window to see that this page is responsive by the way.</p>
        </div>

        <div className="about-subsection">
          <h2 className="about-heading">The Team</h2>
          <div className="row">
            <div className="column">
              <div className="card">
                <div
                  className="team-image"
                  style={{
                    height: "275px",
                    backgroundImage: "url(" + Ben + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                  }}
                />
                <div className="container">
                  <h2>Ben</h2>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>ben@example.com</p>
                  <p>
                    <button className="About-button">Contact</button>
                  </p>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <div
                  className="team-image"
                  style={{
                    height: "275px",
                    backgroundImage: "url(" + Brady + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                  }}
                />
                <div className="container">
                  <h2>Brady</h2>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>brady@example.com</p>
                  <p>
                    <button className="About-button">Contact</button>
                  </p>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <div
                  className="team-image"
                  style={{
                    height: "275px",
                    backgroundImage: "url(" + Christy + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                  }}
                />
                <div className="container">
                  <h2>Christy</h2>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>christy@example.com</p>
                  <p>
                    <button className="About-button">Contact</button>
                  </p>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <div
                  className="team-image"
                  style={{
                    height: "275px",
                    backgroundImage: "url(" + donna + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                  }}
                />
                <div className="container">
                  <h2>Donna</h2>
                  <p>
                    Beans, peas and pattypan squash are among my most succesful garden crops. Growing
                    my full-stack development skill-set.
                  </p>
                  <p>donna@example.com</p>
                  <p>
                    <button className="About-button">Contact</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-subsection">
          <h2 className="about-heading">The Problem</h2>
          <div className="row">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ducimus, maxime adipisci iure itaque tenetur quam quas doloremque officia omnis enim sapiente animi est expedita. Ex molestiae at distinctio deserunt.
            </p>
          </div>
        </div>
        <div className="about-subsection">
          <h2 className="about-heading">The Solution</h2>
          <div className="row">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ducimus, maxime adipisci iure itaque tenetur quam quas doloremque officia omnis enim sapiente animi est expedita. Ex molestiae at distinctio deserunt.
            </p>
          </div>
        </div>
        <div className="about-subsection">
          <h2 className="about-heading">The Technologies</h2>
          <div className="row">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ducimus, maxime adipisci iure itaque tenetur quam quas doloremque officia omnis enim sapiente animi est expedita. Ex molestiae at distinctio deserunt.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
