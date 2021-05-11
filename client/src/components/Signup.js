import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="signupForm">
      <div className="container">
        <h1>Sign Up!</h1>
        <div className="form-control">
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            id="username"
            // autofocus
            // required
          />
          {/* <label id="usernameError"></label> */}
          {/* <label id="usernameSuccess"></label> */}
          <small>Error message</small>
        </div>
        <div className="form-control">
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            // required
          />
          {/* <label id="passwordError"></label> */}
          {/* <label id="passwordSuccess"></label> */}
          <small>Error message</small>
        </div>
        <div className="form-control">
          <label htmlFor="confirmPassword">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            // required
          />
          <small>Error message</small>
        </div>
        <div className="form-control">
          <label htmlFor="howLongGardening">
            <b>How long have you been gardening?</b>
          </label>
          <select name="howLongGardening" id="howLongGardening">
            <option value="lessThanOneYear">Less than 1 year</option>
            <option value="oneToFiveYears">1 to 5 years</option>
            <option value="moreThanFiveYears">More than 5 years</option>
          </select>
          <small>Error message</small>
        </div>
        <div className="form-control">
          <label htmlFor="currentPlants">
            <b>What plants are currently in your garden?</b>
          </label>
          <div className="currentPlantsSelection" id="currentPlantsSelection">
            <div>
              <input
                type="checkbox"
                name="plantCheckbox"
                id="peas"
                value="peas"
              />
              <label htmlFor="peas">peas</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="plantCheckbox"
                id="carrots"
                value="carrots"
              />
              <label htmlFor="carrots">carrots</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="plantCheckbox"
                id="zucchini"
                value="zucchini"
              />
              <label htmlFor="zucchini">zucchini</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="plantCheckbox"
                id="tomatoes"
                value="tomatoes"
              />
              <label htmlFor="tomatoes">tomatoes</label>
            </div>
          </div>
        </div>

        {/* Don't think we need this...
        <label>
          <input
            type="checkbox"
            checked="checked"
            id="rememberMe"
            name="rememberMe"
          />{" "}
          Remember me
        </label> */}
        <button onClick={submit}>Submit</button>
        <hr />
        <div>
          <label htmlFor="alreadyHaveAnAccount" id="alreadyHaveAnAccount">
            Already have an account?{" "}
            <span id="loginButton">
              <Link to="/loggedon">Log in.</Link>
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  async function submit() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let howLongGardening = document.getElementById("howLongGardening").value;
    let plantCheckbox = document.getElementsByName("plantCheckbox");
    let currentPlants = "";
    for (var i = 0, n = plantCheckbox.length; i < n; i++) {
      if (plantCheckbox[i].checked) {
        currentPlants += ", " + plantCheckbox[i].value;
      }
    }
    if (currentPlants) {
      currentPlants = currentPlants.substring(1);
    }
    // let rememberMe = document.getElementById("rememberMe").value;

    console.log("username:", username);
    console.log("password:", password);
    console.log("confirmPassword:", confirmPassword);
    console.log("howLongGardening:", howLongGardening);
    console.log("currentPlants:", currentPlants);
    // console.log("rememberMe:", rememberMe);

    let submissionData = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      plants: currentPlants,
    };

    let fetchUrl = "/signup";
    let fetchOptions = {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(submissionData),
    };

    let response = await fetch(fetchUrl, fetchOptions);
    let resObject = await response.json();
    console.log(resObject);

    if (resObject.success === false) {
      alert(resObject.message);
    } else {
      window.location = "/loggedon";
    }

    // // Show input error message
    // function showError(input, message) {
    //   const formControl = input.parentElement;
    //   formControl.className = "form-control error";
    //   const small = formControl.querySelector("small");
    //   small.innerText = message;
    // }

    // // Show success outline
    // function showSuccess(input) {
    //   const formControl = input.parentElement;
    //   formControl.className = "form-control success";
    // }

    // ERROR/SUCCESS OF NAME/PASSWORD
    // let nameErrorField = document.getElementById("usernameError");
    // let passErrorField = document.getElementById("passwordError");
    // let nameSuccessField = document.getElementById("usernameSuccess");

    // for (let field of [nameSuccessField, nameErrorField, passErrorField]) {
    //   field.innerText = "";
    // }

    // if (response.status === 400) {
    //   if (resObject.usernameError)
    //     nameErrorField.innerText = resObject.usernameError;

    //   if (resObject.passwordError)
    //     passErrorField.innerText = resObject.passwordError;
    // } else {
    //   nameSuccessField.innerText = resObject.successMessage;
    // }
  }
};

export default Signup;
