const getDates = () => {
  //Creating present days date in 'YYYY-MM-DD' format
  let todayDate = new Date();
  let currentMonth = todayDate.getMonth() + 1;
  let searchDate = todayDate.getDate() - 5;
  let todayDateFormatted =
    todayDate.getFullYear() +
    "-" +
    (currentMonth > 10 ? currentMonth : "0" + currentMonth) +
    "-" +
    (searchDate > 10 ? searchDate : "0" + searchDate);

  //Creating future days date in 'YYYY-MM-DD' format
  let futureDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000); //getting date from 30days of current day
  let futureMonth = futureDate.getMonth() + 1;
  let futureDateFormatted =
    futureDate.getFullYear() +
    "-" +
    (futureMonth > 10 ? futureMonth : "0" + futureMonth) +
    "-" +
    (futureDate.getDate() > 10
      ? futureDate.getDate()
      : "0" + futureDate.getDate());

  return { todayDateFormatted, futureDateFormatted };
};

export default getDates;
