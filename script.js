// Wait for the DOM to load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim task input

        // Check if task input is empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove task when the remove button is clicked
        removeButton.onclick = () => {
            taskList.removeChild(listItem);
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = '';
    }

    // Add event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add event listener for pressing "Enter" in the task input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
