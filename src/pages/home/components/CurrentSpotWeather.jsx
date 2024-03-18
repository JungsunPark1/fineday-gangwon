import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { currentSpotAtom } from '../../../lib/recoil/atom/currentSpot';
import { fetchWeatherData } from '../../../lib/api/apiServices';
import { coordinateInfo } from '../../../lib/utils/apiLocationData';
import { specialDate, specialTime } from '../../../lib/utils/date';

const Container = styled.div`
  width: 100%;
  font-family: 'Sunflower', sans-serif;
  font-weight: 100;
  font-style: normal;
  font-size: 24px;
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
`;

const TextContainer = styled.div`
  width: 85%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1023px) {
  }
  @media (max-width: 768px) {
    display: block;
    font-size: 20px;

    > *:not(:last-child) {
      /* 블럭레벨일 때 수직 간격 추가 */
      margin-bottom: 12px;
    }
  }
  @media screen and (max-width: 375px) {
    font-size: 16px;
  }
`;

const CurrentLocation = styled.p``;

const WeatherTextBox = styled.div`
  display: flex;
  gap: 12px;

  @media screen and (max-width: 515px) {
    flex-direction: column;
    font-size: 18px;
  }
  @media screen and (max-width: 375px) {
    font-size: 14px;
  }
`;
const WeatherText = styled.p``;

const CurrentSpotWeather = () => {
  const currentSpotInfo = useRecoilValue(currentSpotAtom);
  const [locationName, dustLevel] = currentSpotInfo;
  const coordinates = coordinateInfo[locationName]; // 지역 이름에 해당하는 좌표

  //지역 날씨 api 데이터 가져오기
  const {
    data: weatherData,
    isError,
    isLoading,
  } = useQuery(
    ['weatherData', coordinates], // 쿼리 키에 좌표를 포함시켜 날씨 데이터 캐싱 구분
    () =>
      fetchWeatherData(
        coordinates[0],
        coordinates[1],
        specialDate(new Date()),
        specialTime(new Date())
      ),
    {
      enabled: !!coordinates, // 좌표가 유효할 때만 쿼리 실행
    }
  );

  // 조건부 랜더링.
  if (isLoading) return <div>잠시만 기다려주세요!</div>;
  if (isError) return <div>잠시 후 다시 시도해주세요!</div>;

  // 기온TMP, 강수확률POP, 강수량PCP
  let temperature = '데이터 없음';
  let rainProbability = '데이터 없음';

  if (weatherData) {
    const tempData = weatherData
      .filter(weather => weather.category === 'TMP')
      .map(data => data.fcstValue)[0]; // 첫 번째 TMP 데이터를 사용
    temperature = tempData ?? temperature;

    const rainProbabilityData = weatherData
      .filter(weather => weather.category === 'POP')
      .map(data => data.fcstValue)[0]; // 첫 번째 카테고리 'POP' 데이터를 사용
    rainProbability = rainProbabilityData ?? rainProbability;
  }

  const addPostposition = {
    양양읍: '양양은',
    주문진읍: '강릉은',
    평창읍: '평창은',
    '고성(DMZ)': '고성은',
    금호동: '속초는',
  };

  const quoteName = addPostposition[locationName] || `${locationName}은`;

  return (
    <Container>
      <TextContainer>
        <CurrentLocation>지금 {quoteName}.</CurrentLocation>
        <WeatherTextBox>
          <WeatherText>미세먼지 수치 {dustLevel}㎍/m³</WeatherText>
          <WeatherText>온도 {temperature}℃</WeatherText>
          <WeatherText>강수확률 {rainProbability}%</WeatherText>
          {/* <WeatherText>강수량 {rainfall}</WeatherText> */}
        </WeatherTextBox>
      </TextContainer>
    </Container>
  );
};

export default CurrentSpotWeather;
