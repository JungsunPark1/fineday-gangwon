//api 파람으로 넣을 날짜, 시간은 여기에 로직을 짜기

// 현재 년 월 일 구하는 로직 ex)YYMMDD
const formatArabicDate = date => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}${month}${day}`;
};

//현재 날짜
export const getArabicDate = date => {
  return formatArabicDate(date);
};

//7일 전 날짜
export const getSevenDaysBeforeDate = date => {
  let SevenDaysBefore = new Date(date);
  SevenDaysBefore.setDate(SevenDaysBefore.getDate() - 7);

  return formatArabicDate(SevenDaysBefore);
};

// 1일 전 날짜
export const getYesterdaysStringDate = date => {
  let yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);

  return formatArabicDate(yesterday);
};

// 기상청 api 현재 시간 ( - Base_time : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회))

// const now
export const specialTime = date => {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let now = hour * 100 + minute;

  switch (true) {
    case now >= 210 && now <= 509:
      return '0200';
    case now >= 510 && now <= 809:
      return '0500';
    case now >= 810 && now <= 1109:
      return '0800';
    case now >= 1110 && now <= 1409:
      return '1100';
    case now >= 1410 && now <= 1709:
      return '1400';
    case now >= 1710 && now <= 2009:
      return '1700';
    case now >= 2010 && now <= 2309:
      return '2000';
    // 밤 1110부터 새벽 0209까지
    case now >= 2310 || now <= 209:
      return '2300';
    default:
      return null;
  }
};

// 기상청 api 날짜 - 현재 시간이 밤 12시부터 새벽 2시 이전이면 전날 날짜를 보내는 로직
export const specialDate = date => {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let now = hour * 100 + minute;

  if (now >= '0000' && now <= '0209') {
    return getYesterdaysStringDate(date);
  } else return getArabicDate(date);
};
