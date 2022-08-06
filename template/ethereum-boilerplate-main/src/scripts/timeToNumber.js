export default function timeToNumber(value) {
    let text = value;
    let numbers = text.split(":");
    let seconds;
    seconds = parseInt(numbers[0]) * 3600 + parseInt(numbers[1]) * 60 + parseInt(numbers[2]);

    return seconds;
}
