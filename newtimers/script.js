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



// New timers: https://forum.albiononline.com/index.php/Thread/193427-Addressing-Albion-Europe-Feedback-and-Concerns-Update-March-26-13-40-UTC/#post1355007

// Example : Americas 18 example:  Castle spawn 16:00, OP spawn 17:00, but open 18:00
// Asia later, as their patch and downtimes are different.
const LegendaryCastle = Object.freeze({
    Americas: 23,
    Europe: 19,
    Asia: 15
});

const Downtime = '10:00';

const Regions = Object.freeze({
    Americas: 'Americas',
    Europe: 'Europe',
    Asia: 'Asia'
});

const Timers = Object.freeze({
    Americas: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '10:00'],
    Europe: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    Asia: ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '23:00']
});

const Events = Object.freeze({
    chest_open: 'Castle chest opens',
    terri_fight_start: 'Terri Fight Starts',
    dead_zone: 'dead_zone', // ??
    down_time: 'Down time',
    legendary_chest_open: 'Castle chest opens (Sat-Sun Legendary)',
    asia_maintainance: 'Maintainance',
    asia_patch_rollout: 'Patch Rollout'
});

// Object.keys(Regions).forEach(region => {
//     getTimers(region);
// });

getTimers(Regions.Americas, 'utc-castle-time');
getTimers(Regions.Europe, 'utc-castle-europe-time');
getTimers(Regions.Asia, 'utc-castle-asia-time');
function getTimers(region, elementId) {
    var localDate = new Date();
    var timers = Timers[region];
    const utcTimersList = document.getElementById(elementId);

    timers.forEach(function (time) {
        const [hour, minutes] = time.split(':');
        var eventDate = hourMinToEventDate(hour, minutes);
        var event = null;
        if (hour === '10') {
            if (region === Regions.Asia) {
                event = viewModel(eventDate, Events.asia_patch_rollout)
            } else {
                event = viewModel(eventDate, Events.down_time)
            }
        }
        else if (region === Regions.Asia && hour === '23') {
            event = viewModel(eventDate, Events.asia_maintainance)
        }
        else if (hour == LegendaryCastle[region]) {
            eventDate.setHours(eventDate.getHours() );
            event = viewModel(eventDate, Events.legendary_chest_open);
        }
        else if (hour % 2 === 0) {
            event = viewModel(eventDate, Events.terri_fight_start);
        } else {
            eventDate.setHours(eventDate.getHours());
            event = viewModel(eventDate, Events.chest_open);
        }


        const row = document.createElement('tr');

        const type = document.createElement('td');
        type.textContent = event.event;
        row.appendChild(type);
        const localTime = document.createElement('td');
        localTime.textContent = event.localTime;
        row.appendChild(localTime);
        const utcTime = document.createElement('td');
        utcTime.textContent = event.utcTime;
        row.appendChild(utcTime);
        // const countDown = document.createElement('td');
        // countDown.textContent = 0;
        // row.appendChild(countDown);

        utcTimersList.appendChild(row);


    });
}
function padZeroes(timeInt) {
    return String(timeInt).padStart(2, '0');
}

function viewModel(eventDate, event) {

    return {
        localTime: `${padZeroes(eventDate.getHours())}:${padZeroes(eventDate.getMinutes())}`,
        utcTime: `${padZeroes(eventDate.getUTCHours())}:${padZeroes(eventDate.getMinutes())}`,
        event: event
    }

}

function hourMinToEventDate(hours, minutes) {
    const localDate = new Date();
    localDate.setUTCHours(Number(hours), Number(minutes), 0, 0);
    return localDate;
}

function nextChest(localDate, eventDate) {

}





// getTimers(Region.Americas);



//
// const localDate = new Date();
//
// localTime.textContent = `${padZeroes(localDate.getHours())}:${padZeroes(localDate.getMinutes())}`;



// After castle pop and one hour before castle pop.
// const DeadZone = Object.freeze({
//     Americas: { start: 6, end: 17 },
//     Europe: { start: 0, end: 11 },
// });

// function isDeadZone(hours, region) {
//     var deadzone = DeadZone[region];
//     if (hours >= deadzone.start && hours < deadzone.end) {
//         return true;
//     }
//     return false;
// }

// const messages = Object.freeze({
//     'CHEST_OPEN': 'Chest opens in:',
//     'TERRI_FIGHT_BEGIN': 'Terri fight begins in:'
// });

// const currentEvent = "";
// const nextEvent = "";

// function currentAndNextUpevent(region) {
//     const now = new Date();

//     const utcHours = now.getUTCHours();

//     // Check deadzone
//     if (isDeadZone(utcHours, region)) {
//         currentEvent = DeadZone[region].start + ": Deadzone begin";
//         nextEvent = DeadZone[region].end + 1 + ": Castle Chest Open"
//         return;
//     }

//     // Handle otherwise
//     var timers = Timers[region];
//     timers.forEach(function (time) {
//         var hour = Number(time.substring(0, 2));

//         if (hour === utcHours + 1) {
//             nextEvent =
//         }


//         if (time === Downtime) {
//             console.log(time + ': Downtime');
//         }
//         else if (hour % 2 === 0) {
//             console.log(time + ': Terri fight');
//         }
//         else if (time === LegendaryCastle[region]) {
//             console.log(time + ': Legendary castle chest open');
//         }
//         else {
//             console.log(time + ': 1 hour till Castle chest open');
//         }
//     });
// }
