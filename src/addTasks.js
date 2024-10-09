import { projects, Project } from "./appLogic";

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
    delete() {
        const index = tasks.indexOf(this);
        tasks.splice(index, 1);
    }
}