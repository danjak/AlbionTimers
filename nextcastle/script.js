if (localStorage.getItem('darkmode') === 'true') {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
}

document.getElementById('darkmodeswitch').addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {

        localStorage.removeItem('darkmode');
        document.documentElement.setAttribute('data-bs-theme', 'light')
    }
    else {
        localStorage.setItem('darkmode', 'true');
        document.documentElement.setAttribute('data-bs-theme', 'dark')
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
    castleTimers.forEach(time => {


        // LOCAL
        const localTime = document.createElement('td');
        const [hours, minutes] = time.split(':');
        const localDate = new Date();
        localDate.setUTCHours(Number(hours), Number(minutes), 0, 0);
        localTime.textContent = `${padZeroes(localDate.getHours())}:${padZeroes(localDate.getMinutes())}`;

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

        if(hoursRemaining <= 3) {
            document.getElementById('nextcastle').innerHTML = `${padZeroes(hoursRemaining)}h ${padZeroes(minutesRemaining)}m ${padZeroes(seconds)}s`;
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