import { AccessTokenApiUrl } from "../routes/ApiEndPoints";
import { APICALL as AXIOS } from "../services/AxiosServices";

// Function to make the given number 2 digit
export function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

// Function to format the date
export function GetFormattedDate(date, year) {
    if (year) {
        return padTo2Digits(date.getDate()) + '-' + padTo2Digits(date.getMonth() + 1) + '-' + year;
    } else {
        return padTo2Digits(date.getDate()) + '-' + padTo2Digits(date.getMonth() + 1) + '-' + date.getFullYear();
    }
}

// Function to redirect to day tab
export function RedirectToDayTab(e) {
    localStorage.setItem('date', e)
    window.location.hash = '#day';
}

// Function to redirect to week tab
export function RedirectToWeekTab(e) {
    localStorage.setItem('week_number', e);
    window.location.hash = '#week';
}

// Function to redirect to month tab
export function RedirectToMonthTab(e) {
    window.location.hash = '#month';
}

// Function to reverse the date
export function GetReversedDate(date) {
    const [day, month, year] = date.split('-');
    const reversed_date = [year, month, day].join('-');
    return reversed_date;
}

// Function to get time difference for contract hours
export function GetTimeDifference(start_time, end_time) {
    start_time = padTo2Digits(start_time.split(':')[0]) + ':' + padTo2Digits(start_time.split(':')[1])
    end_time = padTo2Digits(end_time.split(':')[0]) + ':' + padTo2Digits(end_time.split(':')[1])

    let start_time_obj = new Date("1970-01-01 " + start_time);
    if (start_time > end_time) {
        var end_time_obj = new Date("1970-01-02 " + end_time);
    } else {
        end_time_obj = new Date("1970-01-01 " + end_time);
    }
    return (JSON.stringify((end_time_obj - start_time_obj) / 1000 / 60 / 60).replace('.', ','));
}

// Function to check the break time based on location data
export function checkBreaktime(planning_time) {
    let configData = JSON.parse(localStorage.getItem('configData'))
    let workperiod = configData.workperiod
    let operator = configData.operator
    let formulabreak_value = configData.formulabreak_value

    if (((operator === '=') && (planning_time === workperiod)) ||
        ((operator === '>') && (planning_time > workperiod)) ||
        ((operator === '<') && (planning_time < workperiod)) ||
        ((operator === '>=') && (planning_time >= workperiod)) ||
        ((operator === '<=') && (planning_time <= workperiod))
    ) {
        planning_time = planning_time - formulabreak_value;
    }
    return planning_time;
}

// Function to get week number based on date
export function getWeekNumberByDate(date) {
    let currentDate = new Date(date);
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));

    let weekNumber = Math.ceil(days / 7);
    return weekNumber;
}

export function getFormattedDropdownOptions(options, value_key = 'id', label_key = 'name') {
    if (options != undefined) {
        if (Array.isArray(options)) {
            let formattedData = []
            options.map((value) => {
                let obj = { value: value[value_key], label: value[label_key] }
                formattedData.push(obj)
            })
            return formattedData;
        } else {
            return { value: options[value_key], label: options[label_key] }
        }
    }
}

export function getFormattedRadioOptions(options, value_key = 'id', label_key = 'name') {
    if (options != undefined) {
        if (Array.isArray(options)) {
            let formattedData = []
            options.map((value) => {
                let obj = { key: value[value_key], name: value[label_key] }
                formattedData.push(obj)
            })
            return formattedData;
        } else {
            return { key: options[value_key], name: options[label_key] }
        }
    }
}

function isLeapYear(year) {
    // Check if the year is evenly divisible by 4
    if (year % 4 === 0) {
        // If it is divisible by 100 and not divisible by 400, it's not a leap year
        if (year % 100 === 0 && year % 400 !== 0) {
            return false;
        }
        // Otherwise, it is a leap year
        return true;
    }
    // If not divisible by 4, it's not a leap year
    return false;
}

export function getDatesForWeek(weekNumber, year) {
    let index = isLeapYear(year) ? 1 : 2

    const startDate = new Date(year, 0, index + (weekNumber - 1) * 7);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // 6 days later is the end of the week

    const dates = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
        dates.push(GetFormattedDate(new Date(currentDate)));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;

}


export function getCurrentWeek() {
    const currentDate = new Date();
    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const daysSinceFirstDay = Math.ceil((currentDate - firstDayOfYear) / (24 * 60 * 60 * 1000));
    const currentWeekNumber = Math.ceil((daysSinceFirstDay + firstDayOfYear.getDay() + 1) / 7);

    return currentWeekNumber;
}

export function getNewAccessToken() {
    let request_data = { 'refresh_token': localStorage.getItem('refresh_token') }
    AXIOS.service(AccessTokenApiUrl, 'POST', request_data, true)
        .then((result) => {
            if (result.success) {
                let response = result.data
                localStorage.setItem('token', 'Bearer ' + response.token.access_token);
                localStorage.setItem('refresh_token', response.token.refresh_token);
                window.location.reload();
            }
        })
}

export function getWeeksInYear(year) {
    // The first day of the year
    const firstDayOfYear = new Date(year, 0, 1);
    // The last day of the year
    const lastDayOfYear = new Date(year, 11, 31);
    // Calculate the difference in days
    const daysDifference = Math.round((lastDayOfYear - firstDayOfYear) / (1000 * 60 * 60 * 24));
    // Calculate the number of weeks
    const weeks = Math.ceil((daysDifference + 1) / 7);

    return weeks;
}

export function getMonthAndYearFromWeek(weekNumber, year) {
    // Create a date object for the first day of the year
    const startDate = new Date(year, 0, 1);

    // Calculate the day of the week for the first day of the year (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const startDayOfWeek = startDate.getDay();

    // Calculate the offset to the first day of the week for the given week number
    const daysToWeekStart = (weekNumber - 1) * 7 - startDayOfWeek;

    // Calculate the date for the first day of the week
    const firstDayOfWeek = new Date(startDate);
    firstDayOfWeek.setDate(startDate.getDate() + daysToWeekStart);

    // Get the month and year of the first day of the week
    const month = firstDayOfWeek.getMonth();
    const resultYear = firstDayOfWeek.getFullYear();

    return {
        month: month + 1, // Months are zero-based in JavaScript (0 = January, 1 = February, ..., 11 = December)
        year: resultYear
    };
}