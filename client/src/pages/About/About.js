import "./about.css"

export default function About() {

 return (

<div>    
    <div class="about-section">
        <h1>About Us Page</h1>
        <p>Some text about who we are and what we do.</p>
        <p>Resize the browser window to see that this page is responsive by the way.</p>
    </div>
    
    <h2 >Our Team</h2>
    <div class="row">
        <div class="column">
            <div class="card">
            <img src="/images/team1.jpg" alt="Ben" />
            <div class="container">
                <h2>Ben</h2>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>ben@example.com</p>
                <p><button class="button">Contact</button></p>
            </div>
        </div>
    </div>

    <div class="column">
        <div class="card">
            <img src="/images/team2.jpg" alt="Brady" />
            <div class="container">
                <h2>Brady</h2>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>brady@example.com</p>
                <p><button class="button">Contact</button></p>
            </div>
        </div>
    </div>


    <div class="column">
        <div class="card">
            <img src="/images/team3.jpg" alt="Christy" />
            <div class="container">
                <h2>Christy</h2>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>christy@example.com</p>
                <p><button class="button">Contact</button></p>
            </div>
        </div>
    </div>

    <div class="column">
        <div class="card">
            <img src="images/squashes.jpg" alt="Donna" />
            <div class="container">
                <h2>Donna</h2>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>donna@example.com</p>
                <p><button class="button">Contact</button></p>
            </div>
        </div>
    </div>
</div>
</div>
 )
 }

