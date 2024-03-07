import React from 'react';
import styled from 'styled-components';
import Header from '../../components/commonComponents/Header';
import SpotSuggestion from '../../components/commonComponents/SpotSuggestion';
import CurrentDateTime from './components/CurrentDateTime';
import CurrentSpotWeather from './components/CurrentSpotWeather';

const Container = styled.div`
  width: 100%;
  color: #fff;
  position: relative;
`;

const ContentsContainer = styled.div`
  backdrop-filter: blur(20px);
  width: 94vw;
  max-width: 1200px;
  min-height: 100.1vh;
  margin: 0 auto;
  border-left: 1px solid rgba(100, 100, 100, 0.5);
  border-right: 1px solid rgba(100, 100, 100, 0.5);
  /* padding-top: 200px; */
`;

const BackTopImg = styled.img`
  position: absolute;
  width: 650px;
  top: 24px;
  right: 0;
  transform: translateX(15%);
  @media screen and (max-width: 1200px) {
    transform: translateX(35%);
  }
  @media screen and (max-width: 1023px) {
    width: 490px;
    transform: translateX(25%);
  }
  @media screen and (max-width: 768px) {
    width: 330px;
  }
  @media screen and (max-width: 375px) {
    width: 140px;
  }
`;
const BackBottomImg = styled.img`
  position: absolute;
  width: 650px;
  bottom: 10px;
  left: 0;
  transform: translateX(-15%);

  @media screen and (max-width: 1200px) {
    transform: translateX(-35%);
  }

  @media screen and (max-width: 1023px) {
    width: 490px;
  }

  @media screen and (max-width: 768px) {
    width: 330px;
  }
  @media screen and (max-width: 375px) {
    width: 140px;
  }
`;

const FirstHomeContainer = () => {
  return (
    <Container>
      <Header pageType='homepage' />
      <BackTopImg src={process.env.PUBLIC_URL + `/assets/moon.png`} />
      <BackBottomImg src={process.env.PUBLIC_URL + `/assets/star.png`} />
      <ContentsContainer>
        <SpotSuggestion pageType='homepage' />
        <CurrentDateTime />
        <CurrentSpotWeather />
      </ContentsContainer>
    </Container>
  );
};

export default FirstHomeContainer;
