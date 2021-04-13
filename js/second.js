// gobal scope variables because I was lazy. Don't @ me
let loginSession = Cookies.get("log_session_id");
let noLogMessage = document.getElementById("noLogMessage");
let noLogin = document.getElementById("noLoginContainer");
let showMain = document.getElementById("showMain");

// These functions allow the page to display a color, but it can only happen if the user is "logged in"
function colorSuccess(res) {
    let colorData = res.data.data;
    // Had to put data twice because there was an array named Data within the response's data. Don't ask me, I have no clue why
    // Note: "color" looks like a weird word to me... 
    let container = document.getElementById("colorContainer");
    for(let i=0; i<colorData.length; i++) {
        // These variables allow me to target a specific part of the color's data
        let daColor = colorData[i].color;
        let colorName = colorData[i].name;
        let colorYear = colorData[i].year;
        let colorId = colorData[i].id;

        // thanks to the container variable, I can use it to add html on the page
        // using the color variables above, I can inject the given data onto the page physically
        container.innerHTML += `<div>
        <p>${colorName} ${colorYear}</p>
        <div id="displayColor${colorId}">${colorName}</div>
        </div>`;
        // Note: I may have gotten confused where which name was pointing to which color, so I just put the name in the color div
        // all that was left was to change the colors of the divs to their respectice names
        let displayColor = document.getElementById(`displayColor${colorId}`);
        displayColor.style.background = `${daColor}`;
    }
}
function colorFailure(err) {
    console.log(err);
    // as of 04/12/2021, I still don't know what to put here
}
function getColorThing(eventDetails) {
    axios.request({
        method: "GET",
        url: "https://reqres.in/api/unknown",
        // can't put the data in without getting the data. This url allows the success function to work!
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
    showMain.style.display = "none";
    // the block of code bellow allows the user to go back to the login page if they haven't logged in yet [or if they delete their cookie for "science"]
    let backLog = document.getElementById("backToLog");
    backLog.addEventListener("click", function(eventdetails) {
        window.location = "../index.html";
    });
    // I put a function within this loop to test it out, it works
} else {
    console.log("wtf");
    // yes, I made this because something else might happen
}

