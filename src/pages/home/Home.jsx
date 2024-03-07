import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Carousel, ConfigProvider } from 'antd';
import FirstHomeContainer from './FirstHomeContainer';
import SecondHomeContainer from './SecondHomeContainer';

const Container = styled.div`
  max-width: 100vw;
  // 아래 두개가 필수적인 스크롤 이벤트 핵심 프로퍼티
  max-height: 100vh;
  overflow-y: auto;
  //
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  
`;

const SliderContainer = styled.div`
  position: fixed;
  bottom: 4%;
  left: 0;
  width: 100%;
  z-index: 99999;
`;

const CarouselSlider = styled.div`
  height: 24px;
  color: white;
  line-height: 160px;
  text-align: center;
  /* background-color: rgba(193, 226, 63, 0.2); */
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
    <Container ref={containerRef}>
      {!isScrolled ? <FirstHomeContainer /> : <SecondHomeContainer />}
      <SliderContainer>
        <ConfigProvider
          theme={{
            components: {
              Carousel: {
                dotActiveWidth: 85,
                dotWidth: 60,
                dotHeight: 4,
              },
            },
          }}
        >
          <Carousel dotPosition='bottom' ref={carouselRef}>
            <CarouselSlider></CarouselSlider>
            <CarouselSlider></CarouselSlider>
          </Carousel>
        </ConfigProvider>
      </SliderContainer>
    </Container>
  );
};

export default Home;
