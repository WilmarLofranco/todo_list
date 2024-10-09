import "./styles.css";
import {projects, Project, Task} from "./appLogic.js";
import "./DOMstuff.js";

const project1 = new Project("Buy Grocery");
const project2 = new Project("Let wife suck mah dick");
project2.editProject("Cook Dinner");
const task1 = new Task("Slice Vegies", "Slice carrots, potatoes, & cabbage", "Tonight", "High");
project2.addTask(task1);
const task2 = new Task("Fuck Wife", "Suck and Anal Wife", "Tonight", "Very Highest");
task1.editTask(task2);
console.log(projects);