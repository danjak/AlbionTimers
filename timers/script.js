// Helper function to get timers from local storage
function getTimers() {
    const timers = localStorage.getItem('timers');
    return timers ? JSON.parse(timers) : [];
}

// Helper function to save timers to local storage
function saveTimers(timers) {
    localStorage.setItem('timers', JSON.stringify(timers));
}

// Function to add a new timer
function addTime() {
    const timeInput = document.getElementById('timeInput');
    const timeValue = timeInput.value;
    if (!timeValue) {
        alert('Please enter a time.');
        return;
    }

    const [hours, minutes] = timeValue.split(":");

    const currentTime = new Date();
    const targetTime = new Date();
    targetTime.setHours(currentTime.getHours() + parseInt(hours, 10));
    targetTime.setMinutes(currentTime.getMinutes() + parseInt(minutes, 10)); 
    //const targetTime = new Date(currentTime.toDateString() + ' ' + timeValue);

    // Check if the time has already passed
    if (targetTime <= currentTime) {
        alert('The time entered has already passed.');
        return;
    }

    let timers = getTimers();
    timers.push({ id: Date.now(), time: targetTime });
    saveTimers(timers);
    displayTimers();
}

// Function to display timers
function displayTimers() {
    const timerList = document.getElementById('timerList');
    timerList.innerHTML = ''; // Clear existing entries
    const timers = getTimers();
    timers.forEach(timer => {

        //timerList.appendChild(createTime(timer.time, timer.id));

        const timeElement = document.createElement('li');
        timeElement.className = 'list-group-item blockquote';
        timeElement.textContent = new Date(timer.time).toLocaleTimeString();
        timerList.appendChild(timeElement);

        // Start countdown
        updateTimer(timeElement, timer);
    });
}


function createTime(time, id) {
    const figure = document.createElement("figure");
    figure.classList.add("text-center");
  
    const blockquote = document.createElement("blockquote");
    blockquote.classList.add("blockquote");
    blockquote.innerHTML = `<p>${new Date(time).toLocaleTimeString()}</p>`;
  
    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("blockquote-footer");
    figcaption.innerHTML = `Added ${new Date(id).toLocaleTimeString()}`;
  
    figure.appendChild(blockquote);
    figure.appendChild(figcaption);

    return figure;
  
    // Append the figure to your desired container in the DOM
    // Example: document.getElementById("my-container").appendChild(figure);
  }

// Function to update each timer
function updateTimer(element, timer) {
    const interval = setInterval(() => {
        const now = new Date();
        const targetTime = new Date(timer.time);
        const difference = targetTime - now;

        if (difference <= 0) {
            clearInterval(interval);
            element.remove(); // Remove the timer from the display
            removeTimer(timer.id); // Remove the timer from local storage
        } else {
            const remaining = new Date(difference).toISOString().substr(11, 8);
            element.textContent = remaining;
        }
    }, 1000);
}

// Function to remove expired timer from local storage
function removeTimer(id) {
    let timers = getTimers();
    timers = timers.filter(timer => timer.id !== id);
    saveTimers(timers);
}

// Initialize display on load
window.onload = displayTimers;