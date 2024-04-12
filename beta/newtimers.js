// New timers: https://forum.albiononline.com/index.php/Thread/193427-Addressing-Albion-Europe-Feedback-and-Concerns-Update-March-26-13-40-UTC/#post1355007

// Example : Americas 18 example:  Castle spawn 16:00, OP spawn 17:00, but open 18:00
// Asia later, as their patch and downtimes are different.
const LegendaryCastle = Object.freeze({
    Americas: '23:00',
    Europe: '19:00',
    //  Asia: '15:00'
});

// After castle pop
const DeadZone = Object.freeze({
    Americas: { start: '06:00', end: '17:00' },
    Europe: { start: '00:00', end: '11:00' },
});

const Regions = Object.freeze({
    Americas: 'Americas',
    Europe: 'Europe',
    //    Asia: 'Asia'
});

const Timers = Object.freeze({
    Americas: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '10:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    Europe: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    // Asia: ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
});

Object.keys(Regions).forEach(region => {
    console.log(region);
    getTimers(region);

});

function getTimers(region) {
    var timers = Timers[region];
    timers.forEach(function (time) {
        var hour = time.substring(0, 2);
        if (hour === '10') {
            console.log(time + ': Downtime');
        }
        else if (hour === LegendaryCastle[region]) {
            console.log(time + ': Legendary castle chest open');
        }
        else if (hour % 2 === 0) {
            console.log(time + ': Terri fight');
        } else {
            console.log(time + ': 1 hour till Castle chest open');
        }
    });
}