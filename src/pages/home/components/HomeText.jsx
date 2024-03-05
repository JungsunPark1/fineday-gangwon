import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  background-color: rgba(251, 246, 244, 1);
  width: 48%;
  max-width: 750px;
  box-sizing: border-box;
  border-radius: 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media screen and (max-width: 768px) {
    width: 38%;
  }
  @media screen and (max-width: 550px) {
    width: 100%;
    height: 30%;
  }
`;

const TextContainer = styled.div`
  /* background-color: green; */
  font-size: 20px;
  box-sizing: border-box;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  @media screen and (max-width: 1023px) {
    font-size: 17px;
  }
  @media screen and (max-width: 810px) {
    font-size: 15px;
    align-items: normal;
    padding-left: 12px;
  }
  @media screen and (max-width: 768px) {
    gap: 8px;
    margin-top: 20px;
  }
  @media screen and (max-width: 550px) {
    margin-top: 8px;
  }
`;

const Message = styled.p`
  /* background-color: skyblue; */
  @media screen and (max-width: 768px) {
    margin-top: 18px;
    padding: 0 10px;
    font-size: 16px;
    line-height: 1.5em;
  }
  @media screen and (max-width: 550px) {
    line-height: 1.2em;
    margin-top: 2px;
  }
  @media screen and (max-width: 375px) {
    font-size: 12px;
    line-height: 1em;

    margin-top: 0;
  }
`;

const LinkContainer = styled.div`
  /* background-color: blue; */
  text-align: center;
  font-size: 22px;

  @media screen and (max-width: 1023px) {
    font-size: 22px;
  }
  @media screen and (max-width: 768px) {
    font-size: 19px;
  }
  @media screen and (max-width: 550px) {
    margin-top: 16px;
    font-size: 18px;
    margin-bottom: 16px;
  }
  @media screen and (max-width: 375px) {
  }
`;

const GuestLink = styled.a`
  display: inline-block;
  position: relative;
  letter-spacing: 0.025em;

  &::after {
    content: '';
    position: absolute;
    background: black;
    opacity: 0.5;
    height: 1px;
    bottom: -6px;
    width: 100%;
    left: 0;
    transition: all 0.3s ease;
  }

  &:hover::after {
    width: 50%;
    /* 밑줄이 중앙으로 모이게 */
    left: 25%;
    background: #1e87f0;
  }
  &:hover {
    color: #1e87f0;
  }
`;

const HomeText = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <TextContainer>
        <Message>지금 떠나기 좋은 가장 맑은 지역을 추천해드립니다.</Message>
        <Message>맑은 날의 여행을 기록해보세요.</Message>
        <Message>관심 지역의 미세먼지 추세를 한 눈에 볼 수 있습니다.</Message>
      </TextContainer>

      <LinkContainer>
        <GuestLink onClick={() => navigate(`/main?tab=1`)}>
          추세 확인하기 ↗️
        </GuestLink>
      </LinkContainer>
    </Container>
  );
};

export default HomeText;
