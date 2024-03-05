//현재 년, 월, 일 요일, 시간 받기
export const getStringFullDate = date => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[new Date(date).getDay()];

  return `${year}.${month}.${day} ${dayOfWeek} ${hour}:${minutes}`;
};

// 00월/00일 - 현재 날짜
export const getStringDate = date => {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${month}월 ${day}일`;
};

// 00월/00일 - 1일 전
export const getBeforeOneStringDate = date => {
  let someday = new Date(date);
  someday.setDate(someday.getDate() - 1);

  return getStringDate(someday);
};
// 00월/00일 - 2일 전
export const getBeforeTwoStringDate = date => {
  let someday = new Date(date);
  someday.setDate(someday.getDate() - 2);

  return getStringDate(someday);
};
// 00월/00일 - 3일 전
export const getBeforeThreeStringDate = date => {
  let someday = new Date(date);
  someday.setDate(someday.getDate() - 3);

  return getStringDate(someday);
};
// 00월/00일 - 4일 전
export const getBeforeFourStringDate = date => {
  let someday = new Date(date);
  someday.setDate(someday.getDate() - 4);

  return getStringDate(someday);
};
// 00월/00일 - 5일 전
export const getBeforeFiveStringDate = date => {
  let someday = new Date(date);
  someday.setDate(someday.getDate() - 5);

  return getStringDate(someday);
};
// 00월/00일 - 6일 전
export const getBeforeStringDate = date => {
  let someday = new Date(date);
  someday.setDate(someday.getDate() - 6);

  return getStringDate(someday);
};

// 홈화면 한글 날짜, 시간
export const getHangeulDate = date => {
  const month = [
    '일',
    '이',
    '삼',
    '사',
    '오',
    '유',
    '칠',
    '팔',
    '구',
    '시',
    '십일',
    '십이',
  ];
  const days = [
    '일',
    '이',
    '삼',
    '사',
    '오',
    '육',
    '칠',
    '팔',
    '구',
    '십',
    '십일',
    '십이',
    '십삼',
    '십사',
    '십오',
    '십육',
    '십칠',
    '십팔',
    '십구',
    '이십',
    '이십일',
    '이십이',
    '이십삼',
    '이십사',
    '이십오',
    '이십육',
    '이십칠',
    '이십팔',
    '이십구',
    '삼십',
    '삼십일',
  ];
  const week = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  const hours = [
    '열두',
    '한',
    '두',
    '세',
    '네',
    '다섯',
    '여섯',
    '일곱',
    '여덟',
    '아홉',
    '열',
    '열한',
    '열두',
    '한',
    '두',
    '세',
    '네',
    '다섯',
    '여섯',
    '일곱',
    '여덟',
    '아홉',
    '열',
    '열한',
  ];
  const minutes = [
    '영',
    '일',
    '이',
    '삼',
    '사',
    '오',
    '육',
    '칠',
    '팔',
    '구',
    '십',
    '십일',
    '십이',
    '십삼',
    '십사',
    '십오',
    '십육',
    '십칠',
    '십팔',
    '십구',
    '이십',
    '이십일',
    '이십이',
    '이십삼',
    '이십사',
    '이십오',
    '이십육',
    '이십칠',
    '이십팔',
    '이십구',
    '삼십',
    '삼십일',
    '삼십이',
    '삼십삼',
    '삼십사',
    '삼십오',
    '삼십육',
    '삼십칠',
    '삼십팔',
    '삼십구',
    '사십',
    '사십일',
    '사십이',
    '사십삼',
    '사십사',
    '사십오',
    '사십육',
    '사십칠',
    '사십팔',
    '사십구',
    '오십',
    '오십일',
    '오십이',
    '오십삼',
    '오십사',
    '오십오',
    '오십육',
    '오십칠',
    '오십팔',
    '오십구',
    '',
  ];

  const currentDate = new Date(date);

  const hangeulMonth = month[currentDate.getMonth()];
  const hangeulDay = days[currentDate.getDate() - 1];
  const dayOfWeek = week[currentDate.getDay()];
  const hangeulHour = hours[currentDate.getHours()];
  const hangeulMinute = minutes[currentDate.getMinutes()];
  return `${hangeulMonth}월 ${hangeulDay}일 ${dayOfWeek} ${hangeulHour}시 ${hangeulMinute}분`;
};

//현재 요일
export const getStringDay = date => {
  const week = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  const dayOfWeek = week[new Date(date).getDay()];
  return dayOfWeek;
};

//현재 시간
export const getStringTime = date => {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hour}:${minutes}`;
};
