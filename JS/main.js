//Show Planet Info From Json
// let myRequest = new XMLHttpRequest();
// myRequest.open("GET", "../JSON/Planet.json");
// myRequest.send();
// console.log(myRequest);

// myRequest.onreadystatechange = function () {
//   if (this.readyState === 4 && this.status === 200) {
//     let jsData = JSON.parse(this.responseText);
//     console.log(jsData);
//     console.log(jsData.length);
//     console.log("jsData");

//     for (const element of jsData) {
//       console.log(element.name);
//       $(".mainDiv").append(`<p>${element.name}  =>  ${element.size}  </p>`);
//     }
//   }
// };

// fetch("../JSON/Planet.json")
//   .then((result) => {
//     let myData = result.json();
//     return myData;
//   })
//   .then((all) => {
//     console.log(all);
//     return all;
//   })
//   .then((jsData) => {
//     for (const element of jsData) {
//       console.log(element.name);
//       $(".mainDiv").append(`<p>${element.name}  =>  ${element.size}  </p>`);
//     }
//   });

// async function fetchData() {
//   console.log("Start Fetch");
//   try {
//     let myData = await fetch("../JSON/Planet.json");
//     // let myData = await fetch(
//     //   "https://gist.githubusercontent.com/ayoub198fillali/0455f7597ae08c6feae4eab28a257ca3/raw/planetN.json"
//     // );

//     let jsData = await myData.json();
//     console.log(jsData);

//     for (const element of jsData) {
//       console.log(element);

//       $(".mainDiv").append(`<p>${element.name}  =>  ${element.size}  </p>`);
//     }
//   } catch (reason) {
//     console.log(`Reason: ${reason}`);
//   } finally {
//     console.log("After Fetch");
//   }
// }
// fetchData();

// $(".planetButton").on("mouseenter ", function () {
//   console.log("free");
// });

$(".thePlanet").on("click", function () {
  console.log(this.id);
});

var touchtime = 0;
$(".planetButton").on("click", function () {
  if (touchtime == 0) {
    // set first click
    touchtime = new Date().getTime();
  } else {
    // compare first click to this click and see if they occurred within double click threshold
    if (new Date().getTime() - touchtime < 800) {
      // double click occurred
      thisId = this.id;
      changeBodyTo(thisId.split("_")[1]);
      console.log(thisId.split("_")[1]);

      touchtime = 0;
    } else {
      // not a double click so set as a new first click
      touchtime = new Date().getTime();
    }
  }
});

function changeBodyTo(name) {
  console.log(name);
  // .html()
}

// ///////////////////////////////////////////////////////
async function fetchData() {
  console.log("Start Fetch");
  try {
    let myData = await fetch("../JSON/Planet.json");

    let jsData = await myData.json();
    console.log(jsData);

    for (const element of jsData) {
      console.log("_____________");
      console.log(".cadre_" + element.Name.toLowerCase());

      myStrCode = `<div class="boxDict">`;
      for (let key in element) {
        console.log(key + "  =>   " + element[key]);

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

      // $(".mainDiv").append(`<p>${element.name}  =>  ${element.size}  </p>`);
    }
  } catch (reason) {
    console.log(`Reason: ${reason}`);
  } finally {
    console.log("After Fetch");
  }
}
fetchData();
