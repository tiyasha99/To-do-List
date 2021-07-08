const form = document.querySelector('#task-form');

const taskList = document.querySelector('.collection');

const clearBtn =  document.querySelector('.clear-tasks');

const filter =  document.querySelector('#filter');

const taskInput =  document.querySelector('#task');


//Load all event listeners

loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTask);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}
//Get tasks
function getTasks()
{
  let tasks;
  console
  if(localStorage.getItem('tasks')=== null)
  {
    tasks=[];
  }
  else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

//Add Task

function addTask(e) {
  if(taskInput.value == ''){
    alert('Add a task');
  }
  else{
     //Create a list element
  const li = document.createElement('li');
  //Add a class
  li.className= 'collection-item';
  //put the input value
  li.appendChild(document.createTextNode(taskInput.value));
  console.log(taskInput.value);
  //Create X link
  const link= document.createElement('a');
  //Add a class
  link.className = 'delete-item secondary-content'; //secondory content to add something to the right of an item
  //Add icon html
    link.innerHTML ='<i class="fa fa-remove"></i>';
  // append link to li
    li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);
  //store in local storage
  storeTaskInLocalStorage(taskInput.value);
  //clear the input
  taskInput.value="";
    
  
  }
  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks;
  console
  if(localStorage.getItem('tasks')=== null)
  {
    tasks=[];
  }
  else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are you sure?'))
        e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}


// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTask(){
  taskList.innerHTML='';

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}
function filterTasks(e){
  const text=e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!= -1){
      task.style.display='block';
    }
    else {
      task.style.display ='none';
    }
  });
}