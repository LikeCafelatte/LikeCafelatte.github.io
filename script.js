// Retrieve the task list element
const taskList = document.getElementById("taskList");

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        listItem.remove();
    };

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    taskInput.value = "";
}

// Event listener for the "Enter" key press
const taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
