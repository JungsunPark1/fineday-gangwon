import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import DiaryEditor from '../main/components/mainContainer/DiaryEditor';

const Container = styled.div`
  background-color: black;
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

const EditDiary = () => {
  // URL로부터 diaryId를 추출하기
  const { diaryId } = useParams();
  // 편집할 일기 데이터를 상태로 관리
  const [diaryData, setDiaryData] = useState(null);

  useEffect(() => {
    // 일기 데이터를 로드하는 로직
    const loadedDiaries = JSON.parse(localStorage.getItem('diaries')) || [];
    const diary = loadedDiaries.find(
      diary => diary.id === parseInt(diaryId, 10)
    );
    setDiaryData(diary);
  }, [diaryId]);

  return (
    <Container>
      <ContentsContainer>
        {diaryData ? (
          <DiaryEditor isEdit={true} originData={diaryData} />
        ) : (
          <p>로딩중...</p>
        )}
      </ContentsContainer>
    </Container>
  );
};
export default EditDiary;
