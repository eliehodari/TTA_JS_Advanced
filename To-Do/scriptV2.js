let tasks = ["Buy milk","Clean the room","Go to the gym"];
let completedTasks = [];


const displayTasks = () => {
    let taskDisplay = document.querySelector('#taskDisplay');
    taskDisplay.innerHTML = '';
    tasks.forEach((task, index) => {
        // create the task container
    const taskItem = document.createElement('li');
    taskItem.classList.add('bg-blue-200', 'p-2', 'm-2', 'rounded-lg','flex','justify-between','list-none');
    
    // create the task title container
    const taskText = document.createElement('span');
     tasks.sort();
    taskText.textContent = task;
     taskItem.appendChild(taskText);

     // create the task links container
     const taskLinks = document.createElement('div');
     taskLinks.classList.add('task-links');

     // create the update and delete buttons

     const doneLink = document.createElement('a');
     doneLink.href = "#";
     doneLink.textContent = 'Mark as Done';
     doneLink.classList.add('text-green-500','mr-4');
  doneLink.addEventListener('click', () => markAsDone(index));
     taskLinks.appendChild(doneLink);


     const updateButton = document.createElement('a');
     updateButton.href = '#';
     updateButton.textContent = 'update';
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

    // taskItem.textContent = task;
    taskDisplay.appendChild(taskItem);
    })
}

const saveTaskToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

}

const addTask = () => {
    const newTaskInput = document.querySelector('#newTask');
    const newTask = newTaskInput.value;

    if (newTask.trim() !== ""){
       tasks.push(newTask);
       newTaskInput.value = "";
       saveTaskToLocalStorage();
       displayTasks();
    }
    else{
        alert('Please enter a task');
    }
}

const displayCompletedTasks = () => {
    const CompletedTasksSection = document.querySelector('#completedTasks');
    const completedTaskDisplay = document.querySelector('#completedTaskDisplay');
    completedTaskDisplay.innerHTML = '';
if (completedTasks.length > 0 ){
    CompletedTasksSection.classList.remove('hidden'); 

}else {
    CompletedTasksSection.classList.add('hidden');
}
completedTasks.forEach((task,index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('bg-green-200','p-2','m-2','rounded-lg','flex','justify-between','list-none');
 
    const taskText = document.createElement('span');
    taskText.textContent = task ;
    taskText.classList.add('line-through');
    taskItem.appendChild(taskText);

    const taskLinks = document.createElement('div');
    taskLinks.classList.add("task-links");

    const undoLink = document.createElement("a");
    undoLink.href = '#';
    undoLink.textContent = 'Undo';
    undoLink.addEventListener('click', ()=> undoCompletedTaks(index));
    undoLink.classList.add('text-blue-500', 'mr-4');
    taskLinks.appendChild(undoLink);

    const deleteButton = document.createElement("a");
    deleteButton.href = '#';
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', () => deleteCompletedTask(index));
    deleteButton.classList.add('text-red-500');

    taskLinks.appendChild(deleteButton);
    taskItem.appendChild(taskLinks);
    completedTaskDisplay.appendChild(taskItem);

})



}

const undoCompletedTaks = (index) => {
const task = completedTasks.splice(index,1)[0];
tasks.push(task);
saveTaskToLocalStorage();
displayTasks();
displayCompletedTasks();
}

const deleteCompletedTask = (index) => {
    if (confirm('Are you sure you want to delete this task')){
        completedTasks.splice(index,1);
        saveTaskToLocalStorage();
        displayCompletedTasks();
    }
}

const markAsDone = (index) => {
    const task = tasks.splice(index,1)[0]; 
    completedTasks.push(task);
    saveTaskToLocalStorage();
    displayTasks();
    displayCompletedTasks();
}


const editTask = (index) => {
    const updatedTask = prompt("Update your task", tasks[index]);
    if(updatedTask && updatedTask.trim() !== ""){
        tasks[index] = updatedTask;
        displayTasks();
        saveTaskToLocalStorage();
    }
    else{

    }
}




const deleteTask = (index) => {
  if(confirm('Are you sure you want to delete this task?')){
tasks.splice(index, 1);
saveTaskToLocalStorage();
displayTasks();  
} 
}

const addTaskButton = document.querySelector('#addTaskButton');
addTaskButton.addEventListener("click", addTask);



const loadTasksFromStorage = () =>{
const taskStored = localStorage.getItem('tasks');
const storedCompletedTasks = localStorage.getItem('completedTasks')
if (taskStored) {
    tasks = JSON.parse(taskStored);
    displayTasks();
}
if (storedCompletedTasks) {
    completedTasks = JSON.parse(storedCompletedTasks);
    displayCompletedTasks();

}
}
loadTasksFromStorage();
// displayTasks();