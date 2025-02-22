let tasks = ["Buy Milk", "clean the room", "go to the gym"];
let completedTasks = [];

const displayTasks = () => {
    let taskDisplay = document.querySelector('#taskDisplay');
    if (!taskDisplay) return;
    taskDisplay.innerHTML = '';

    tasks.forEach((task, index) => {
        // create the task container
        const taskItem = document.createElement('li');
        taskItem.classList.add('bg-blue-200', 'p-2', 'm-2', 'rounded-lg', 'flex', 'justify-between', 'list-none');
        
        // create the task title container
        const taskText = document.createElement('span');
        taskText.textContent = task;
        taskItem.appendChild(taskText);

        // create the task links Container
        const taskLinks = document.createElement('div');
        taskLinks.classList.add('task-links');


        // create the update and delete buttons
        const doneLink = document.createElement('a');
        doneLink.href = '#';
        doneLink.textContent = 'Mark as Done';
        doneLink.classList.add('text-green-500' , 'mr-4');
        doneLink.addEventListener('click', () => markAsDone(index));
        taskLinks.appendChild(doneLink);


        const updateButton = document.createElement('a');
        updateButton.href = '#';
        updateButton.textContent = 'Update';
        updateButton.classList.add('text-blue-500' , 'mr-4');
        updateButton.addEventListener('click', () => editTask(index));
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


const markAsDone = (index) => {
    const task = tasks.splice(index, 1)[0];
    completedTasks.push(task);
    saveTaskToLocalStorage();
    displayTasks();
}

 const editTask = (index) => {
    const updatedTask = prompt("Update your Tasks", tasks[index]);
    if(updatedTask && updatedTask.trim()  !== ""){
        tasks[index] = updatedTask.trim();
        saveTaskToLocalStorage(); 
        displayTasks();
    }else{
        alert('Please Enter a valid Task');
    }
 }

const deleteTask = (index) => {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTaskToLocalStorage();
        displayTasks();
    }
};

const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    const storedCompletedTasks = localStorage.getItem('completedTasks');

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    displayTasks(); 

    if (storedTasks) {
        completedTasks = JSON.parse(storedTasks);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromLocalStorage();

    const addTaskButton = document.querySelector('#addTaskButton');
    if (addTaskButton) {
        addTaskButton.addEventListener('click', addTask);
    }
});
