export default class DateFormatter {
  constructor() {}

  twoDigitDate(): number {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const twoDigitMonth = String(month).length == 1 ? "" + 0 + month : month;
    const twoDigitDay = String(day).length == 1 ? "" + 0 + day : day;

    const result = parseInt(`${year}${twoDigitMonth}${twoDigitDay}`);
    return result;
  }

  getTime(): string {
    const today = new Date();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const adjustedHour = hour == 0 ? "00" : String(hour);
    const adjustedMinutes =
      String(minutes).length == 1 ? "" + 0 + minutes : minutes;

    const result = adjustedHour + adjustedMinutes;
    
    return result;
  }
}
