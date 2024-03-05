import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Table, ConfigProvider } from 'antd';
import { getStringFullDate } from '../../../../lib/utils/string_date';

// const Container = styled.div`
//   overflow-y: auto;
// `;

// 일기 테이블 커스텀
const CustomTable = styled(Table)`
  /* .ant-table-tbody .ant-table-cell:nth-child(even) {
    background-color: blue;
  } */

  // 기록 데이터 없을때
  .ant-empty .ant-empty-normal {
    color: #e9e9e9;
  }
  .ant-empty .ant-empty-description {
    color: #fafafa;
  }

  // 테이블 헤더 폰트
  .ant-table-thead > tr > th {
    font-size: 18px;
    font-weight: 500;
    color: #e9e9e9;

    @media screen and (max-width: 768px) {
      font-size: 13px;
      font-weight: 300;
    }
    @media screen and (max-width: 465px) {
      font-size: 12px;
      font-weight: 100;
    }
    @media screen and (max-width: 370px) {
      font-size: 10px;
    }
  }

  // 테이블 폰트
  .ant-table-content {
    font-family: 'Sunflower', sans-serif;
    font-size: 14px;
    font-weight: 100;
    color: #e9e9e9;

    @media screen and (max-width: 768px) {
      font-size: 12px;
    }

    @media screen and (max-width: 465px) {
      font-size: 10px;
    }
  }

  .ant-table-thead > tr > th {
    padding: 4px 8px;

    @media screen and (max-width: 460px) {
      padding: 4px 2px;
    }
  }
  .ant-table-tbody > tr > td {
    padding: 4px 8px;

    @media screen and (max-width: 460px) {
      padding: 4px 2px;
    }
  }

  .ant-table-cell {
  }

  // 확장 아이콘 색상
  .ant-table-row-expand-icon {
    color: black;
  }

  .ant-table-content .ant-table-thed > tr {
    color: purple;
  }

  .ant-table-tbody > tr > td {
    background-color: #242424;
    border-bottom: 1px solid rgba(158, 158, 158, 0.3);
  }

  // 컨텐츠 호버 시 배경색 변경
  .ant-table-expanded-row > td {
    background-color: black !important;
  }
  /* .ant-table-tbody .ant-table-row:nth-child(odd) {
    background-color: black;
  } */
`;

const DiaryList = ({ selectedRegion }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [diaryData, setDiaryData] = useState([]);
  const [filteredDiaryData, setFilteredDiaryData] = useState([]);

  const navigate = useNavigate();

  // 지역으로 필터링하는 함수
  const filterDiariesData = (diaries, region) => {
    try {
      if (region === 'all') {
        return diaries;
      } else {
        // 특정 지역 선택 시, 해당 지역의 데이터만 필터링
        return diaries.filter(item => item.location.value === region);
      }
    } catch (error) {
      console.error('로드 에러:', error);
      return [];
    }
  };

  useEffect(() => {
    // localStorage에서 diaries 데이터를 가져오기
    const loadedDiariesData = JSON.parse(localStorage.getItem('diaries')) || [];
    setDiaryData(loadedDiariesData);
    // selectedRegion이 변경될 때마다 filteredDiaryData 업데이트
    const newFilteredDiaryData = filterDiariesData(
      loadedDiariesData,
      selectedRegion
    );
    setFilteredDiaryData(newFilteredDiaryData);
  }, [selectedRegion]);

  // 지역이 변경될 때마다 확장된 행을 초기화
  useEffect(() => {
    setExpandedRowKeys([]);
    // selectedRegion 변경 시 useEffect 다시 실행
  }, [selectedRegion]);

  // 삭제 로직
  const handleDelete = diaryId => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updatedDiaries = diaryData.filter(diary => diary.id !== diaryId);
      const updatedFilteredDiaries = filteredDiaryData.filter(
        diary => diary.id !== diaryId
      );

      // 로컬스토리지와 상태 업데이트
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
      setDiaryData(updatedDiaries);
      // 필터링 된 곳에도 업데이트
      setFilteredDiaryData(updatedFilteredDiaries);
    }
  };

  const handleEdit = diaryId => {
    navigate(`/editDiary/${diaryId}`);
  };

  const columns = [
    {
      title: '날짜',
      dataIndex: 'id',
      key: 'id',
      // align: 'center',
      // 기본정렬을 내림차순으로
      defaultSortOrder: 'descend',
      render: id => <span>{getStringFullDate(new Date(id))}</span>,
      sorter: (a, b) => new Date(a.id).getTime() - new Date(b.id).getTime(),
    },

    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '지역',
      key: 'location',
      // align: 'center',
      render: (_, diary) => {
        return <span>{diary.location.label}</span>;
      },
    },
    {
      title: '미세먼지',
      dataIndex: 'dust',
      key: 'dust',
      // align: 'center',
      sorter: (a, b) => a.dust - b.dust,
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      // align: 'center',
      render: (_, diary) => <a onClick={() => handleEdit(diary.id)}> 수정</a>,
    },
    {
      title: '',
      dataIndex: '',
      key: 'y',
      // align: 'center',
      render: (_, diary) => <a onClick={() => handleDelete(diary.id)}>삭제</a>,
    },
  ];

  const onChange = (filters, sorter, extra) => {
    console.log('params', filters, sorter, extra);
  };

  const onEdit = () => {};

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            cardBg: 'blue',
            cardGutter: 10,
            cardHeight: 20,
            controlHeight: 20,
            filterDropdownBg: 'blue',
            headerBorderRadius: 0,
            headerBg: '#242424',
            headerSortActiveBg: '#242424',
            headerSortHoverBg: '#242424',
            headerSplitColor: 'transparent',
            rowExpandedBg: 'transparent',
            // bodySortBg: 'transparent',
            rowHoverBg: '#464646',
            colorLinkHover: 'green',

            lineHeight: 1.2,
            // cell 상하 패딩
            cellPaddingBlock: 12,
          },
        },
      }}
    >
      <CustomTable
        className='table-striped-rows'
        style={{ width: '100%', height: '100%' }}
        columns={columns}
        pagination={false}
        dataSource={filteredDiaryData.map(diary => ({
          ...diary,
          key: diary.id,
        }))}
        onChange={onChange}
        expandable={{
          expandedRowRender: diary => (
            <>
              {/* 이미지가 있으면 이미지를 보여주고, 없으면 공백.*/}
              {diary.image ? (
                <img
                  src={diary.image}
                  alt='Diary'
                  style={{ width: '400px', marginBottom: '10px' }}
                />
              ) : (
                <p></p>
              )}
              <p>{diary.content}</p>
            </>
          ),
          // 현재 확장된 행의 키를 지정
          expandedRowKeys,
          onExpand: (expanded, diary) => {
            // 행을 확장하거나 축소할 때 실행
            const keys = expanded ? [diary.key] : [];
            setExpandedRowKeys(keys);
          },
        }}
      />
    </ConfigProvider>
  );
};
export default DiaryList;
