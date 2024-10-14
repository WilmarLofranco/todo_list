import {projects, Project, Task} from "./appLogic.js";

const modal = document.getElementById("myModal");
const btn = document.querySelector("#addProj");
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

    
    let newProject = new Project (projTitle);
    
    const titleBar = document.querySelector(".main > div");
    titleBar.innerHTML = `<div>Project: ${projTitle}</div><div class="buttons"><button id="edit">Edit</button><button id="delete">Delete</button></div>`;

    const projectList = document.querySelector(".projectList");
    projectList.innerHTML += `<button>
            <p>${projTitle}</p>
        </button>`;

    document.getElementById("myForm").reset();
    modal.style.display = "none";

    console.log(projects);
}
