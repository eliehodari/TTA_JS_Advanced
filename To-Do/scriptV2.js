let tasks = ["Buy Milk", "clean the room", "go to the gym"];

const displayTasks = () => {
    let taskDisplay = document.querySelector('#taskDisplay');
    if (!taskDisplay) return;
    taskDisplay.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('bg-blue-200', 'p-2', 'm-2', 'rounded-lg', 'flex', 'justify-between', 'list-none');

        const taskText = document.createElement('span');
        taskText.textContent = task;
        taskItem.appendChild(taskText);

        const taskLinks = document.createElement('div');
        taskLinks.classList.add('task-links');

        const updateButton = document.createElement('a');
        updateButton.href = '#';
        updateButton.textContent = 'Update';
        updateButton.classList.add('text-blue-500' , 'mr-2');
        taskLinks.appendChild(updateButton);

        const deleteButton = document.createElement('a');
        deleteButton.href = '#';
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('text-red-500');

       
        deleteButton.addEventListener('click', () => deleteTask(index));
        
        taskLinks.appendChild(deleteButton);
        taskItem.appendChild(taskLinks);
        taskDisplay.appendChild(taskItem);
    });
};

const saveTaskToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const newTaskInput = document.querySelector('#newTask');
    if (!newTaskInput) return;
    const newTask = newTaskInput.value.trim();

    if (newTask !== "") {
        tasks.push(newTask);
        newTaskInput.value = '';
        saveTaskToLocalStorage();
        displayTasks();
    } else {
        alert('Please enter a task');
    }
};

const deleteTask = (index) => {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTaskToLocalStorage();
        displayTasks();
    }
};

const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    displayTasks(); 
};

document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromLocalStorage();

    const addTaskButton = document.querySelector('#addTaskButton');
    if (addTaskButton) {
        addTaskButton.addEventListener('click', addTask);
    }
});
