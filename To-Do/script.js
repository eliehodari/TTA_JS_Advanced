let tasks = ["Buy Milk" , "clean the room" , "go to the gym"]; const displayTasks = () => {
    let taskDisplay = document.querySelector('#taskDisplay');
    taskDisplay.innerHTML = '';
    tasks.forEach(task =>{
        const taskItem = document.createElement('li');
        taskItem.classList.add('bg-blue-200', 'p-2', 'm-2','rounded-lg', 'list-none');
        taskItem.textContent = task;
        taskItem.addEventListener('click', () => {
            alert(`You clicked on: ${task}`);
        });
        taskDisplay.appendChild(taskItem);
    })
}

const saveTaskToLocalStorage = () => {
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

const addTask = () => {
    const newTaskInput = document.querySelector('#newTask');
    const newTask =  newTaskInput.value;


    if(newTask.trim( ) !== ""){
        tasks.push(newTask);
        newTaskInput.value = '';
        saveTaskToLocalStorage();
        displayTasks();
    }else {
        alert('please enter a task')
    }
}

const addTaskButton = document.querySelector('#addTaskButton');
addTaskButton.addEventListener('click',addTask);

const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');

    if(storedTasks){
        tasks = JSON.parse(storedTasks);
        displayTasks();
    }
}

loadTasksFromLocalStorage();
displayTasks();