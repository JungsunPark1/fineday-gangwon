import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';
import { useQueries } from 'react-query';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { fetchPastDustData } from '../../../lib/api/apiServices';
import {
  goseongPastAtom,
  yangyangPastAtom,
  pyeongchangPastAtom,
  gangneungPastAtom,
  sokchoPastAtom,
} from '../../../lib/recoil/atom/gangwonPastDust';
import {
  getYesterdaysStringDate,
  getSevenDaysBeforeDate,
} from '../../../lib/utils/date';
import {
  filterLocationInfo,
  calcAverageDust,
} from '../../../lib/utils/apiLocationData';
import {
  convertLocationName
} from '../../../lib/utils/apiLocationData';

const Container = styled.div`
  background-color: rgba(251, 246, 244, 1);
  width: 48%;
  max-width: 750px;
  height: 100%;
  box-sizing: border-box;
  border-radius: 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media screen and (max-width: 768px) {
    width: 60%;
  }
  @media screen and (max-width: 550px) {
    width: 100%;
    height: 65%;
    /* padding: 0 50px; */
  }
`;

const ChartContainer = styled.div`
  /* background-color: orange; */
  box-sizing: border-box;
  height: 75%;
  /*flex-grow, flex-shrink, flex-basis 설정 */
  flex: 1 1 auto;

  @media screen and (max-width: 550px) {
  }
  @media screen and (max-width: 375px) {
  }
`;

const TextBox = styled.div`
  /* background-color: beige; */
  /* text-align: center; */
  font-size: 16px;
  line-height: 1.5em;
  /*flex-grow, flex-shrink, flex-basis 설정 */
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1023px) {
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
  @media screen and (max-width: 550px) {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  @media screen and (max-width: 375px) {
    font-size: 12px;
  }
`;

const BestSpot = styled.p``;

const Message = styled.p``;

