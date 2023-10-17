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
    return ((end_time_obj - start_time_obj) / 1000 / 60 / 60);
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

export function getFormattedDropdownOptions(options, value_key = 'id' , label_key = 'name') {
    if (Array.isArray(options)) {
        let formattedData = []
        options.map((value) => {
            let obj = {value: value[value_key], label: value[label_key]}
            formattedData.push(obj)
        })
        return formattedData;
    } else {
        return {value: options[value_key], label: options[label_key]}
    }
}

export function getDatesForWeek(weekNumber, year) {
    const startDate = new Date(year, 0, 2 + (weekNumber - 1) * 7);
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
    let currentDate = new Date();
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));

    let weekNumber = Math.ceil(days / 7);
    return weekNumber;
}