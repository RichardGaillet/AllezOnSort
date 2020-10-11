export const lessThanTen = (number) => {
    return (
        number > 9 ?
            number :
            `0${number}`
    )
}