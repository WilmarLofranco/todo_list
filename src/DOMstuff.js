import { projects, Project, Task } from "./appLogic.js";

// Modal Handling
const modal = document.getElementById("myModal");
const taskModal = document.querySelector(".taskModal");

const openModal = (modal) => (modal.style.display = "block");
const closeModal = (modal) => (modal.style.display = "none");

// Open Add Project Modal
document.querySelector("#addProj").onclick = () => openModal(modal);

// Close Modals
modal.querySelector(".close").onclick = () => closeModal(modal);
taskModal.querySelector(".taskClose").onclick = () => closeModal(taskModal);
window.onclick = (event) => {
    if (event.target === modal) closeModal(modal);
    if (event.target === taskModal) closeModal(taskModal);
};

// Add New Project
document.getElementById("myForm").onsubmit = function (event) {
    event.preventDefault();
    const projTitle = document.getElementById("projTitle").value;

    if (!projTitle.trim()) return alert("Project title cannot be empty!");

    const newProject = new Project(projTitle);
    projects.push(newProject);

    // Update Sidebar
    const projectList = document.querySelector(".projectList");
    projectList.innerHTML += `<button class="project-btn" data-title="${projTitle}">${projTitle}</button>`;

    document.getElementById("myForm").reset();
    closeModal(modal);
};

// Add New Task
document.getElementById("taskForm").onsubmit = function (event) {
    event.preventDefault();

    const taskTitle = document.getElementById("taskTitle").value;
    const taskDesc = document.getElementById("taskDesc").value;
    const prio = document.getElementById("prio").value;
    const deadline = document.getElementById("deadline").value;

    if (!taskTitle.trim()) return alert("Task title cannot be empty!");

    const activeProjectTitle = document.querySelector(".titleBar div").dataset.project;
    const activeProject = projects.find((p) => p.title === activeProjectTitle);

    if (!activeProject) return alert("No active project selected!");

    const newTask = new Task(taskTitle, taskDesc, prio, deadline);
    activeProject.tasks.push(newTask);

    renderTasks(activeProject);
    document.getElementById("taskForm").reset();
    closeModal(taskModal);
};

// Render Tasks for the Active Project
function renderTasks(project) {
    const taskContent = document.querySelector(".taskContent");
    taskContent.innerHTML = "";

    project.tasks.forEach((task, index) => {
        taskContent.innerHTML += `
            <div class="taskNote" data-task-index="${index}">
                <div>Task: ${task.taskTitle}</div>
                <div>Description: ${task.taskDesc}</div>
                <div>Priority: ${task.prio}</div>
                <div>Deadline: ${task.deadline}</div>
                <div class="buttons">
                    <button class="editTask">Edit</button>
                    <button class="deleteTask">Delete</button>
                </div>
            </div>`;
    });
}

// Render Selected Project
function renderProject(projectTitle) {
    const project = projects.find((p) => p.title === projectTitle);
    if (!project) return;

    const titleBar = document.querySelector(".titleBar");
    titleBar.innerHTML = `
        <div data-project="${project.title}">
            ${project.title}
            <div class="projBtns">
            <button class="addTaskBtn">Add Task</button>
            <button id="edit">Edit</button>
            <button id="delete">Delete</button></div>
        </div>`;

    renderTasks(project);
}

// Handle Add Task Button
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("addTaskBtn")) {
        openModal(taskModal);
    }
});

// Handle Sidebar Project Selection
document.querySelector(".projectList").addEventListener("click", (event) => {
    if (event.target.classList.contains("project-btn")) {
        const projectTitle = event.target.dataset.title;
        renderProject(projectTitle);
    }
});

// Handle Delete and Edit Buttons
document.addEventListener("click", (event) => {
    const titleBarDiv = document.querySelector(".titleBar div");
    if (!titleBarDiv) return;

    const activeProjectTitle = titleBarDiv.dataset.project;
    const activeProject = projects.find((p) => p.title === activeProjectTitle);

    if (event.target.id === "delete" && activeProject) {
        projects.splice(projects.indexOf(activeProject), 1);

        // Remove from Sidebar and Clear Main Content
        document.querySelector(`.project-btn[data-title="${activeProjectTitle}"]`).remove();
        document.querySelector(".titleBar").innerHTML = "";
        document.querySelector(".taskContent").innerHTML = "";
    }

    if (event.target.id === "edit" && activeProject) {
        const newTitle = prompt("Enter new project title:", activeProject.title);
        if (newTitle && newTitle.trim()) {
            activeProject.title = newTitle;

            // Update Sidebar and Title Bar
            const projectButton = document.querySelector(`.project-btn[data-title="${activeProjectTitle}"]`);
            projectButton.textContent = newTitle;
            projectButton.dataset.title = newTitle;

            renderProject(newTitle);
        }
    }
});

// Handle Task Edit and Delete
document.querySelector(".taskContent").addEventListener("click", (event) => {
    if (!event.target.classList.contains("editTask") && !event.target.classList.contains("deleteTask")) return;

    const taskNote = event.target.closest(".taskNote");
    const taskIndex = taskNote.dataset.taskIndex;

    const activeProjectTitle = document.querySelector(".titleBar div").dataset.project;
    const activeProject = projects.find((p) => p.title === activeProjectTitle);

    if (!activeProject) return;

    if (event.target.classList.contains("deleteTask")) {
        activeProject.tasks.splice(taskIndex, 1);
        renderTasks(activeProject);
    }

    if (event.target.classList.contains("editTask")) {
        const task = activeProject.tasks[taskIndex];
        const newTitle = prompt("Enter new task title:", task.taskTitle);
        const newDesc = prompt("Enter new task description:", task.taskDesc);

        if (newTitle && newDesc) {
            task.taskTitle = newTitle;
            task.taskDesc = newDesc;
            renderTasks(activeProject);
        }
    }
});
