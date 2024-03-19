import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getStringFullDate } from '../../../lib/utils/string_date';

const Container = styled.div`
  /* background-color: green; */
  color: white;
  width: 100%;
  padding-top: 50px;
  position: absolute;
  bottom: 15%;
  left: 0;
  transform: translate(-50%, -50%) rotate(-90deg);
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  text-shadow: 2px 2px 4px #000000;

  @media screen and (max-width: 768px) {
    padding-top: 20px;
    top: 50%;
    left: auto;
    transform: rotate(0);
  }
  @media screen and (max-width: 375px) {
    /* top: 45%; */
    padding-top: 12px;
    gap: 6px;
  }
`;

const StyledCurrentDateTime = styled.p`
  font-family: 'Song Myung', serif;
  font-weight: bold;
  font-style: normal;
  font-weight: 400;
  font-style: normal;
  font-size: 24px;

  @media screen and (max-width: 1023px) {
    font-size: 22px;
  }
  @media screen and (max-width: 768px) {
    font-size: 22px;
  }
  @media screen and (max-width: 375px) {
    font-size: 16px;
  }
`;

const rotateAinimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }`;

// 1초마다 시계 방향으로 돌아가는 애니메이션 효과
const AniImg = styled.img`
  max-width: 28px;
  /* margin-top: 12px; */
  // 360도를 60단계로 나누어 시계초침처럼 움직이게
  animation: ${rotateAinimation} 60s steps(60) infinite;

  @media screen and (max-width: 1023px) {
    max-width: 24px;
  }
  @media screen and (max-width: 768px) {
    max-width: 20px;
    /* margin-top: 10px; */
  }
  @media screen and (max-width: 375px) {
    max-width: 14px;
    /* margin-top: 8px; */
  }
`;

const CurrentDateTime = () => {
  const [date, setDate] = useState(getStringFullDate(new Date()));

  useEffect(() => {
    const updateDate = () => {
      setDate(getStringFullDate(new Date()));

      //1. 현재 시간을 계산해서
      const now = new Date();

      // 2. 다음 분에서 몇초가 남았는지 계산
      const nextUpdateDelay =
        60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
      setTimeout(updateDate, nextUpdateDelay);
    };

    // 첫 시간 업데이트 - 이후에는 1분마다 updateDate호출함.(언마운트 될때까지)
    updateDate();
  }, []);

  return (
    <Container>
      <StyledCurrentDateTime>{date}</StyledCurrentDateTime>
      <AniImg
        src={process.env.PUBLIC_URL + `/assets/tic1.png`}
        alt={'Rotating'}
      />
    </Container>
  );
};

export default CurrentDateTime;
