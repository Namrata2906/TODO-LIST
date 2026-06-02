let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    span.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      displayTasks();
    };

    // Buttons
    let btns = document.createElement("div");

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(index);

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTask(index);

    btns.appendChild(editBtn);
    btns.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(btns);
    list.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  if (input.value === "") return;

  tasks.push({ text: input.value, completed: false });
  input.value = "";

  saveTasks();
  displayTasks();
}
function removeTask() {
  let list = document.getElementById("taskList");
  
  if (list.lastChild) {
    list.removeChild(list.lastChild); // removes last task
  } else {
    alert("No task to remove");
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function editTask(index) {
  let newTask = prompt("Edit task:", tasks[index].text);
  if (newTask !== null) {
    tasks[index].text = newTask;
    saveTasks();
    displayTasks();
  }
}

// Load tasks on page load
displayTasks();