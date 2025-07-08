// Get category name from URL
const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get('cat') || 'Unknown';

// Set the handling
document.getElementById('category-title').textContent = `${categoryName} Tasks`;

// load tasks form localstorage
let tasks = JSON.parse(localStorage.getItem(categoryName)) || []; // here categoryName is our key for localstorage

// Render tasks on page
function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = ''; // clear list before rendering otherwise duplicate card generated

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div>
        <p>${task.title}</p>
        <span class="task-tag ${task.tag}">${task.tag.replace('-', ' ')}</span>
        <div class="task-time">${task.time}</div>
      </div>
      <button onclick="deleteTask(${index})">Delete Task</button>
        `;
        list.appendChild(li);
    });
}

// Add new task
function addTask() {
    const input = document.getElementById('task-input');
    const tagSelect = document.getElementById('task-tag');
    const title = input.value.trim();
    const tag = tagSelect.value;
    const time = new Date().toLocaleString();

    if (title !== '') {
        tasks.push({
            title,
            tag,
            time
        });

        localStorage.setItem(categoryName, JSON.stringify(tasks));
        input.value = '';
        tagSelect.value = 'regular'; // Reset
        closeTaskModal();
        renderTasks();
    }
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem(categoryName, JSON.stringify(tasks));
    renderTasks();
}

// Modal control
function openTaskModal() {
    document.getElementById('task-modal').style.display = 'flex';
}

function closeTaskModal() {
    document.getElementById('task-modal').style.display = 'none';
}

// Back to home
function goBack() {
    window.location.href = 'index.html';
}

// Initial load
renderTasks();