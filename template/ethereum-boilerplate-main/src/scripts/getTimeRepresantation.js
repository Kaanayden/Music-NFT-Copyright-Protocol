export default function getTimeRepresantation(value) {
    let timeString;
    let seconds = value % 60;
    let minutes = Math.floor(value / 60) % 60;
    let hours = Math.floor(value / 3600);


    timeString = makeTwoDigits(hours) + ":" + makeTwoDigits(minutes) + ":" + makeTwoDigits(seconds);
    return timeString;
}

function makeTwoDigits(value) {
    let text = value.toString();
    for (let i = text.length; i < 2; i++) {
        text = '0' + text;
    }
    return text;
}