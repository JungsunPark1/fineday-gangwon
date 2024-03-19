import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SpotSuggestion from './SpotSuggestion';

const HeaderContainer = styled.div`
  width: 100%;
  position: absolute;
  z-index: 999999;

  ${({ $pageType }) =>
    $pageType === 'homepage' &&
    ` 
    `}

  ${({ $pageType }) =>
    $pageType === 'mainpage' &&
    `
    position: static;
    display: flex;
    gap:32px;

    @media screen and (max-width: 768px) {
      gap:18px;
  }

    @media screen and (max-width: 550px) {
      flex-direction: column;
  }

    @media screen and (max-width: 375px) {
 
  }
  `}

${({ $pageType }) =>
    $pageType === 'editpage' &&
    ` 
    // position: relative;
    `}
`;

const ImgContainer = styled.div`
  cursor: pointer;
  max-width: 230px;
  height: auto;

  @media screen and (max-width: 1023px) {
    width: 200px;
    margin-top: 5%;
  }
  @media screen and (max-width: 768px) {
    width: 145px;
  }
  @media screen and (max-width: 375px) {
    width: 110px; // 모바일 화면에서의 로고 이미지 가로 크기
  }

  ${({ $pageType }) =>
    ($pageType === 'homepage' || $pageType === 'editpage') &&
    `
    position: absolute;
    left:100px; 
    margin-top:90px;

    @media screen and (max-width: 1023px) {
    left: 5%;
  }
    `}

  ${({ $pageType }) =>
    $pageType === 'mainpage' &&
    `
    flex-shrink:0;
    margin-left:100px;
    margin-top:90px;

    @media screen and (max-width: 1023px) {
    margin-left:5%;
  }
    `}
`;

const LogoImg = styled.img`
  width: 100%;
`;

const Header = ({ pageType }) => {
  const navigate = useNavigate();
  const location = useLocation(); //현재의 URL을 받아옴
  const isHomePath = location.pathname === '/';
  const isEditorPath = location.pathname === '/newDiary';

  return (
    <HeaderContainer $pageType={pageType}>
      <ImgContainer $pageType={pageType}>
        <LogoImg
          src={process.env.PUBLIC_URL + `/assets/home_logo_w.png`}
          onClick={() => navigate(`/`)}
          alt={'home_logo'}
        />
      </ImgContainer>
      <>
        {/* 홈, 에딧페이지에서는  안보여주기 */}
        {!isHomePath && !isEditorPath && <SpotSuggestion pageType='mainpage' />}
      </>
    </HeaderContainer>
  );
};

export default Header;
