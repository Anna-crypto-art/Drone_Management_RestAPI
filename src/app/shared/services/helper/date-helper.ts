export default {
  getTimeDiff: function(date: string): any[] {
    const elapsed = Date.now() - Date.parse(date);

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    let txt = "";
    let time = 0;

    if (elapsed < msPerMinute) {
      txt = 'seconds-ago';
      time = Math.round(elapsed/1000);
    } else if (elapsed < msPerHour) {
      txt = 'minutes-ago';
      time = Math.round(elapsed/msPerMinute);
    } else if (elapsed < msPerDay ) {
      txt = 'hours-ago';
      time = Math.round(elapsed/msPerHour);
    } else if (elapsed < msPerMonth) {
      txt = 'days-ago';
      time = Math.round(elapsed/msPerDay);
    } else if (elapsed < msPerYear) {
      txt = 'months-ago';
      time = Math.round(elapsed/msPerMonth);
    } else {
      txt = 'years-ago';
      time = Math.round(elapsed/msPerYear);
    }

    return [txt, { time }];
  },

  toDateTime: function(d: Date): string {
    return ("0" + d.getDate()).slice(-2) + ("0"+(d.getMonth()+1)).slice(-2) + 
      d.getFullYear() + ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2);
  }
  
}