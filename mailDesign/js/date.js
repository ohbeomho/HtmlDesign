const month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const month_31 = [1, 3, 5, 7, 8, 10, 12]
const date = new Date()

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomDate = (min_month = 1, max_month = 12, min_date = 1, max_date = 0) => {
    let month = getRandom(min_month, max_month)
    let month_date

    if (min_date <= 0) {
        min_date = 1
    }

    if (month == 2) {
        month_date = getRandom(min_date, max_date <= 0 ? 28 : max_date)
    } else if (month_31.includes(month)) {
        month_date = getRandom(min_date, max_date <= 0 ? 31 : max_date)
    } else {
        month_date = getRandom(min_date, max_date <= 0 ? 30 : max_date)
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