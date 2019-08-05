// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all events listener
loadEventListener();

// Load all events listener

function loadEventListener(){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task events
  form.addEventListener('submit', addTask);

  // Remove task event
  taskList.addEventListener('click', removeTask);

  // Clear task event
  clearBtn.addEventListener('click', clearTasks);

  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from localStorage
function getTasks(){
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // add class to li element
    li.className = 'collection-item';
    // create textnode and append to the li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to the li
    li.appendChild(link);

    // append li to the ul
    taskList.appendChild(li);
  });
}

// Add task function
function addTask(e){
  if(taskInput.value === ''){
    alert("Add a task");
  }

  // Create li element
  const li = document.createElement('li');
  // add class to li element
  li.className = 'collection-item';
  // create textnode and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement('a');
  // add class
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append the link to the li
  li.appendChild(link);

  // append li to the ul
  taskList.appendChild(li);

  // Store data in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  // Clear the input
  taskInput.value = '';

  // Prevent the page for reload
  e.preventDefault();
}

// Store task in local storage function
function storeTaskInLocalStorage(task){
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task function
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove task from the localStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from localStorage function
function removeTaskFromLocalStorage(taskItem, index){
  let tasks;

  if (localStorage.getItem('tasks') === null) {
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

// Clear tasks function
function clearTasks(){
  // there is two way to clear all tasks
  // using the second way is more faster
  // first is using innerHTML = '';
  // if (confirm('Clear all of the task?')) {
  //   taskList.innerHTML = '';  
  // }

  // second is removing child one by one
  if(confirm('Clear all of the task?')){
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
  }

  // Clear all of the task from the localStorage
  clearTasksFromLocalStorage();
}

// clear tasks from localStorage function
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// filter tasks function
function filterTasks(e){
  // change value to lowerCase
  const text = e.target.value.toLowerCase();

  // foreach used for every data on an element
  document.querySelectorAll('.collection-item').forEach
  (
    function(task){
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
      console.log(item.toLowerCase().indexOf(text));
    }
  );
}