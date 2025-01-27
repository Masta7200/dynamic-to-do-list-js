// Wait for DOM to fully load before initializing the app
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Event listener for adding a task
    addButton.addEventListener('click', () => {
        addTask(taskInput.value.trim());
    });

    // Allow adding a task by pressing the Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach((taskText) => addTask(taskText, false)); // Avoid saving tasks to Local Storage again
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        if (!taskText) {
            alert('Please enter a task!');
            return;
        }

        // Check for duplicate tasks
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (storedTasks.includes(taskText)) {
            alert('Task already exists!');
            return;
        }

        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;
        li.className = 'task-item'; // Add a class for styling

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.onclick = () => {
            removeTask(li, taskText);
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);
        // Append the list item to the task list
        taskList.appendChild(li);

        // Save the task to Local Storage if `save` is true
        if (save) {
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field and focus it
        taskInput.value = '';
        taskInput.focus();
    }

    // Function to remove a task
    function removeTask(taskElement, taskText) {
        // Remove the task element from the DOM
        taskList.removeChild(taskElement);

        // Update Local Storage by removing the task
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter((task) => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
});
