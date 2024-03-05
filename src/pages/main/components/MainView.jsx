import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { Select, Tabs} from 'antd';

import { useRecoilValue } from 'recoil';
import { currentSpotAtom } from '../../../lib/recoil/atom/currentSpot';

import MainChart from './mainContainer/MainChart';
import DiaryList from './mainContainer/DiaryList';

const Container = styled.div`
  /* background-color: darkgray; */
  width: 100%;
  /* margin: 0 auto; */
  padding-top: 80px;
  padding-bottom: 24px;
  box-sizing: border-box;
`;

const ContentsContainer = styled.div`
  /* background-color: yellow; */
  width: 100%;
  height: auto; /* 높이를 auto로 설정하여 내용에 맞게 조정 */
`;

const SelectorContainer = styled.div`
  display: flex;
  margin-bottom: 18px;
  gap: 12px;

  @media screen and (max-width: 768px) {
   justify-content: space-between;
  }
`;

//셀렉터 커스텀
const CustomSelect = styled(Select)`
  .ant-select-selector.ant-select-selector {
    font-family: 'Sunflower';
    font-style: normal;
    font-size: 16px;

    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
    @media screen and (max-width: 370px) {
      font-size: 12px;
    }
  }
`;

const CreateDiaryBtn = styled.button`
  background-color: white;
  width: 135px;
  height: 31px;
  font-family: 'Sunflower';
  font-style: normal;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  transition: font-size 0.3s ease;
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);

  &:hover {
    border-color: #1e87f0;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    outline: 0;
    color: #1e87f0;
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
  @media screen and (max-width: 370px) {
    font-size: 12px;
  }
`;

//텝 커스텀
const CustomTabs = styled(Tabs)`
  .ant-tabs-nav-list {
    gap: 12px;
  }

  .ant-tabs-tab {
    font-family: 'Sunflower';
    font-weight: '300';
    font-style: normal;
    font-size: 16px;
    padding: 6px 18px !important;
    border-bottom: none !important;
    color: #ffffff;

    @media screen and (max-width: 768px) {
      padding: 4px 12px !important;
      font-size: 14px;
    }
  }

  .ant-tabs-tab.ant-tabs-tab-active.ant-tabs-tab-active {
    background-color: #242424;
    /* border-bottom: 2px solid #1e87f0; */
  }
  .ant-tabs-tab-active.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #1e87f0;
  }
`;

const MainView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 쿼리 스트링 사용해서 컴포넌트텝 조작. (기록에서 뒤로가기때 기록 보이게)
  const [activeKey, setActiveKey] = useState('1');

  const defaultSelectedRegionValue = useRecoilValue(currentSpotAtom);
  const [defaultLocationName, defaultDustLevel] = defaultSelectedRegionValue;
  // 지역 필터 선택
  const [selectedRegionValue, setSelectedRegionValue] =
    useState(defaultLocationName);

  // // 텝에 따라 보이는 컴포넌트 다르게 . 기록텝에서만 보이기
  // const [selectedTab, setSelectedTab] = useState('1');

  useEffect(() => {
    // 컴포넌트가 마운트될 때 현재 추천지역 Recoil 상태를 로컬 상태의 초기값으로 설정
    // 디폴트로케이션네임이 바뀔때..
    setSelectedRegionValue(defaultLocationName);
    // 의존성 배열을 빈배열로 두어, 리코일상태가 변하더라도 영향 받지 않음
  }, [defaultLocationName]);

  // URL에서 탭 상태
  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    setActiveKey(queryParams.tab || '1');
  }, [location.search]);

  const onTabChange = key => {
    // URL 업데이트로 탭 상태 관리
    navigate(`?tab=${key}`);

    setActiveKey(key);
  };

  // 지역 필터
  const onHandleChange = value => {
    // console.log(`selected ${value}`);
    setSelectedRegionValue(value); // 로컬 상태 업데이트
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  // 데이터피커
  // const { RangePicker } = DatePicker;

  //텝 메뉴
  // const [size, setSize] = useState('large');
  // const onChange = e => {
  //   setSize(e.target.value);
  // };
  return (
    <Container>
      <ContentsContainer>
        <SelectorContainer>
          <CustomSelect
            placeholder='지역을 선택해주세요'
            size={'large'}
            value={selectedRegionValue} // Recoil 상태를 사용하여 현재 선택된 값을 설정
            optionFilterProp='children'
            onChange={onHandleChange}
            filterOption={filterOption}
            style={{
              width: 135,
              height: 31,
            }} // 픽셀
            options={[
              {
                value: 'all',
                label: '강원도',
              },
              {
                value: '고성(DMZ)',
                label: '고성',
              },
              {
                value: '주문진읍',
                label: '강릉',
              },
              {
                value: '평창읍',
                label: '평창',
              },
              {
                value: '금호동',
                label: '속초',
              },
              {
                value: '양양읍',
                label: '양양',
              },
            ]}
          />
          {activeKey === '2' && (
            <CreateDiaryBtn
              onClick={() => {
                navigate(`/newDiary`);
              }}
            >
              기록하기 ↗️
            </CreateDiaryBtn>
          )}
        </SelectorContainer>
        {/* <TabContentsContainer> */}

        {/* <ConfigProvider
          theme={{
            components: {
              Tabs: {
                cardBg: 'transparant',
                colorBgContainer: 'transparant',
                cardPadding: '6px 18px',
                itemColor: 'white',
                inkBarColor: '#1e87f0',
                itemSelectedColor: '#1e87f0',
                fontFamily: 'Sunflower',
                titleFontSize: '16px',
              },
            },
          }}
        >
          <Tabs
            activeKey={activeKey}
            onChange={onTabChange}
            type='card'
            //텝 사이 간격
            tabBarGutter={14}
            // 모바일시에는  size 줄이는것 넣어줘야함.
            size={'middle'}
            items={[
              {
                label: '차트',
                key: '1',
                // MainChart에 selectedRegion prop으로 selectedRegionValue 전달
                children: <MainChart selectedRegion={selectedRegionValue} />,
              },
              {
                label: '기록',
                key: '2',
                children: <DiaryList selectedRegion={selectedRegionValue} />,
              },
            ]}
          />
        </ConfigProvider> */}

        <CustomTabs
          activeKey={activeKey}
          onChange={onTabChange}
          type='card'
          // 모바일시에는  size 줄이는것 넣어줘야함.
          size={'middle'}
          items={[
            {
              label: '차트',
              key: '1',
              // MainChart에 selectedRegion prop으로 selectedRegionValue 전달
              children: <MainChart selectedRegion={selectedRegionValue} />,
            },
            {
              label: '기록',
              key: '2',
              children: <DiaryList selectedRegion={selectedRegionValue} />,
            },
          ]}
        />
        {/* </TabContentsContainer> */}
      </ContentsContainer>
    </Container>
  );
};

export default MainView;
