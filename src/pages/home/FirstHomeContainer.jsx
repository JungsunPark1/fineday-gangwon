import React from 'react';
import styled from 'styled-components';
import Header from '../../components/commonComponents/Header';
import SpotSuggestion from '../../components/commonComponents/SpotSuggestion';
import CurrentDateTime from './components/CurrentDateTime';
import CurrentSpotWeather from './components/CurrentSpotWeather';

const Container = styled.div`
  width: 100%;
  color: #fff;
`;

const ContentsContainer = styled.div`
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  width: 94vw;
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
`;

const FirstHomeContainer = () => {
  return (
    <Container>
      <Header pageType='homepage' />
      <ContentsContainer>
        <SpotSuggestion pageType='homepage' />
        <CurrentDateTime />
        <CurrentSpotWeather />
      </ContentsContainer>
    </Container>
  );
};

export default FirstHomeContainer;
