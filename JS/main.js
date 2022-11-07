/////////////////////////////////////////////////////////
//////////////////////Interactions///////////////////////
/////////////////////////////////////////////////////////
// Goto Planet Click From Planets
$(".thePlanet").on("click", function () {
  console.log(`From Planet`);
});

// Goto Planet Click From Titles
let touchtime = 0;
let first;
$(".planetButton").on("click", function () {
  if (touchtime == 0) {
    // set first click
    touchtime = new Date().getTime();
    first = this.innerHTML;
  } else {
    // compare first click to this click and see if they occurred within double click threshold
    if (new Date().getTime() - touchtime < 800 && first == this.innerHTML) {
      // double click occurred
      let thisName = this.innerHTML;
      changeBodyTo(thisName);
      touchtime = 0;
    } else {
      // not a double click so set as a new first click
      touchtime = new Date().getTime();
      first = this.innerHTML;
    }
  }
});

import { init, reloadPlanet, changeMp3 } from "./my3d.js";
$("#backButton").on("click", function () {
  $("#myPanet3d").remove();
  $(".planetsGrp :not([id = myPanet3d])").show();
  changeMp3(
    `https://github.com/ayoub198fillali/Planets/blob/master/MP3/intro.mp3?raw=true`
  );
});

/////////////////////////////////////////////////////////
////////////////////DATA FROM SERVER/////////////////////
/////////////////////////////////////////////////////////
// Get Data From Server
async function fetchData() {
  console.log("Start Fetch");
  try {
    // let myData = await fetch("../JSON/Planet.json");
    let myData = await fetch(
      "https://raw.githubusercontent.com/ayoub198fillali/Planets/master/JSON/Planet.json"
    );

    let jsData = await myData.json();

    for (const element of jsData) {
      let myStrCode = `<div class="boxDict">`;
      for (let key in element) {
        myStrCode += ` <label for="${
          element.Name.toLowerCase() + "_" + key
        }">${key}</label>
        <input type="text" name="${
          element.Name.toLowerCase() + "_" + key
        }" readonly value="${element[key]}" />
        `;
      }
      myStrCode += `</div>`;

      $("#cadre_" + element.Name.toLowerCase()).append(myStrCode);
    }
  } catch (reason) {
    console.log(`Reason: ${reason}`);
  } finally {
    console.log("After Fetch");
  }
}
fetchData();

/////////////////////////////////////////////////////////
///////////////////////////3D////////////////////////////
/////////////////////////////////////////////////////////

// Import My 3D

// GOTO Planet
function changeBodyTo(name) {
  console.log(`3D => ${name}`);
  if ($("#myPanet3d").length == 0) init(name);
  else reloadPlanet(name);
}
