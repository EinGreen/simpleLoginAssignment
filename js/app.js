function changePage() {
    window.location = "pages/home.html";
}

function loginFailure(err) {
    // Message
    let failMessage = document.getElementById("loginMessage");
    failMessage.innerText = "lol, sorry bro";
}
function loginSuccess(res) {
    // Cookie
    let tokenData = res.data.token;
    Cookies.set("log_seesion_id", tokenData);
    // Message
    let successMessage = document.getElementById("loginMessage");
    successMessage.innerText = "Success! Welcome";
    // Go to Other page
    setTimeout(changePage, 2000);
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

let loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", loginUser);