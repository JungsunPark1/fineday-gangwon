const gangwondo = (item, propertyName) => {
  return (
    item[propertyName] === '고성(DMZ)' ||
    item[propertyName] === '주문진읍' ||
    item[propertyName] === '금호동' ||
    item[propertyName] === '평창읍' ||
    item[propertyName] === '양양읍'
  );
};

// 지정된 5개 지역 카테고리 필터링
export const filterGangwonDustData = (items, propertyName = 'stationName') => {
  return items
    .filter(item => gangwondo(item, propertyName))
    .map(item => [item[propertyName], item.pm10Value]);
};

// 미먼 수치가 가장 좋은 지역 필터링
export const findGoodSpot = filteredGangwon => {
  return filteredGangwon.reduce((accumulator, current) => {
    const accumulatorValue = parseInt(accumulator[1], 10);
    const currentValue = parseInt(current[1], 10);
    return accumulatorValue < currentValue ? accumulator : current;
  });
};

// // 지정된 지역의 미세먼지 카테고리만 필터링하고, 수치가 가장 좋은 지역을 선택하는 함수 (실시간 조회 api)
// export const filterGangwonDustData = (items, propertyName = 'stationName') => {
//   const filteredGangwon = items
//     .filter(item => gangwondo(item, propertyName))
//     .map(item => [item[propertyName], item.pm10Value]);

//   const goodSpot = filteredGangwon.reduce((accumulator, current) => {
//     const accumulatorValue = parseInt(accumulator[1], 10);
//     const currentValue = parseInt(current[1], 10);
//     return accumulatorValue < currentValue ? accumulator : current;
//   });

//   return goodSpot;
// };

// 추천 지역의 좌표 변환 데이터 (기상청 api에 필요함)
export const coordinateInfo = {
  양양읍: [88, 138],
  주문진읍: [91, 134],
  평창읍: [84, 123],
  '고성(DMZ)': [85, 145],
  금호동: [87, 141],
};

// 과거 일평균 날짜, 지역, 미세먼지수치 객체로 추출하는 함수 (과거 조회 api)
export const filterLocationInfo = (items, propertyName = 'msrstnName') => {
  const filterLocation = items
    .filter(item => gangwondo(item, propertyName))
    .map(item => ({
      msurDt: item.msurDt,
      [propertyName]: item[propertyName],
      pm10Value: item.pm10Value,
    }));
  return filterLocation;
};

// 해당 지역의 미세먼지 평균값 구하는 함수
export const calcAverageDust = items => {
  const location = items[0].msrstnName;
  // 미세먼지 합계를 구하고
  const totalDust = items.reduce((sum, item) => {
    return sum + parseFloat(item.pm10Value); //  현재 배열안의 미세먼지 수치가 문자로 들어가 있어서 숫자로 변환해줌
  }, 0);
  // 평균값 계산 (합계를 항목 수로 나눔) 평균값은 반올림
  const averageDust =
    items.length > 0 ? Math.round(totalDust / items.length).toFixed(2) : 0;

  return [location, Number(averageDust)];
};

// 과거 미세먼지 데이터 이름 변경 로직
export const convertLocationName = {
  양양읍: '양양',
  주문진읍: '강릉',
  평창읍: '평창',
  '고성(DMZ)': '고성',
  금호동: '속초',
};
