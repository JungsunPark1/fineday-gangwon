import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ResponsiveLine } from '@nivo/line';
import { convertLocationName } from '../../../../lib/utils/apiLocationData';
import { getStringDate } from '../../../../lib/utils/string_date';

const Container = styled.div`
  height: 60vh; // 높이를 뷰포트의 50%로 설정
  width: 100%; // 너비를 전체로 설정
`;

// 마우스 호버 했을때 tooltip 커스텀 x축의 날짜 : 지역 미세먼지 수치
const CustomTooltip = ({ slice }) => {
  // legends/tooltip 공통 스타일 적용
  return (
    <div
      style={{
        background: 'white',
        padding: '10px',
        border: '1px solid #ccc',
      }}
    >
      <div style={{ textAlign: 'center', padding: '4px' }}>
        {slice.points[0].data.xFormatted}
      </div>
      {slice.points.map(point => (
        <div
          key={point.id}
          style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}
        >
          {/* 심볼을 SVG 원으로 표시 */}
          <svg
            width='12'
            height='12'
            style={{ marginRight: '10px', opacity: '0.75' }}
          >
            <circle cx='6' cy='6' r='6' fill={point.serieColor} />
          </svg>
          {/* 시리즈 이름과 값 */}
          <span>
            <b>{point.serieId} :</b> {point.data.yFormatted}
          </span>
        </div>
      ))}
    </div>
  );
};

// 지역별 색상 정의
const regionColors = {
  '고성(DMZ)': '#ffa490',
  양양읍: '#d0f148',
  평창읍: '#7d0196',
  주문진읍: '#db5e29',
  금호동: '#02bbcd',
};

// 그래프 x,y축 폰트 변경 / 그리드 색상 변경
const customTheme = {
  legends: {
    text: {
      fontFamily: 'Song Myung,serif ',
      fontSize: 14,
      fontWeight: 'bold',
      fill: '#ffffff',
    },
  },
  axis: {
    ticks: {
      text: {
        // 축 눈금 텍스트 스타일 설정
        fontFamily: 'Song Myung,serif ',
        fontSize: 12,
        fill: '#999999',
      },
    },
  },
  grid: {
    line: {
      stroke: '#999999', // 여기서 그리드 선의 색상을 변경합니다.
      strokeWidth: 0.3,
      // 그리드 점선으로
      strokeDasharray: '1 2',
    },
  },
};

const MainChart = ({ selectedRegion }) => {
  // 로컬스토리지에 있는 데이터 가져오기 (과거 미세먼지 데이터)
  const getLocalData = region => {
    const localDataString =
      localStorage.getItem(`pastDustData_${region}`) || [];
    try {
      const localDataObject = JSON.parse(localDataString);
      return localDataObject.data || [];
    } catch (error) {
      console.error('에러', region, error);
      return [];
    }
  };

  // const regionData = getLocalData(selectedRegion);
  // console.log(regionData);

  // nivo 차트에 전달할 데이터 포맷으로 변환
  // const mainChartData = useMemo(
  //   () =>
  //     regionData.map(item => ({
  //       x: getStringDate(new Date(item.msurDt)), // 측정 날짜
  //       y: parseInt(item.pm10Value, 10) || 0, // 숫자로 변환해주기
  //     })),
  //   [regionData]
  // );

  // 차트에 데이터 전달
  // regionData가 변경될 때마다 mainChartData와 data를 재계산하는 것을 방지불필요한 계산을 줄이고,
  // 컴포넌트의 렌더링 성능을 향상시킴
  const data = useMemo(() => {
    if (selectedRegion === 'all') {
      const regions = ['고성(DMZ)', '주문진읍', '평창읍', '금호동', '양양읍'];
      const allData = regions.map(region => {
        const regionData = getLocalData(region).map(item => ({
          x: getStringDate(new Date(item.msurDt)),
          y: parseInt(item.pm10Value, 10) || 0,
        }));
        return {
          id: convertLocationName[region] || region,
          color: regionColors[region] || 'white',
          data: regionData,
        };
      });
      return allData;
    } else {
      const regionData = getLocalData(selectedRegion).map(item => ({
        // 측정 날짜
        x: getStringDate(new Date(item.msurDt)),
        // 숫자로 변환해주기
        y: parseInt(item.pm10Value, 10) || 0,
      }));
      return [
        {
          id: convertLocationName[selectedRegion] || selectedRegion,
          color: regionColors[selectedRegion] || 'black',
          data: regionData,
        },
      ];
    }
  }, [selectedRegion]);

  return (
    <Container>
      <ResponsiveLine
        data={data}
        colors={data => data.color}
        theme={customTheme}
        margin={{ top: 50, right: 110, bottom: 90, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: '0',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 10,
          tickPadding: 5,
          tickRotation: -45,
          // legend: '날짜',
          legendOffset: 70,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // legend: '미세먼지 수치',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            // 우측 지역 정보 안내
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75, // legends에서만 적용 가능한 속성
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, 0.5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        enableSlices='x' //  sliceTooltip prop을 활성화!
        sliceTooltip={CustomTooltip}
      />
    </Container>
  );
};

export default MainChart;
