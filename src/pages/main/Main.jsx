import React from 'react';

import styled from 'styled-components';
import MainView from './components/MainView';
import Header from '../../components/commonComponents/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const ContentsContainer = styled.div`
  /* flex: 1; */
  width: 94vw;
  max-width: 1200px;
  margin: 0 auto;

`;

const Main = () => {
  return (
    <Container>
     
        <Header pageType='mainpage' />

      <ContentsContainer>
        <MainView />
      </ContentsContainer>
    </Container>
  );
};
export default Main;
