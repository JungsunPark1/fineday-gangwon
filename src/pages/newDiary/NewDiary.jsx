import React from 'react';
import styled from 'styled-components';
import DiaryEditor from '../main/components/mainContainer/DiaryEditor';
import Header from '../../components/commonComponents/Header';
import Footer from '../../components/commonComponents/Footer';

const Container = styled.div`
  max-width: 100%;
  position: relative;
`;

const ContentsContainer = styled.div`
  backdrop-filter: blur(20px);
  width: 94vw;
  max-width: 700px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 10px;
  border-left: 1px solid rgba(100, 100, 100, 0.5);
  border-right: 1px solid rgba(100, 100, 100, 0.5);
`;

const NewDiary = () => {
  return (
    <Container>
      {/* <Header pageType='editpage' /> */}
      <ContentsContainer>
        <DiaryEditor />
      </ContentsContainer>
    </Container>
  );
};
export default NewDiary;
