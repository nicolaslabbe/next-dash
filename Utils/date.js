const moment = require("moment");

module.exports.timestampToHumain = str => moment(str).fromNow();

module.exports.remaining = str => {
  const time = moment(parseInt(str));
  const now = moment();
  let diff = time.diff(now, "minutes");
  if (diff > 60) {
    diff = `${time.diff(now, "hours")} hour(s)`;
  } else {
    diff = `${diff} minute(s)`;
  }
  return diff;
};

module.exports.HHmm = str => {
  return moment(str).format("HH:mm");
};
