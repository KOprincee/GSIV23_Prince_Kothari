const getDates = () => {
  //Creating present days date in 'YYYY-MM-DD' format
  let todayDate = new Date();
  let currentMonth = todayDate.getMonth() + 1;
  let todayDateFormatted =
    todayDate.getFullYear() +
    "-" +
    (currentMonth > 10 ? currentMonth : "0" + currentMonth) +
    "-" +
    (todayDate.getDate() > 10
      ? todayDate.getDate()
      : "0" + todayDate.getDate());

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

  //   console.log(todayDateFormatted, futureDateFormatted);
  return { todayDateFormatted, futureDateFormatted };
};

export default getDates;