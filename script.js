document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = do not save again to Local Storage
    }

    // Add a new task
    function addTask(taskText = null, save = true) {
        // If taskText is not provided, get it from input
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Add click event to remove the task
        removeButton.onclick = () => {
            taskList.removeChild(li);
            // Update Local Storage after removal
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = tasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear input field if the task came from input
        if (taskText === taskInput.value.trim()) {
            taskInput.value = '';
        }
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', () => addTask());

    // Event listener for Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks when page is loaded
    loadTasks();
});
