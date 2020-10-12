export const lessThanTen = (number) => {
    return (
        number > 9 ?
            number :
            `0${number}`
    )
}

export const shortenText = (text, limit) => {
    if (text.length > limit) {
        return text.substring(0, (limit - 3)) + '...'
    }
    return text
}