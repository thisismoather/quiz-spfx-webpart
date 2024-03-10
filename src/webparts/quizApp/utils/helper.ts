export function formatTime(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export const addLeadingZero = (number: number) => {
    if (number > 9) {
        return number
    } else {
        return '0' + number
    }
}