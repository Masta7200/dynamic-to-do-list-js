document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach((taskText) => addTask(taskText, false));
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // Trim and check for empty input
        if (!taskText.trim()) {
            alert('Please enter a task!');
            return;
        }

        // Create list item element
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Add event listener to remove button
        removeButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            removeTaskFromStorage(taskText);
        });

        // Append button to task and task to list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Save task to Local Storage if required
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter((task) => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText);
        taskInput.value = ''; // Clear input field
    });

    // Event listener for Enter key in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
            taskInput.value = ''; // Clear input field
        }
    });
});
