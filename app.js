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
  // Add task events
  form.addEventListener('submit', addTask);
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

  // Clear the input
  taskInput.value = '';

  // Prevent the page for reload
  e.preventDefault();
}