// Task class to represent a task
class Task {
    constructor(name, description, status = "pending") {
      this.name = name;
      this.description = description;
      this.status = status;
    }
  }
  
  // Array to store tasks
  let tasks = [];
  
  // Load tasks from local storage when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = storedTasks.map(task => new Task(task.name, task.description, task.status));
    renderTasks();
  });
  
  // Function to render tasks
  function renderTasks(filter = "all") {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
  
    const filteredTasks = filter === "all" ? tasks : tasks.filter(task => task.status === filter);
  
    filteredTasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.className = `task-item ${task.status}`;
      taskItem.innerHTML = `
        <div>
          <h3>${task.name}</h3>
          <p>${task.description}</p>
        </div>
        <div>
          <button onclick="toggleStatus(${index})">${task.status === "pending" ? "Complete" : "Pending"}</button>
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
      taskList.appendChild(taskItem);
    });
  }
  
  // Function to add a new task
  document.getElementById("task-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = document.getElementById("task-name").value;
    const taskDescription = document.getElementById("task-description").value;
  
    if (taskName.trim() === "") {
      alert("Task name cannot be empty!");
      return;
    }
  
    const newTask = new Task(taskName, taskDescription);
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    document.getElementById("task-form").reset();
  });
  
  // Function to toggle task status
  function toggleStatus(index) {
    tasks[index].status = tasks[index].status === "pending" ? "completed" : "pending";
    saveTasks();
    renderTasks();
  }
  
  // Function to edit a task
  function editTask(index) {
    const task = tasks[index];
    const newName = prompt("Edit task name:", task.name);
    const newDescription = prompt("Edit task description:", task.description);
  
    if (newName !== null && newName.trim() !== "") {
      task.name = newName;
      task.description = newDescription;
      saveTasks();
      renderTasks();
    }
  }
  
  // Function to delete a task
  function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  }
  
  // Function to save tasks to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  // JavaScript
document.getElementById('searchButton').addEventListener('click', searchTasks);
document.getElementById('taskSearch').addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    searchTasks();
  }
});

function searchTasks() {
  const searchTerm = document.getElementById('taskSearch').value.toLowerCase();
  const tasks = document.querySelectorAll('.task-item'); // Assuming each task has class 'task-item'
  
  tasks.forEach(task => {
    const text = task.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      task.style.display = '';
    } else {
      task.style.display = 'none';
    }
  });
}

// Update your task management functions
function updateTaskCounts() {
  const tasks = document.querySelectorAll('.task-item');
  const total = tasks.length;
  let pending = 0;
  let completed = 0;
  
  tasks.forEach(task => {
    if (task.classList.contains('completed')) {
      completed++;
    } else {
      pending++;
    }
  });
  
  document.getElementById('totalCount').textContent = total;
  document.getElementById('pendingCount').textContent = pending;
  document.getElementById('completedCount').textContent = completed;
}

// Call this whenever tasks are added, removed, or status changes
updateTaskCounts();
  // Event listeners for filter buttons
  document.getElementById("filter-all").addEventListener("click", () => renderTasks("all"));
  document.getElementById("filter-completed").addEventListener("click", () => renderTasks("completed"));
  document.getElementById("filter-pending").addEventListener("click", () => renderTasks("pending"));