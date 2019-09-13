 let rejser;
 let filter = "alle";

 document.addEventListener("DOMContentLoaded", getJson);

 async function getJson() {
     let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/10-V6mdF7edqkvZKgdKcaGvsdOC_mudHxh8SOal_2iEs/od6/public/values?alt=json");
     console.log("jsonData", jsonData);
     rejser = await jsonData.json();
     start();
     addEventListenerToButtons();
 }

 function start() {
     const dest = document.querySelector("#liste");
     const temp = document.querySelector("template");
     dest.innerHTML = "";

     rejser.feed.entry.forEach((rejse) => {
         if (filter == "alle" || filter == rejse.gsx$verdensdel.$t) {
             const klon = temp.cloneNode(true).content;

             klon.querySelector("img").src = `imgs/${rejse.gsx$billede.$t}.jpg`;
             klon.querySelector("h2").textContent = rejse.gsx$navn.$t;
             dest.appendChild(klon);
             dest.lastElementChild.addEventListener("click", () => {
                 location.href = `singleView.html?navn=${rejse.gsx$navn.$t}`;
             });
         }
     })
 }


 function addEventListenerToButtons() {
     document.querySelectorAll(".filter").forEach(elm => {
         elm.addEventListener("click", filtrering);
     })
 }

 function filtrering() {
     filter = this.dataset.kat;
     document.querySelectorAll(".filter").forEach(elm => {
         elm.classList.remove("nu");

     })
     this.classList.add("nu");
     start();
 }
