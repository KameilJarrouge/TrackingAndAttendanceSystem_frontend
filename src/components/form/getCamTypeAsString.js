export const getCamTypeAsString = (typeAsNumber) => {
  switch (typeAsNumber) {
    case 0: // sunday
      return "قاعة";
    case 1:
      return "مدخل";
    case 2:
      return "مخرج";
    case 3:
      return "حرم";

    default:
      return "";
  }
};
