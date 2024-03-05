import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  color: rgba(100, 100, 100, 0.8);
  /* border-top: 1px solid rgba(100, 100, 100, 0.8); */
  width: 100%;
  /* position: relative; */
  bottom: 0;
  z-index: 99999;
`;

const FooterContent = styled.p`
  backdrop-filter: blur(20px);
  padding: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        서울시 영등포구 당산동 | 대표 : 박정선 | 사업자등록번호 100-00-00000 |
        통신판매업신고: 2023-00000 문의: yjhs0520@naver.com Copyright Fineday,
        INC All Rights Reserved.
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
