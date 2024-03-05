// import { selector } from 'recoil';
// import { currentSpotAtom } from '../atom/currentSpot';
// import { fetchWeatherData } from '../../api/apiServices';
// import { coordinateInfo } from '../../utils/apiData';
// import { specialTime, specialDate } from '../../utils/date';

// export const currentTempRainSelector = selector({
//   key: 'currentTempRain',
//   get: async ({ get }) => {
//     const currentSpot = get(currentSpotAtom);
//     if (!currentSpot) return null; // 실시간 미세먼지 최저 지역 데이터가 없으면 null 반환

//     const locationName = currentSpot[0]; // 현재 미세먼지가 가장 낮은 지역 이름
//     const coordinates = coordinateInfo[locationName]; // 지역 이름에 해당하는 좌표

//     if (!coordinates) {
//       throw new Error('좌표정보 없음');
//     }
//     try {
//       const response = await fetchWeatherData(
//         coordinates[0],
//         coordinates[1],
//         specialDate(new Date()),
//         specialTime(new Date())
//       );
//       // 기온과 강수량확률 정보만 추출
//       const tempData = response
//         .filter(weather => weather.category === 'TMP')
//         .map((data, index) => ({ key: index, value: data.fcstValue }));
//       const rainData = response
//         .filter(weather => weather.category === 'POP')
//         .map((data, index) => ({ key: index, value: data.fcstValue }));

//       return {
//         temp: tempData,
//         rain: rainData,
//       };
//     } catch (error) {
//       console.error('실시간 기상정보 api에러', error);
//       throw error;
//     }
//   },
// });
