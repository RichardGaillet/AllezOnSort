export const lessThanTen = (number) => {
    return (
        number > 9 ?
            number :
            `0${number}`
    )
}

export const shortenText = (text, limit) => {
    if (text?.length > limit) {
        return text.substring(0, (limit - 3)) + '...'
    }
    return text
}

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
export const startOfDay = () => {
    return Math.floor(+moment() / (24 * 60 * 60 * 1000)) * (24 * 60 * 60 * 1000).toString()
}

export const eighteenYears = () => {
    return (((18 * 365) + 5) * 24 * 60 * 60 * 1000)
}