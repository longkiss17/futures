import moment from "moment";
export default (function () {
  Array.prototype.last = function () {
    return this.length === 0 ? {} : this[this.length - 1];
  };

  Array.prototype.first = function () {
    return this.length === 0 ? {} : this[0];
  };

  Array.prototype.groupBy = function () {
    return this.sort().reduce((prev, curr) => {
      const length = prev.length;
      if (length === 0 || prev[length - 1] !== curr) {
        if (curr && curr.toString()) prev.push(curr);
      }
      return prev;
    }, []);
  };

  Array.prototype.groupObjectBy = function (key, orderBy = -1) {
    return this.sort((a, b) => {
      a = a[key];
      b = b[key];
      return a === b ? 0 : a > b ? orderBy : orderBy * -1;
    }).reduce((prev, curr) => {
      const length = prev.length;
      if (length === 0 || prev[length - 1][key] !== curr[key]) {
        if (curr && curr.toString()) prev.push(curr);
      }
      return prev;
    }, []);
  };

  Array.prototype.sortKey = function (key, orderBy = 1) {
    return this.sort((a, b) => {
      a = a[key];
      b = b[key];
      return (a === b ? 0 : a > b ? 1 : -1) * orderBy;
    });
  };

  Array.prototype.toObject = function (key, label) {
    let obj = {};

    for (let entry of this) {
      obj[entry[key]] = entry[label];
    }
    return obj;
  };

  Number.prototype.toComma = function () {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  String.prototype.toComma = function () {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  String.prototype.toHtmlEncode = function () {
    return this.replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#035;/gi, "#")
      .replace(/&#039;/gi, "'");
  };

  String.prototype.toHtmlDecode = function () {
    return this.replace(/&/gi, "&amp;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;").replace(/#/gi, "&#035;").replace(/'/gi, "&#039;");
  };

  String.prototype.toDate = function (f) {
    return this ? moment(this).format(f) : moment().format("YYYY.MM.DD HH:mm:ss");
  };
})();
