let loginSession = Cookies.get("log_session_id");
let noLogMessage = document.getElementById("noLogMessage");
let noLogin = document.getElementById("noLoginContainer");
let showMain = document.getElementById("showMain");
// this loop makes sure the user is logged in, otherwise it shows the noLogin div I have back at the home.html page
// I put some console logs in case anyone using this site is reading the log
if (loginSession) {
    console.log("Login Succesful");
    noLogMessage.innerText = "Login was succesful";
    noLogin.style.display = "none"
} else if (!loginSession) {
    console.log("unable to identify log_session_id");
    noLogMessage.innerText = "You are not logged in";
    showMain.style.display = "none"
    let backLog = document.getElementById("backToLog");
    backLog.addEventListener("click", function(eventdetails) {
        window.location = "../index.html";
    })
} else {
    console.log("wtf");
    // yes, I made this because something else might happen
}

