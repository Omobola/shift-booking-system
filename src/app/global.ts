import * as moment from 'moment';

export class Globals {
    public static injector;
    private static yearfrom = 1900;
    private static yearto = 2050;

    public static yearRange() {
        let years = [];
        for (let i = this.yearfrom; i <= this.yearto; i++) {
            years.push({ description: i, value: i });
        }
        return years;
    }

    public static months() {
        return [
            { description: 'January', value: 1, display: 'Jan' },
            { description: 'February', value: 2, display: 'Feb' },
            { description: 'March', value: 3, display: 'Mar' },
            { description: 'April', value: 4, display: 'Apr' },
            { description: 'May', value: 5, display: 'May' },
            { description: 'June', value: 6, display: 'Jun' },
            { description: 'July', value: 7, display: 'Jul' },
            { description: 'August', value: 8, display: 'Aug' },
            { description: 'September', value: 9, display: 'Sept' },
            { description: 'October', value: 10, display: 'Oct' },
            { description: 'November', value: 11, display: 'Nov' },
            { description: 'December', value: 12, display: 'Dec' }
        ];
    }

    public static daysOfWeek() {
        return [
            { description: 'Monday', value: 1, display: 'Mon' },
            { description: 'Tuesday', value: 2, display: 'Tue' },
            { description: 'Wednesday', value: 3, display: 'Wed' },
            { description: 'Thursday', value: 4, display: 'Thur' },
            { description: 'Friday', value: 5, display: 'Fri' },
            { description: 'Saturday', value: 6, display: 'Sat' },
            { description: 'Sunday', value: 0, display: 'Sun' }
        ];
    }

    public static withinDateRange(date: Date, startDate: Date, endDate: Date) {
        const compareDate = moment(date).startOf('day');
        const fromDate = moment(startDate).startOf('day');
        const toDate = moment(endDate).startOf('day');

        return compareDate.isBetween(fromDate, toDate, null, '[]');
    }

    public static isSameDate(date1: Date, date2: Date) {
        const firstDate = moment(date1).startOf('day');
        const secondDate = moment(date2).startOf('day');
        return firstDate.isSame(secondDate);
    }

    public static isAfterDate(date1: Date, date2: Date) {
        const firstDate = moment(date1).startOf('day');
        const secondDate = moment(date2).startOf('day');
        return firstDate.isAfter(secondDate);
    }

    public static isBeforeDate(date1: Date, date2: Date) {
        const firstDate = moment(date1).startOf('day');
        const secondDate = moment(date2).startOf('day');
        return firstDate.isBefore(secondDate);
    }

    public static getDaysBetweenTwoDates(date1: Date, date2: Date) {
        const firstDate = moment(date1);
        const secondDate = moment(date2);
        return firstDate.diff(secondDate, 'days');
    }

    public static getWeekdaysCount(startDate, endDate) {
        return (<any>moment()).weekdayCalc(startDate, endDate, [1, 2, 3, 4, 5]);
    }

    public static arrayClone(obj: any) {
        return obj.map(x => Object.assign([], x));
    }
}

export class ResourceMatch {
    constructor(public id, public description) { }
}