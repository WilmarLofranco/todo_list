import {projects, Project, Task} from "./appLogic.js";

const modal = document.getElementById("myModal");
const btn = document.querySelector(".sidebar > button");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}





document.getElementById("myForm").onsubmit = function (event) {
    event.preventDefault();
    const projTitle = document.getElementById("projTitle").value;
    const projectTitle = document.querySelector(".main > div > h2");
    const newProject = new Project (projTitle);
    projectTitle.textContent = `Project: ${projTitle}`;
    document.getElementById("myForm").reset();
    modal.style.display = "none";
}
