let projects = [];

class Project {
    constructor (title) {
        this.title = title;
        this.tasks = [];
        projects.push(this);
    }
    editProject(newTitle) {
        this.title = newTitle;
    }
    deleteProject() {
        const projIndex = projects.indexOf(this);
        projects.splice(projIndex, 1);
    }
    addTask(task) {
        this.tasks.push(task);
    }
    deleteTask(task) {
        const taskIndex = this.tasks.indexOf(task);
        this.tasks.splice(taskIndex, 1);
    }
}

class Task {
    constructor (taskTitle, description, date, prio) {
        this.taskTitle = taskTitle;
        this.description = description;
        this.date = date;
        this.prio = prio;
    }
    editTask(newTaskTitle, newDes, newDate, newPrio) {
        this.taskTitle = newTaskTitle;
        this.description = newDes;
        this.date = newDate;
        this.prio = newPrio;
    }

}


export {projects, Project, Task,};