import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FirstHomeContainer from './FirstHomeContainer';
import SecondHomeContainer from './SecondHomeContainer';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const ContentsContainer = styled.div`
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  width: 94vw;
  max-width: 1200px;
  margin: 0 auto;
  border-left: 1px solid rgba(100, 100, 100, 0.5);
  border-right: 1px solid rgba(100, 100, 100, 0.5);
`;

const BackTopImg = styled.img`
  position: absolute;
  width: 30vw;
  top: 5%;
  right: 0;
  transform: translateX(-15%);
`;
const BackBottomImg = styled.img`
  position: absolute;
  width: 30vw;
  bottom: 5%;
  left: 0;
  transform: translateX(15%);
`;

const Home = () => {
  const containerRef = useRef(null);
  // 현재 마운트된 컴포넌트 섹션을 저장함
  const [isScrolled, setIsScrolled] = useState(false);
  // Carousel에 대한 참조 추가(슬라이더)
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // containerRef.current가 존재하고 스크롤 위치가 0보다 크면 isScrolled를 true로 설정
      if (containerRef.current) {
        const isScrolled = containerRef.current.scrollTop > 0;
        setIsScrolled(isScrolled);

        //스크롤하는걸로 카루쎌도 조절
        if (carouselRef.current) {
          // 스크롤이 되었으면 두 번째 슬라이드, 아니면 첫 번째 슬라이드로 이동
          const slideIndex = isScrolled ? 1 : 0;
          // 슬라이드를 조절. 애니메이션(true/false)
          carouselRef.current.goTo(slideIndex, false);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <Container>
      <BackTopImg src={process.env.PUBLIC_URL + `/assets/moon.png`} />
      <BackBottomImg src={process.env.PUBLIC_URL + `/assets/star.png`} />
      <ContentsContainer>
        <FirstHomeContainer />
        <SecondHomeContainer />
      </ContentsContainer>
    </Container>
  );
};

export default Home;
