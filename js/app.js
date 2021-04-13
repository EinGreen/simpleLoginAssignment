// this funciton allows the page to "turn", 
function changePage() {
    window.location = "pages/home.html";
}

function loginFailure(err) {
    // If all else fails, this message shows up
    let failMessage = document.getElementById("loginMessage");
    failMessage.innerText = "lol, sorry bro";
}
function loginSuccess(res) {
    // Create Cookie
    let tokenData = res.data.token;
    Cookies.set("log_session_id", tokenData);
    // Send Message
    let successMessage = document.getElementById("loginMessage");
    successMessage.innerText = "Success! Welcome";
    // Go to Other page
    setTimeout(changePage, 1800);
}
function loginUser(eventDetails) {
    document.getElementById("loginMessage").innerText = "Loading...";
    axios.request({
        method: "POST",
        url: "https://reqres.in/api/login",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            email: document.getElementById("emailInput").value,
            password: document.getElementById("passwordInput").value,
        },
    }).then(loginSuccess).catch(loginFailure);
}
// Gotta let the button work, so the event listener makes sure that the loginUser function actually does a thing when the button is click
let loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", loginUser);