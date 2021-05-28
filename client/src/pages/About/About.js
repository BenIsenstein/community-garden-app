import "./about.css"
import bean from "../../pages/images/bean.jpg"
import harvest from "../../pages/images/harvest.jpg"
import beanflower from "../../pages/images/beanflower.jpg"
import donna from "../../pages/images/donna.jpg"

export default function About() {

 return (

<div>    
    <div className="about-section">
        <h1>About Us Page</h1>
        <p>Some text about who we are and what we do.</p>
        <p>Resize the browser window to see that this page is responsive by the way.</p>
    </div>
    
    <h2 >Our Team</h2>
    <div class="row">
        <div class="column">
            <div class="card">
            <img src={bean} alt="Ben" width="200" height="275"/>
            <div class="container">
                <h2>Ben</h2>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>ben@example.com</p>
                <p><button className="About-button">Contact</button></p>
            </div>
        </div>
    </div>

    <div class="column">
        <div class="card">
            <img src={harvest} alt="Brady" width="200" height="275" />
            <div class="container">
                <h2>Brady</h2>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>brady@example.com</p>
                <p><button className="About-button">Contact</button></p>
            </div>
        </div>
    </div>


    <div class="column">
        <div class="card">
            <img src={beanflower} alt="Christy" width="200" height="275" />
            <div class="container">
                <h2>Christy</h2>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>christy@example.com</p>
                <p><button className="About-button">Contact</button></p>
            </div>
        </div>
    </div>

    <div class="column">
        <div class="card">
            <img src={donna} alt="Donna" width="200" height="275" />
            <div class="container">
                <h2>Donna</h2>
                <p>Beans, peas and pattypan squash are among my most succesful garden crops. Growing my full-stack development skill-set.</p>
                <p>donna@example.com</p>
                <p><button className="About-button">Contact</button></p>
            </div>
        </div>
    </div>
</div>
</div>
 )
 }

