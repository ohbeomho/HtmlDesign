const month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const month_31 = [1, 3, 5, 7, 8, 10, 12]
const date = new Date()

export const month = {
    month_names,
    month_31
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomDate = () => {
    let month = getRandom(1, 12)
    let month_date

    if (month == 2) {
        month_date = getRandom(1, 29)
    } else if (month_31.includes(month)) {
        month_date = getRandom(1, 31)
    } else {
        month_date = getRandom(1, 30)
    }

    return {
        year: date.getFullYear(),
        month,
        month_name: month_names[month - 1],
        date: month_date,
        string: `${month_names[month - 1]} ${month_date}, ${date.getFullYear()}`
    }
}

export const getToday = () => {
    let month = date.getMonth() + 1
    let month_date = date.getDate()

    return {
        year: date.getFullYear(),
        month,
        month_name: month_names[month - 1],
        date: month_date,
        string: `${month_names[month - 1]} ${month_date}, ${date.getFullYear()}`
    }
}