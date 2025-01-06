// appLogic.js
const projects = [];

class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];  // Initialize tasks array for each project
        projects.push(this);
    }
    editProject(newTitle) {
        this.title = newTitle;
    }
    deleteProject() {
        const projIndex = projects.indexOf(this);
        projects.splice(projIndex, 1);
    }
}

// tasks
class Task {
    constructor(taskTitle, taskDesc, prio, deadline) {
        this.taskTitle = taskTitle;
        this.taskDesc = taskDesc;
        this.prio = prio;
        this.deadline = deadline;
    }
    editTask(newTaskTitle, newTaskDesc, newPrio, newDeadline) {
        this.taskTitle = newTaskTitle;
        this.taskDesc = newTaskDesc;
        this.prio = newPrio;
        this.deadline = newDeadline;
    }
    delete() {
        // Deletion logic, but now you should be deleting from project-level tasks
    }
}

export { projects, Project, Task };
