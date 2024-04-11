if (localStorage.getItem('darkmode') === 'true') {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.getElementById('darkmodeswitch').textContent = "Light mode";
}

document.getElementById('darkmodeswitch').addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        localStorage.removeItem('darkmode');
        document.documentElement.setAttribute('data-bs-theme', 'light')
        document.getElementById('darkmodeswitch').textContent = "Dark mode";
    }
    else {
        localStorage.setItem('darkmode', 'true');
        document.documentElement.setAttribute('data-bs-theme', 'dark')
        document.getElementById('darkmodeswitch').textContent = "Light mode";
    }
});

const castleTimers = [
    '01:30',
    '04:30',
    '07:30',
    '13:30',
    '16:30',
    '19:30',
    '22:30'
];

function padZeroes(timeInt) {
    return String(timeInt).padStart(2, '0');
}
function addUtcCastles() {
    const utcTimersList = document.getElementById('utc-castle-time');
    utcTimersList.innerHTML = '';
    const startTime = new Date();
    startTime.setUTCHours(7, 30, 0, 0);

    const endTime = new Date();
    endTime.setUTCHours(10, 30, 0, 0);
    castleTimers.forEach(time => {

        const row = document.createElement('tr');

        // LOCAL
        const localTime = document.createElement('td');
        const [hours, minutes] = time.split(':');
        const localDate = new Date();
        localDate.setUTCHours(Number(hours), Number(minutes), 0, 0);
        localTime.textContent = `${padZeroes(localDate.getHours())}:${padZeroes(localDate.getMinutes())}`;
        row.appendChild(localTime);

        // UTC
        const utcTime = document.createElement('td');
        utcTime.textContent = time;
        row.appendChild(utcTime);



        // TIMER
        const timer = document.createElement('td');

        var now = new Date();
        if (localDate < now) {
            localDate.setDate(localDate.getDate() + 1);
        }
        const distance = localDate - now;
        const seconds = Math.floor(distance / 1000) % 60;
        const minutesRemaining = Math.floor(distance / (1000 * 60)) % 60;
        const hoursRemaining = Math.floor(distance / (1000 * 60 * 60));

        // const listItem = document.createElement('li');
        timer.textContent = `${padZeroes(hoursRemaining)}h ${padZeroes(minutesRemaining)}m ${padZeroes(seconds)}s`;
        row.appendChild(timer);
        if (hoursRemaining === 2) {
            row.className = "table-secondary";
        }
        else if (hoursRemaining === 1) {
            row.className = "table-info";
        }
        else if (hoursRemaining === 0) {
            row.className = "table-success";
        }
        else if (now >= startTime && now <= endTime && time === '13:30') {
            
            row.className = "table-secondary";
        }
        utcTimersList.appendChild(row);
    });
}

function updateTime() {

    document.getElementById("local-time").textContent = moment().format('H:mm:ss');
    document.getElementById("utc-time").textContent = moment.utc().format('H:mm:ss');
    document.getElementById("local-date").textContent = moment().format('MMMM Do YYYY');
    document.getElementById("utc-date").textContent = moment.utc().format('MMMM Do YYYY');

    addUtcCastles();
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial call to set the time immediately
updateTime();