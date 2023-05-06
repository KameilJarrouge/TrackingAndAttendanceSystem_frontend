export const getDayAsShortString = (dayAsNumber) => {
  switch (dayAsNumber) {
    case 0: // sunday
      return "ح";
    case 1:
      return "ن";
    case 2:
      return "ث";
    case 3:
      return "ر";
    case 4:
      return "خ";
    case 5:
      return "ج";
    case 6:
      return "س";

    default:
      return "";
  }
};
