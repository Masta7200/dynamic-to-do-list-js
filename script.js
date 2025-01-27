// Wait for the DOM to load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTaskToDOM(taskText, false); // Add tasks to the DOM without saving again
        });
    }

    // Function to add a new task to the DOM
    function addTaskToDOM(taskText, save = true) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove task when the remove button is clicked
        removeButton.onclick = () => {
            removeTask(listItem, taskText);
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Save the task to Local Storage if `save` is true
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task
    function removeTask(taskElement, taskText) {
        // Remove the task element from the DOM
        taskList.removeChild(taskElement);

        // Update Local Storage by removing the task
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Function to handle adding a task from input
    function handleAddTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        addTaskToDOM(taskText);
        taskInput.value = ''; // Clear the input field
    }

    // Add event listener for the "Add Task" button
    addButton.addEventListener('click', handleAddTask);

    // Add event listener for pressing "Enter" in the task input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    });
});
