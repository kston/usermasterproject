class Utils {
  static dateFormat(date) {
    if (date.getMinutes() < 10) {
      this.minutes = '0' + date.getMinutes();
    } else {
      this.minutes = date.getMinutes();
    }
    return (
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear() +
      ' ' +
      date.getHours() +
      ':' +
      this.minutes
    );
  }
}
