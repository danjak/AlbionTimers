if (localStorage.getItem('darkmode') === 'true') {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.getElementById('darkmodeswitch').textContent = "Light mode";
}

document.getElementById('darkmodeswitch').addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        localStorage.removeItem('darkmode');
        document.documentElement.setAttribute('data-bs-theme', 'light');
        document.getElementById('darkmodeswitch').textContent = "Dark mode";
    }
    else {
        localStorage.setItem('darkmode', 'true');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        document.getElementById('darkmodeswitch').textContent = "Light mode";

    }
});

const castleTimers = [

    '13:30',
    '16:30',
    '19:30',
    '22:30',
    '01:30',
    '04:30',
    '07:30'
];

function padZeroes(timeInt) {
    return String(timeInt).padStart(2, '0');
}
function addUtcCastles() {
    const startTime = new Date();
    startTime.setUTCHours(7, 30, 0, 0);

    const endTime = new Date();
    endTime.setUTCHours(10, 30, 0, 0);

    let set = false;

    castleTimers.forEach(time => {
        if (set) {
            return;
        }
        // LOCAL
        const localTime = document.createElement('td');
        const [hours, minutes] = time.split(':');
        const localDate = new Date();
        localDate.setUTCHours(Number(hours), Number(minutes), 0, 0);
        localTime.textContent = `${padZeroes(localDate.getHours())}:${padZeroes(localDate.getMinutes())}`;

        var now = new Date();
        if (localDate < now) {
            localDate.setDate(localDate.getDate() + 1);
        }
        const distance = localDate - now;
        const seconds = Math.floor(distance / 1000) % 60;
        const minutesRemaining = Math.floor(distance / (1000 * 60)) % 60;
        const hoursRemaining = Math.floor(distance / (1000 * 60 * 60));



        // Check if the current time is within the specified range
        if (now >= startTime && now <= endTime && time === '13:30') {
            document.getElementById('nextcastle').innerHTML = `${padZeroes(hoursRemaining)}h ${padZeroes(minutesRemaining)}m ${padZeroes(seconds)}s`;
            document.getElementById('local-time').textContent = `${padZeroes(localDate.getHours())}:${padZeroes(localDate.getMinutes())}`;
            document.getElementById('utc-time').textContent = `${padZeroes(localDate.getUTCHours())}:${padZeroes(localDate.getUTCMinutes())}`;
        }
        if (hoursRemaining <= 3) {
            document.getElementById('nextcastle').innerHTML = `${padZeroes(hoursRemaining)}h ${padZeroes(minutesRemaining)}m ${padZeroes(seconds)}s`;
            document.getElementById('local-time').textContent = `${padZeroes(localDate.getHours())}:${padZeroes(localDate.getMinutes())}`;
            document.getElementById('utc-time').textContent = `${padZeroes(localDate.getUTCHours())}:${padZeroes(localDate.getUTCMinutes())}`;
            set = true;
            return;
        }

    });
}

function updateTime() {
    addUtcCastles();
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial call to set the time immediately
updateTime();