const SpotSuggestionChart = () => {
  const locationAtoms = {
    '고성(DMZ)': goseongPastAtom,
    양양읍: yangyangPastAtom,
    평창읍: pyeongchangPastAtom,
    주문진읍: gangneungPastAtom,
    금호동: sokchoPastAtom,
  };
  // 지역정보 아톰에 저장
  const setGoseongPastState = useSetRecoilState(goseongPastAtom);
  const setYangyangPastState = useSetRecoilState(yangyangPastAtom);
  const setPyeongchangPastState = useSetRecoilState(pyeongchangPastAtom);
  const setGangneungPastState = useSetRecoilState(gangneungPastAtom);
  const setSokchoPastState = useSetRecoilState(sokchoPastAtom);

  // 지역별 평균값을 구하기 위해 아톰 값 읽기
  const goseongData = useRecoilValue(goseongPastAtom);
  const yangyangData = useRecoilValue(yangyangPastAtom);
  const pyeongchangData = useRecoilValue(pyeongchangPastAtom);
  const gangneungData = useRecoilValue(gangneungPastAtom);
  const sokchoData = useRecoilValue(sokchoPastAtom);

  // 과거미세먼지 데이터 로컬 스토리지에 저장하는 로직(당일)
  const saveToLocalStorage = (msrstnName, data) => {
    try {
      // yyyy-mm-dd
      const today = new Date().toISOString().slice(0, 10);
      const dataWithDate = { data, date: today };
      localStorage.setItem(
        `pastDustData_${msrstnName}`,
        JSON.stringify(dataWithDate)
      );
    } catch (error) {
      console.error('로컬 스토리지 저장 실패', error);
    }
  };
  // 데이터 로드시 오늘 날짜랑 로컬스토리지 날짜랑 일치하는지 유효성 확인
  const loadDataWithDailyCheck = msrstnName => {
    const itemStr = localStorage.getItem(`pastDustData_${msrstnName}`);
    if (!itemStr) return { data: null, isValid: false };

    const { data, date } = JSON.parse(itemStr);
    const today = new Date().toISOString().slice(0, 10);
    return { data, isValid: date === today };
  };

  // 데이터가 숫자가 아닐 경우 정상적인 pm10Value의 값을 찾는 로직
  const findLastValue = data => {
    for (let i = data.length - 1; i >= 0; i--) {
      const value = parseInt(data[i].pm10Value, 10);
      if (!isNaN(value)) {
        return data[i].pm10Value;
      }
    }
    // 도저히 안되면 그냥 0...
    return '0';
  };

  const fetchDataQueries = Object.entries(locationAtoms).map(([msrstnName]) => {
    return {
      queryKey: ['pastDustData', msrstnName],
      queryFn: async () => {
        // 로컬 스토리지에서 데이터 검증
        const cachedData = loadDataWithDailyCheck(msrstnName);
        // 유효한 캐시된 데이터 반환, API 호출 없이 해당 데이터 반환
        if (cachedData.isValid) {
          return cachedData.data;
        } else {
          // API 호출하여 새로운 데이터 가져오기
          try {
            const newData = await fetchPastDustData(
              getSevenDaysBeforeDate(new Date()),
              getYesterdaysStringDate(new Date()),
              msrstnName
            );
            // console.log(newData);
            return newData;
          } catch (error) {
            console.error(`Error fetching data for ${msrstnName}:`, error);
            // 에러를 다시 throw하여 React Query가 캐치할 수 있도록 함
            throw error;
          }
        }
      },
      onSuccess: data => {
        //  데이터 fetch 성공 시, Recoil Atom 업데이트
        if (data && data.length > 0) {
          let pastDustHistory = data.map(item => {
            const pm10Value = parseInt(item.pm10Value, 10);
            return {
              ...item,
              pm10Value: isNaN(pm10Value)
                ? findLastValue(data)
                : item.pm10Value,
            };
          });
          pastDustHistory = filterLocationInfo(pastDustHistory);
          //로컬에 저장
          saveToLocalStorage(msrstnName, pastDustHistory);

          // console.log(pastDustHistory);
          // 각각의 recoil atom 업데이트
          switch (msrstnName) {
            case '고성(DMZ)':
              setGoseongPastState(pastDustHistory);
              break;
            case '양양읍':
              setYangyangPastState(pastDustHistory);
              break;
            case '평창읍':
              setPyeongchangPastState(pastDustHistory);
              break;
            case '주문진읍':
              setGangneungPastState(pastDustHistory);
              break;
            case '금호동':
              setSokchoPastState(pastDustHistory);
              break;
            default:
              break;
          }
        }
      },
    };
  });

  useQueries(fetchDataQueries);

  // const results = useQueries(fetchDataQueries);

  // //각 지역별로 useQueries를 사용하여 여러개의 API 요청
  // useQueries(
  //   Object.entries(locationAtoms).map(([msrstnName]) => ({
  //     queryKey: ['pastDustData', msrstnName],
  //     queryFn: () =>
  //       fetchPastDustData(
  //         getSevenDaysBeforeDate(new Date()),
  //         getYesterdaysStringDate(new Date()),
  //         msrstnName
  //       ),
  //     onSuccess: data => {
  //       // 데이터 fetch 성공 시, Recoil Atom 업데이트
  //       if (data && data.length > 0) {
  //         const pastDustHistory = filterLocationInfo(data);
  //         console.log(pastDustHistory);
  //         // 각각의 recoil atom 업데이트
  //         switch (msrstnName) {
  //           case '고성(DMZ)':
  //             setGoseongPastState(pastDustHistory);
  //             break;
  //           case '양양읍':
  //             setYangyangPastState(pastDustHistory);
  //             break;
  //           case '평창읍':
  //             setPyeongchangPastState(pastDustHistory);
  //             break;
  //           case '주문진읍':
  //             setGangneungPastState(pastDustHistory);
  //             break;
  //           case '금호동':
  //             setSokchoPastState(pastDustHistory);
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     },
  //   }))
  // );

  // 각 지역 평균값과 정보를 담은 배열
  //  useMemo를 사용하여 averagesInfo를 계산하고, 이 배열이 변하지 않는 한 재계산되지 않도록..
  const averagesInfo = useMemo(() => {
    const atomData = [
      goseongData,
      yangyangData,
      pyeongchangData,
      gangneungData,
      sokchoData,
    ];
    // console.log(atomData);
    // 각 지역별 미세먼지 평균값 계산
    const calculatedAverages = atomData.map(data => calcAverageDust(data));

    // 계산된 평균값으로 정렬
    calculatedAverages.sort((a, b) => a[1] - b[1]);

    return calculatedAverages;
  }, [goseongData, yangyangData, pyeongchangData, gangneungData, sokchoData]);

  // console.log(averagesInfo);

  // 차트 데이터 생성
  const homeChartData = averagesInfo.map(info => ({
    region: convertLocationName[info[0]],
    value: info[1],
  }));

  // console.log(homeChartData);

  const firstRegion = homeChartData[0].region;
  // console.log(firstRegion);

  // //차트에 넣어주기 위한 지역 이름
  // const firstRegion = averagesInfo[0][0];
  // const secondRegion = averagesInfo[1][0];
  // const thirdRegion = averagesInfo[2][0];

  // const homeChartData = [
  //   {
  //     region: convertLocationName[firstRegion],
  //     numberOne: averagesInfo[0][1],
  //     numberOneColor: 'hsl(220.0829875518672, 100%, 47.25490196078431%)',
  //   },
  //   {
  //     region: convertLocationName[secondRegion],
  //     numberTwo: averagesInfo[1][1],
  //     numberTwoColor: 'hsl(319, 70%, 50%)',
  //   },

  //   {
  //     region: convertLocationName[thirdRegion],
  //     numberThree: averagesInfo[2][1],
  //     numberThreeColor: 'hsl(195, 70%, 50%)',
  //   },
  // ];

  // 서울 월별 미세먼지 평균
  const averageSeoul = [
    {
      1: 49,
      2: 46,
      3: 68,
      4: 63,
      5: 39,
      6: 28,
      7: 27,
      8: 22,
      9: 21,
      10: 28,
      11: 30,
      12: 36,
    },
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  const currentSeoulValue = averageSeoul[0][currentMonth];
  // console.log(currentSeoulValue);

  return (
    <Container>
      <ChartContainer>
        <ResponsiveBar
          data={homeChartData}
          keys={['value']}
          indexBy='region'
          colors={['#f1ff59', '#31c04f', '#00bea6', '#009ccf', '#2048b9']}
          colorBy='index'
          margin={{ top: 0, right: 20, bottom: 50, left: 20 }}
          minValue={0}
          maxValue={200}
          padding={0.3}
          valueScale={{ type: 'symlog' }}
          indexScale={{ type: 'band', round: true }}
          borderWidth={3}
          borderColor={{
            from: 'color',
            modifiers: [['opacity', '1.6']],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 12,
            tickPadding: 12,
            tickRotation: -35,
            // legend: '지역',
            // legendPosition: 'middle',
            // legendOffset: 32,
            // truncateTickAt: 0,
          }}
          axisLeft={{
            tickValues: [],
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            // legend: '미세먼지 수치',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          labelSkipWidth={0}
          labelSkipHeight={0}
          labelTextColor='#000000'
          theme={{
            //x축 라벨 폰트(지역)
            axis: {
              ticks: {
                text: {
                  fontSize: '12px',
                  fill: '#646464',
                  fontFamily: 'Sunflower',
                  fontOpticalSizing: 'auto',
                  fontStyle: 'normal',
                  fontWeight: '400',
                },
              },
            },
            //그래프 내부 숫자 폰트
            labels: {
              text: {
                fontSize: '14px',
                fontFamily: 'Montserrat, sans-serif',
                fontOpticalSizing: 'auto',
                fontStyle: 'normal',
                fontWeight: '600',
              },
            },
          }}
          // legends={[
          //   {
          //     dataFrom: 'keys',
          //     anchor: 'bottom-right',
          //     direction: 'column',
          //     justify: false,
          //     translateX: 120,
          //     translateY: 0,
          //     itemsSpacing: 2,
          //     itemWidth: 100,
          //     itemHeight: 20,
          //     itemDirection: 'left-to-right',
          //     itemOpacity: 0.85,
          //     symbolSize: 12,
          //     effects: [
          //       {
          //         on: 'hover',
          //         style: {
          //           itemOpacity: 1,
          //         },
          //       },
          //     ],
          //   },
          // ]}
          gridXValues={[]} // x축 배경 라인 제거
          gridYValues={[]} // y축 배경 라인 제거
          isInteractive={false} //툴팁 비활성화
          // tooltip={() => {}}
          role='application'
          // ariaLabel='지난 일주일간 가장 맑았던 지역 순위'
          // barAriaLabel={e =>
          //   e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
          // }
          layers={['grid', 'axes', 'bars', 'markers', 'legends']}
          markers={[
            {
              axis: 'y',
              value: currentSeoulValue, // Y축에서 마커를 표시할 값
              lineStyle: { stroke: 'red', strokeWidth: 2 }, // 마커 스타일 설정
              legend: `${currentMonth}월 서울 평균 : ${currentSeoulValue}`, // 선택적: 마커 범례
              legendOrientation: 'horizontal', // 범례 방향
            },
          ]}
        />
      </ChartContainer>
      <TextBox>
        <BestSpot>지난주 가장 맑았던 곳은 👉 {firstRegion}</BestSpot>
        <Message>강원도는 서울보다 맑아요</Message>
      </TextBox>
    </Container>
  );
};

export default SpotSuggestionChart;
