// import { selector } from 'recoil';
// import { fetchDustData } from '../../api/apiServices';
// import { filterGangwonDustData } from '../../utils/apiData';

// export const currentSpotDustSelector = selector({
//   key: 'currentSpotDust',
//   get: async () => {
//     try {
//       const response = await fetchDustData();

//       // 필터링 함수를 사용 5개 지역 추리기
//       const currentSpot = filterGangwonDustData(response);
//       // 가장 좋은 지역과 미세먼지 배열로 나옴
//       return currentSpot;
//     } catch (error) {
//       console.error('실시간 미세먼지 api에러', error);
//       throw error;
//     }
//   },

//   // set: ({ set }, newData) => {
//   //   set(currentSpotAtom, newData); // API로부터 받은 새 데이터로 atom 업데이트
//   // }, -> 컴포넌트에서 해줌
// });
