"use strict";
//Don't work on mozilla
// import datas from "./data.json" assert { type: "json" };

fetch("./data.json")
  .then((response) => response.json())
  .then((json) => {
    const datas = json;

    const headings = document.querySelectorAll(".heading");
    const btns = document.querySelector(".user-data--periods");
    const hours = document.querySelectorAll(".hours");
    const previousHours = document.querySelectorAll(".hours--prev");

    //Initialisation
    displayHours("weekly");
    document.querySelector(".user-data--weekly").style.color = "#fff";

    //Display titles
    headings.forEach((heading) => {
      for (let data of datas) {
        if (data.title.toLowerCase() === heading.dataset.title)
          heading.textContent = data.title;
      }
    });

    btns.addEventListener("click", (e) => {
      const clicked = e.target;

      if (clicked.classList.contains("user-data--periods")) return;

      const siblings = clicked
        .closest(".user-data--periods")
        .querySelectorAll(".user-data--period");

      //Change color
      siblings.forEach((sibling) => {
        if (sibling !== clicked) sibling.style.color = "hsl(236, 100%, 87%)";
        else if (sibling === clicked) sibling.style.color = "#fff";
      });

      //Display hours
      if (clicked.classList.contains("user-data--daily")) {
        displayHours(clicked.dataset.period);
      } else if (clicked.classList.contains("user-data--weekly")) {
        displayHours(clicked.dataset.period);
      } else if (clicked.classList.contains("user-data--monthly")) {
        displayHours(clicked.dataset.period);
      }
    });

    //Functions
    function unit(num) {
      return num === 1 ? "hr" : "hrs";
    }
    function displayHours(period) {
      hours.forEach((_, i, arr) => {
        arr[i].textContent = `${datas[i].timeframes[period].current} ${unit(
          datas[i].timeframes[period].current
        )}`;
      });
      previousHours.forEach((_, i, arr) => {
        arr[i].textContent = `Last month ${
          datas[i].timeframes[period].previous
        } ${unit(datas[i].timeframes[period].previous)}`;
      });
    }
  });
