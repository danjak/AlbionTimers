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
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        document.getElementById('darkmodeswitch').textContent = "Light mode";
    }
});

const castleTimers = [
    '01:30',
    '00:00',
    '03:00',
    '04:30',
    '05:00',
    '07:30',
    '10:00',
    '12:00',
    '13:30',
    '15:00',
    '16:30',
    '18:00',
    '19:30',
    '21:00',
    '22:30'
];

function padZeroes(timeInt) {
    return String(timeInt).padStart(2, '0');
}
function addUtcCastles() {
    const utcTimersList = document.getElementById('utc-castle-time');
    utcTimersList.innerHTML = '';
    castleTimers.forEach(time => {
        const [hours, minutes] = time.split(':');

        const row = document.createElement('tr');
        const type = document.createElement('td');
        if (hours === '10') {
            type.textContent = "Downtime";
        }
        else if (minutes === '30') {
            type.textContent = "Castle";
        } else {
            type.textContent = 'Territory'
        }
        row.appendChild(type);

        // LOCAL
        const localTime = document.createElement('td');
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
        if (hoursRemaining === 1) {
            row.className = "table-info";
        }
        if (hoursRemaining === 0) {
            row.className = "table-success";
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