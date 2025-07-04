const cron = require('node-cron');

const timeFormat = (seconds, minutes, hours, dayOfTheMonth, month, dayOfTheWeek) => {
    return seconds + " " + minutes + " " + hours + " " + dayOfTheMonth + " " + month + " " + dayOfTheMonth
}

cron.schedule(
    timeFormat('*/2', '*', '*', '*', '*', '*'),
    function() {
        console.log(`cron hi ${new Date()}`)
    }
)