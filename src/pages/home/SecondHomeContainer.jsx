import React from 'react';
import styled from 'styled-components';
import SpotSuggestionChart from './components/SpotSuggestionChart';
import HomeText from './components/HomeText';

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-style: normal;
  font-weight: 300;
`;

const ContentsContainer = styled.div`
  /* backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px); */
  width: 94vw;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 40px;
`;
const TextBox = styled.div`
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 90px;
  box-sizing: border-box;
  width: 100%;
  height: 40vh;
  margin: 0 auto;
  padding: 0 40px;
  border-radius: 30px;
  background-color: rgba(65, 62, 88, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-sizing: border-box;
  color: #ffffff;

  @media screen and (max-width: 768px) {
    height: 35vh;
  }
  @media screen and (max-width: 550px) {
    height: 13vh;
  }
  @media screen and (max-width: 375px) {
  }
`;

const FlexLine = styled.div`
  height: 2px;
  /* background: rgba(100, 100, 100, 0.8); */
  background: #ffffff;
  opacity: 0.5;
  width: 100%;
  /* box-shadow: 2px 2px 4px #000000; */

  @media screen and (max-width: 550px) {
    display: none;
  }
`;

const MainText = styled.p`
  font-size: 95%;
  font-weight: 900;

  @media screen and (max-width: 1023px) {
    font-size: 90%;
  }
  @media screen and (max-width: 768px) {
    font-size: 70%;
  }

  @media screen and (max-width: 640px) {
    font-size: 60%;
  }
  @media screen and (max-width: 550px) {
    font-size: 25%;
  }
  @media screen and (max-width: 375px) {
    font-size: 20%;
  }
`;

const SubText = styled.p`
  font-weight: 500;
  font-size: 23%;
  padding-bottom: 10px;

  @media screen and (max-width: 1023px) {
    font-size: 23%;
  }
  @media screen and (max-width: 768px) {
    font-size: 20%;
  }
  @media screen and (max-width: 550px) {
    display: none;
  }
  @media screen and (max-width: 375px) {
    font-size: 16%;
  }
`;

const BottomContainer = styled.div`
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-style: normal;
  font-weight: 500;
  color: #ffffff;
  box-sizing: border-box;
  width: 100%;
  height: 45vh;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  // 크기 줄어들면 높이 조절?

  @media screen and (max-width: 550px) {
    height: 70vh;
    flex-direction: column;
    justify-content: space-around;
  }
  @media screen and (max-width: 375px) {
  }
`;

const SecondHomeContainer = () => {
  return (
    <Container>
      <ContentsContainer>
        <TextBox>
          <MainText>Recommend the clearest area in Gangwon-do</MainText>
          <FlexLine />
          <SubText>
            Five fine dust trends can be found in Goseong, Pyeongchang,
            Gangneung, Sokcho, and Yangyang over the past week.
          </SubText>
        </TextBox>
        <BottomContainer>
          <SpotSuggestionChart />
          <HomeText />
        </BottomContainer>
      </ContentsContainer>
    </Container>
  );
};

export default SecondHomeContainer;
