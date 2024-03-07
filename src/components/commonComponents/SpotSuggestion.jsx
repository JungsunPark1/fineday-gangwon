import React, { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useQuery } from 'react-query';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  currentSpotAtom,
  goseongCurrentAtom,
  yangyangCurrentAtom,
  pyeongchangCurrentAtom,
  gangneungCurrentAtom,
  sokchoCurrentAtom,
} from '../../lib/recoil/atom/currentSpot';
import { fetchDustData } from '../../lib/api/apiServices';
import {
  filterGangwonDustData,
  findGoodSpot,
} from '../../lib/utils/apiLocationData';

const Container = styled.div`
  width: 100%;
  color: #ffffff;

  ${({ $pageType }) =>
    $pageType === 'homepage' &&
    `
    font-family: 'Sunflower', sans-serif;
    font-style: normal;
    margin-top: -50px;
    padding-top: 50px;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    @media screen and (max-width: 768px) {
      top: 40%;
      margin-top: -20px;
      padding-top: 20px;
    }

    @media screen and (max-width: 375px) {
      top: 35%;
      margin-top: -30px;
      padding-top: 30px;
    }`}

  ${({ $pageType }) =>
    $pageType === 'mainpage' &&
    `
    font-family: 'Song Myung', serif;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    display:flex;
    flex-direction:column;
    justify-content: flex-end;

    @media screen and (max-width: 768px) {
      font-size:26px;
    }

    @media screen and (max-width: 550px) {
    }

    @media screen and (max-width: 375px) {
      font-size:18px;
    }
`}
`;

const TextContainer = styled.div`
  ${({ $pageType }) =>
    $pageType === 'homepage' &&
    `
    max-width: 95vw;
    margin: 0 auto;
    font-size: 120px;
    letter-spacing: 0;

    @media screen and (max-width: 1023px) {
    font-size: 12vw;
  }
    `}

  ${({ $pageType }) =>
    $pageType === 'mainpage' &&
    `
    // background-color:pink;
    width:100%;
    display:flex;
    align-items:center;
    gap:11px;

    @media screen and (max-width: 550px) {
      gap:8px;
      justify-content:center;
  }
    `}
`;

// 드롭 효과 애니메이션 정의
const dropAnimation = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SuggestionQuote = styled.h2`
  font-size: 100%;
  opacity: 0;
  transform: translateY(-1em);
  //애니메이션 지속시간
  animation: ${dropAnimation} 0.5s forwards;
  // 애니메이션 시작 지연
  animation-delay: 0.8s;

  ${({ $pageType }) =>
    $pageType === 'homepage' &&
    `
    margin-bottom: 0.2em;
    font-weight: 700;
    `}

  ${({ $pageType }) =>
    $pageType === 'mainpage' &&
    `
    `}
`;

const AnimatedText = styled.div`
  ${({ $pageType }) =>
    $pageType === 'homepage' &&
    `
    font-weight: 300;
    font-size: 80%;
    `}

  ${({ $pageType }) =>
    $pageType === 'mainpage' &&
    `
    `}
`;

const AnimatedSpan = styled.span`
  display: inline-block;
  opacity: 0;
  top: 0px;
  transform: translateY(-1em);
  animation: ${dropAnimation} 0.6s forwards;
  animation-delay: ${({ delay }) => delay || '0s'};
  position: relative;
`;

const LinkContainer = styled.div`
  margin-top: 40px;
  font-size: 22px;

  @media screen and (max-width: 1023px) {
    margin-top: 20px;
    font-size: 22px;
  }
  @media screen and (max-width: 768px) {
    font-size: 19px;
  }
  @media screen and (max-width: 375px) {
    font-size: 13px;
    margin-top: 15px;
  }
`;
const GuestLink = styled.a`
  display: inline-block;
  position: relative;
  letter-spacing: 0.025em;
  opacity: 0;
  animation: ${dropAnimation} 1s forwards;
  animation-delay: 2.5s;

  &::after {
    content: '';
    position: absolute;
    background: #fff;
    opacity: 0.5;
    height: 1px;
    bottom: -6px;
    width: 100%;
    left: 0;
    transition: all 0.3s ease;
  }

  &:hover::after {
    width: 50%;
    /* 밑줄이 중앙으로 모이게 */
    left: 25%;
    background: #1e87f0;
  }
  &:hover {
    color: #1e87f0;
  }
`;

