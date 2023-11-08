import { i18n } from "@/main";


export default {
  getTimeDiff: function (date: string): [string, { time: number }] {
    const elapsed = Date.now() - Date.parse(date);

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    let txt = "";
    let time = 0;

    if (elapsed < msPerMinute) {
      txt = "seconds-ago";
      time = Math.round(elapsed / 1000);
    } else if (elapsed < msPerHour) {
      txt = "minutes-ago";
      time = Math.round(elapsed / msPerMinute);
    } else if (elapsed < msPerDay) {
      txt = "hours-ago";
      time = Math.round(elapsed / msPerHour);
    } else if (elapsed < msPerMonth) {
      txt = "days-ago";
      time = Math.round(elapsed / msPerDay);
    } else if (elapsed < msPerYear) {
      txt = "months-ago";
      time = Math.round(elapsed / msPerMonth);
    } else {
      txt = "years-ago";
      time = Math.round(elapsed / msPerYear);
    }

    return [txt, { time }];
  },

  toNumericDateTime: function (d: Date): string {
    return (
      ("0" + d.getDate()).slice(-2) +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      d.getFullYear() +
      ("0" + d.getHours()).slice(-2) +
      ("0" + d.getMinutes()).slice(-2)
    );
  },

  sustractTimezoneOffset(d: Date): Date {
    return new Date(d.getTime() - (d.getTimezoneOffset() * 60 * 1000));
  },

  getDate(date: string | number | Date, ignoreTimezone = false): Date {
    let convertedDate: Date | null = null;

    if (typeof date === "string") {
      convertedDate = new Date(Date.parse(date));
    } else if (typeof date === "number") {
      convertedDate =  new Date(date);
    } else {
      convertedDate = date;
    }

    if (ignoreTimezone) {
      return this.sustractTimezoneOffset(convertedDate);
    }

    return convertedDate;
  },

  toDate(date: string | number | Date, ignoreTimezone = false): string {
    return this.getDate(date, ignoreTimezone).toISOString().substring(0, 10);
  },
  toTime(date: string | number | Date, ignoreTimezone = false): string {
    return this.getDate(date, ignoreTimezone).toISOString().substring(11, 16);
  },
  toTimeWithSeconds(date: string | number | Date, ignoreTimezone = false): string {
    return this.getDate(date, ignoreTimezone).toISOString().substring(11, 19);
  },
  toDateTime(date: string | number | Date, ignoreTimezone = false): string {
    return this.toDate(date, ignoreTimezone) + " " + this.toTime(date, ignoreTimezone);
  },
  toDateTimeWithSeconds(date: string | number | Date, ignoreTimezone = false): string {
    return this.toDate(date, ignoreTimezone) + " " + this.toTimeWithSeconds(date, ignoreTimezone);
  },
  now(): string {
    return this.sustractTimezoneOffset(new Date()).toISOString();
  },

  getWeekDay(date: string | number | Date, ignoreTimezone = false): string {
    const d = this.getDate(date, ignoreTimezone);
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    
    return i18n.t(days[d.getDay()]).toString();
  },

  getWeekNumber(date: string | number | Date, ignoreTimezone = false): number {
    const d = this.getDate(date, ignoreTimezone);

    // copied from stackoverflow: https://stackoverflow.com/a/6117889
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getDate() - yearStart.getDate()) / 86400000) + 1) / 7);

    return weekNo;
  }
};
