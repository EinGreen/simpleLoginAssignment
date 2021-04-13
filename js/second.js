let loginSession = Cookies.get("log_session_id");
let noLogMessage = document.getElementById("noLogMessage");
let noLogin = document.getElementById("noLoginContainer");
let showMain = document.getElementById("showMain");

function colorSuccess(res) {
    let colorData = res.data.data;
    console.log(colorData);
    // Note: "color" looks like a weird word to me... 
    let container = document.getElementById("colorContainer");
    for(let i=0; i<colorData.length; i++) {
        let daColor = colorData[i].color;
        let colorName = colorData[i].name;
        let colorYear = colorData[i].year;
        let colorId = colorData[i].id;

        container.innerHTML += `<div>
        <p>${colorName} ${colorYear}</p>
        <div id="displayColor${colorId}">${colorName}</div>
        </div>`;
        let displayColor = document.getElementById(`displayColor${colorId}`);
        displayColor.style.background = `${daColor}`;
    }
}
function colorFailure(err) {
    console.log(err);
}
function getColorThing(eventDetails) {
    axios.request({
        method: "GET",
        url: "https://reqres.in/api/unknown",
    }).then(colorSuccess).catch(colorFailure);
}

// this loop makes sure the user is logged in, otherwise it shows the noLogin div I have back at the home.html page
// I put some console logs in case anyone using this site is reading the log
if (loginSession) {
    console.log("Login Succesful");
    noLogMessage.innerText = "Login was succesful";
    noLogin.style.display = "none"
    getColorThing();
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