const SpotSuggestion = ({ pageType }) => {
  const navigate = useNavigate();

  const setCurrentSpot = useSetRecoilState(currentSpotAtom);
  const setGoseongCurrent = useSetRecoilState(goseongCurrentAtom);
  const setYangyangCurrent = useSetRecoilState(yangyangCurrentAtom);
  const setPyeongchangCurrent = useSetRecoilState(pyeongchangCurrentAtom);
  const setGangneungCurrent = useSetRecoilState(gangneungCurrentAtom);
  const setSokchoCurrent = useSetRecoilState(sokchoCurrentAtom);
  const currentSpot = useRecoilValue(currentSpotAtom);


  //const { data, isError, isLoading, refetch } = useQuery(
  const { refetch } = useQuery(
    'dustData',
    fetchDustData,
    {
      // onSuccess ->useQuery에서 사용함. 비동기 요청 성공시 실행되는 콜백함수 정의!
      onSuccess: data => {
        // 데이터 fetch 성공 시, Recoil Atom 업데이트
        if (data && data.length > 0) {
          let fiveSpot = filterGangwonDustData(data);
          // console.log(fiveSpot);
          // 데이터가 제대로 나지 않을 경우 강릉 데이터로 교체
          const gangneungData = fiveSpot.find(([name]) => name === '주문진읍');
          // 강릉 데이터가 없을 수 있으므로 없으면 0을
          const gangneungValue = gangneungData ? gangneungData[1] : '0';

          // 데이터의 value가 숫자가 아닐 경우
          fiveSpot.forEach(spot => {
            const [name, value] = spot;
            const replaceValue = isNaN(parseInt(value, 10))
              ? parseInt(gangneungValue, 10)
              : parseInt(value, 10);

            // 각각의 recoil atom 업데이트
            switch (name) {
              case '고성(DMZ)':
                setGoseongCurrent([name, replaceValue]);
                break;
              case '양양읍':
                setYangyangCurrent([name, replaceValue]);
                break;
              case '평창읍':
                setPyeongchangCurrent([name, replaceValue]);
                break;
              case '주문진읍':
                setGangneungCurrent([name, replaceValue]);
                break;
              case '금호동':
                setSokchoCurrent([name, replaceValue]);
                break;
              default:
                break;
            }
          });
          const bestSpot = findGoodSpot(fiveSpot);
          setCurrentSpot(bestSpot);
          // console.log(bestSpot);
        }
      },
    }
  );

  // 실시간이다 보니 너무 리프레쉬가 잦아서 30분 주기로 api요청, 보통 리액트 쿼리에서는 useEffect을 같이 사용하지 않는데..
  // 이 프로젝트의 경우 부득이 같이 사용.
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 1800000);

    // 컴포넌트 언마운트시 요청 정리
    return () => clearInterval(intervalId);
  }, [refetch]);

  // if (isLoading)
  //   return (
  //     <SuggestionQuote $homepage={homepage}>
  //       데이터를 불러오는 중입니다.
  //     </SuggestionQuote>
  //   );
  // if (isError)
  //   return (
  //     <SuggestionQuote $homepage={homepage}>
  //       통신이 불안정 합니다!
  //     </SuggestionQuote>
  //   );

  const [locationName] = currentSpot ?? [];

  const addPostposition = {
    양양읍: '양양으로',
    주문진읍: '강릉으로',
    평창읍: '평창으로',
    '고성(DMZ)': '고성으로',
    금호동: '속초로',
  };

  const quoteName = locationName
    ? addPostposition[locationName] || locationName
    : '지역 정보 없음';

  return (
    <Container $pageType={pageType}>
      <TextContainer $pageType={pageType}>
        <SuggestionQuote $pageType={pageType}>{quoteName}</SuggestionQuote>
        <AnimatedText $pageType={pageType}>
          <AnimatedSpan style={{ animationDelay: '1.3s' }}>당</AnimatedSpan>
          <AnimatedSpan style={{ animationDelay: '1.4s' }}>장</AnimatedSpan>
          <AnimatedSpan style={{ animationDelay: '1.4s' }}>&nbsp;</AnimatedSpan>
          <AnimatedSpan style={{ animationDelay: '1.5s' }}>떠</AnimatedSpan>
          <AnimatedSpan style={{ animationDelay: '1.6s' }}>나</AnimatedSpan>
          <AnimatedSpan style={{ animationDelay: '1.7s' }}>기</AnimatedSpan>
          <AnimatedSpan style={{ animationDelay: '1.7s' }}>&nbsp;</AnimatedSpan>
          <AnimatedSpan style={{ animationDelay: '1.8s' }}>좋</AnimatedSpan>
          <AnimatedSpan style={{ animationDelay: '1.9s' }}>은</AnimatedSpan>
          <AnimatedSpan style={{ animationDelay: '1.9s' }}>&nbsp;</AnimatedSpan>
          <AnimatedSpan style={{ animationDelay: '2.0s' }}>날</AnimatedSpan>
        </AnimatedText>
      </TextContainer>
      {/* {pageType === 'homepage' && (
        <LinkContainer>
          <GuestLink onClick={() => navigate(`/main?tab=2`)}>
            기록하기
          </GuestLink>
        </LinkContainer>
      )} */}
    </Container>
  );
};

export default SpotSuggestion;
