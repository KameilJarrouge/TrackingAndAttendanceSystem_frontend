import moment from "moment";

export const getTimeAsString = (
  time,
  add = false,
  subtract = false,
  amount = 0,
  unit = "minutes"
) => {
  if (add) {
    return moment(time, "HH:mm:ss").add(amount, unit).format("HH:mm");
  }
  if (subtract) {
    return moment(time, "HH:mm:ss").subtract(amount, unit).format("HH:mm");
  }
  return moment(time, "HH:mm:ss").format("HH:mm");
};
