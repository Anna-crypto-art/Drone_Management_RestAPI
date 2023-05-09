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

  getDate(date: string | number | Date, ignore_timezone = false): Date {
    let converted_date: Date | null = null;

    if (typeof date === "string") {
      converted_date = new Date(Date.parse(date));
    } else if (typeof date === "number") {
      converted_date =  new Date(date);
    } else {
      converted_date = date;
    }

    if (ignore_timezone) {
      return new Date(converted_date.getTime() - (converted_date.getTimezoneOffset() * 60 * 1000));
    }

    return converted_date;
  },

  toDate(date: string | number | Date, ignore_timezone = false): string {
    return this.getDate(date, ignore_timezone).toISOString().substring(0, 10);
  },
  toTime(date: string | number | Date, ignore_timezone = false): string {
    return this.getDate(date, ignore_timezone).toISOString().substring(11, 16);
  },
  toDateTime(date: string | number | Date, ignore_timezone = false): string {
    return this.toDate(date, ignore_timezone) + " " + this.toTime(date, ignore_timezone);
  },
  now(): string {
    const d = new Date();
    return (new Date(d.getTime() - (d.getTimezoneOffset() * 60 * 1000))).toISOString();
  }
};
