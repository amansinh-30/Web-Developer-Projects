const input = document.getElementById('input');
const button = document.getElementById('btn');
const ul = document.getElementById('task-list');

// Capitalize first letter
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function addTask() {
    const inputValue = input.value.trim();
    if (inputValue === '') {
        alert('PLEASE, ADD TASK!');
        return;
    }

    const li = document.createElement('li');
    li.textContent = capitalize(inputValue);

    // Add check toggle listener
    li.addEventListener('click', function () {
        li.classList.toggle('task');
        saveData();
    });

    // Delete Task
    const span = document.createElement('span');
    span.textContent = 'X';
    span.className = 'delete';

    span.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent triggering li click
        li.remove();
        saveData();
    });

    li.appendChild(span);
    ul.appendChild(li);
    input.value = '';
    saveData();
}

function saveData() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.childNodes[0].nodeValue.trim(),
            completed: li.classList.contains('task')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadData() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('task');
        }

        li.addEventListener('click', function () {
            li.classList.toggle('task');
            saveData();
        });

        const span = document.createElement('span');
        span.textContent = 'X';
        span.className = 'delete';

        span.addEventListener('click', function (e) {
            e.stopPropagation();
            li.remove();
            saveData();
        });

        li.appendChild(span);
        ul.appendChild(li);
    });
}

// Event listeners
button.addEventListener('click', addTask);
window.addEventListener('DOMContentLoaded', loadData);
