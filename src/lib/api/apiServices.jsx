import axios from 'axios';

// const privateKey = encodeURIComponent(process.env.REACT_APP_API_KEY);
// const privateKey = process.env.REACT_APP_API_KEY;

// 실시간 강원도 미세먼지 조회 - 	시도별 실시간 측정정보 조회
export const fetchDustData = async () => {
  const URL =
    'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=Yr6jP9pcxIeobwpMRKwBXBuNVz1pZ3BX3hTp5d7cTL08bO%2F3fudgUVk82zJdmAJ9xFzEmgnlXXLM%2FcGWJgLjtA%3D%3D';
  try {
    const response = await axios(URL, {
      params: {
        returnType: 'json',
        numOfRows: 100,
        sidoName: '강원',
      },
    });
    return response.data.response.body.items;
  } catch (error) {
    throw error;
  }
};

// 현재 추천지역 날씨 정보 (기상청) - 기온, 강수량 - 단기예보조회(기상청)
export const fetchWeatherData = async (nx, ny, specialDate, specialTime) => {
  const URL =
    'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=Yr6jP9pcxIeobwpMRKwBXBuNVz1pZ3BX3hTp5d7cTL08bO%2F3fudgUVk82zJdmAJ9xFzEmgnlXXLM%2FcGWJgLjtA%3D%3D';
  try {
    const response = await axios.get(URL, {
      params: {
        returnType: 'json',
        numOfRows: 10,
        pageNo: 1,
        dataType: 'json',
        base_date: specialDate,
        base_time: specialTime,
        nx: nx,
        ny: ny,
      },
    });
    return response.data.response.body.items.item;
  } catch (error) {
    throw error;
  }
};

// 지역별 과거 평균 데이터
export const fetchPastDustData = async (
  getSevenDaysBeforeDate,
  getYesterdaysStringDate,
  msrstnName
) => {
  const URL =
    'https://apis.data.go.kr/B552584/ArpltnStatsSvc/getMsrstnAcctoRDyrg?serviceKey=Yr6jP9pcxIeobwpMRKwBXBuNVz1pZ3BX3hTp5d7cTL08bO%2F3fudgUVk82zJdmAJ9xFzEmgnlXXLM%2FcGWJgLjtA%3D%3D';
  try {
    const response = await axios.get(URL, {
      params: {
        inqBginDt: getSevenDaysBeforeDate,
        inqEndDt: getYesterdaysStringDate,
        returnType: 'json',
        msrstnName: msrstnName,
      },
    });
    return response.data.response.body.items;
  } catch (error) {
    throw error;
  }
};
