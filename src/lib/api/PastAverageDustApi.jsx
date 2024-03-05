import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getYesterdaysStringDate, getSevenDaysBeforeDate } from '../utils/date';

// 홈화면에서 보여주는 추천지역과 순위 컴포넌트, 메인에서 차트에 필요(에어코리아)
// 측정소별 과거 일평균 정보 조회 ( 오늘 이전 6일치 미세먼지 데이터)
const URL =
  'http://apis.data.go.kr/B552584/ArpltnStatsSvc/getMsrstnAcctoRDyrg?serviceKey=Yr6jP9pcxIeobwpMRKwBXBuNVz1pZ3BX3hTp5d7cTL08bO%2F3fudgUVk82zJdmAJ9xFzEmgnlXXLM%2FcGWJgLjtA%3D%3D';
const privateKey = process.env.REACT_APP_API_KEY;

const PastAverageDustApi = () => {
  // 데이터 로딩, 에러 상태 관리
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log(privateKey);

    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await axios.get(URL, {
          params: {
            // serviceKey: privateKey,
            inqBginDt: getSevenDaysBeforeDate(new Date()),
            inqEndDt: getYesterdaysStringDate(new Date()),
            returnType: 'json',
            msrstnName: '간성읍',
          },
        });
        setData(response.data);

        console.log(response.data);
      } catch (err) {
        setError(`에러: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>데이터 없음</div>;

  return (
    <div>
      <h1>⭐️ 측정소별 실시간 일평균 정보 조회 (오늘 이전)⭐️</h1>
      {/* 데이터 로딩 상태 표시 */}
      {/* {data ? <div>{JSON.stringify(data)}</div> : <p>데이터 로딩 중...</p>} */}
      {/* <div>{JSON.stringify(data, null, 2)}</div> */}
    </div>
  );
};

export default PastAverageDustApi;
