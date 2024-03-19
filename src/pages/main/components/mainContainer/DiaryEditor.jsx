import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import {
  goseongCurrentAtom,
  yangyangCurrentAtom,
  pyeongchangCurrentAtom,
  gangneungCurrentAtom,
  sokchoCurrentAtom,
} from '../../../../lib/recoil/atom/currentSpot';
import styled from 'styled-components';
import { Select, Input } from 'antd';
import { getStringFullDate } from '../../../../lib/utils/string_date';

const Container = styled.div`
  box-sizing: border-box;
  color: white;
  font-family: 'Song Myung', serif;
  font-style: normal;
  width: 100%;
  padding-top: 75px;
  padding-bottom: 45px;
  /* @media screen and (max-width: 768px) {
    top: 40%;
    margin-top: -20px;
    padding-top: 20px;
  }

  @media screen and (max-width: 375px) {
    top: 35%;
    margin-top: -30px;
    padding-top: 30px;
  } */
`;

const DiaryHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 28px;
  margin-bottom: 12px;

  @media screen and (max-width: 768px) {
    font-size: 21px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  padding: 20px 0;

  @media screen and (max-width: 768px) {
    padding: 12px 0;
  }
`;

const ContentsContainer = styled.div`
  width: 100%;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const DisposeBtn = styled.button`
  background-color: #ffffff;
  color: black;
  font: inherit;
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
  padding: 8px 15px;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  transition: font-size 0.3s ease;
  font-size: 14px;
  border: 1px solid #d9d9d9;

  &:hover {
    color: #1677ff;
  }
`;

const SubmittedBtn = styled.button`
  background-color: #1677ff;
  color: white;
  font: inherit;
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
  padding: 8px 15px;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  transition: font-size 0.3s ease;
  font-size: 14px;
  border: 1px solid #d9d9d9;

  &:hover {
    border-color: #1677ff;
    background-color: #4f87d5;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    outline: 0;
  }
`;

const BackBtn = styled.button`
  color: white;
  font: inherit;
  width: 25%;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 10px 20px;
  transition: font-size 0.3s ease;

  &:hover {
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    outline: 0;
    color: #1677ff;
    font-size: 105%;
  }

  @media screen and (max-width: 768px) {
    padding: 10px 0;
  }
`;

const DeleteBtn = styled.button`
  font: inherit;
  color: #ff4e50;
  width: 25%;
  background: none;
  border: none;
  cursor: pointer;
  text-align: right;
  padding: 10px 20px;

  img {
    vertical-align: top;
    width: 20px;
    /* 이미지 비율을 유지하면서 */
    object-fit: cover;
    transition: font-size 0.3s ease;
  }
  &:hover img {
    width: 21px;
  }
`;

const DiaryHeaderTitle = styled.p`
  width: 50%;
  text-align: center;
  padding: 10px 20px;
  font-size: 32px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
    padding: 10px 0;
  }
`;

const CustomSelect = styled(Select)`
  .ant-select-selector.ant-select-selector {
    font-family: 'Song Myung', serif;
    font-style: normal;
  }
`;

const { TextArea } = Input;

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  //이미지 state
  const [image, setImage] = useState('');
  //이미지 고유id..
  const imgRef = useRef();
  // 제목, 텍스트 전달 state

  // 지역 필터, 제목, 내용
  const [location, setLocation] = useState(null);
  const [dust, setDust] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // const date =
  const textRef = useRef();
  const locationRef = useRef();
  const titleRef = useRef();

  const goseongDustData = useRecoilValue(goseongCurrentAtom);
  const yangyangDustData = useRecoilValue(yangyangCurrentAtom);
  const pyeongchangDustData = useRecoilValue(pyeongchangCurrentAtom);
  const gangneungDustData = useRecoilValue(gangneungCurrentAtom);
  const sokchoDustData = useRecoilValue(sokchoCurrentAtom);

  const selectDustData = useMemo(
    () => ({
      '고성(DMZ)': goseongDustData,
      양양읍: yangyangDustData,
      평창읍: pyeongchangDustData,
      주문진읍: gangneungDustData,
      금호동: sokchoDustData,
    }),
    [
      goseongDustData,
      yangyangDustData,
      pyeongchangDustData,
      gangneungDustData,
      sokchoDustData,
    ]
  );

  //일기는 로컬스토리지에 저장
  const saveToLocalStorage = diaries => {
    try {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    } catch (error) {
      console.error('로컬 스토리지 저장 실패', error);
    }
  };
  //

  //이미지 업로드 input의 onChange함수
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    // console.log(file);
    const reader = new FileReader(); //객체형태
    reader.readAsDataURL(file); //파일을 url로 만듦
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onHandleChange = ({ value, label }) => {
    // 지역 , 미세먼지 업데이트
    setLocation({
      value,
      label,
    });
    const data = selectDustData[value];
    setDust(data[1]);
  };

  // 작성(수정)완료
  const handleSubmit = event => {
    // 이벤트 버블링 방지
    event.stopPropagation();

    // 적어도 한 글자 이상 적혀있어야 함, 필드가 다 채워져야함
    if (!location) {
      locationRef.current.focus();
      return;
    } else if (title.length < 1) {
      titleRef.current.focus();
      return;
    } else if (content.length < 1) {
      textRef.current.focus();
      return;
    }

    const confirmed = window.confirm(
      isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?'
    );

    if (!confirmed) {
      return;
    }

    const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
    const diaryData = {
      id: isEdit ? originData.id : Date.now(),
      location,
      title,
      content,
      image,
      dust,
    };

    if (!isEdit) {
      diaries.push(diaryData);
    } else {
      const diaryIndex = diaries.findIndex(diary => diary.id === originData.id);
      if (diaryIndex !== -1) {
        diaries[diaryIndex] = diaryData;
      }
    }

    // localStorage.setItem('diaries', JSON.stringify(diaries));
    saveToLocalStorage(diaries);
    console.log('전달될 필터: ', location.value);

    navigate('/main?tab=2', {
      replace: true,
      state: { selectedLocation: location.value },
    });
  };

  //삭제
  const handleRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
      const filteredDiaries = diaries.filter(
        diary => diary.id !== originData.id
      );
      saveToLocalStorage(filteredDiaries);
      navigate('/main', { replace: true });
    }
  };

  //isEdit, originData가 바뀔때만 실행
  useEffect(() => {
    if (isEdit && originData) {
      setTitle(originData.title);
      setContent(originData.content);
      setImage(originData.image);
      setLocation(originData.location);
      setDust(originData.dust);
    }
  }, [isEdit, originData]);

  return (
    <Container>
      <DiaryHeaderContainer>
        <BackBtn onClick={() => navigate(-1)}> {'< <'} </BackBtn>
        <DiaryHeaderTitle>
          {isEdit ? '기록 수정' : '새로운 기록'}
        </DiaryHeaderTitle>
        {isEdit && (
          <DeleteBtn onClick={handleRemove}>
            <img
              src={process.env.PUBLIC_URL + `/assets/trash.png`}
              alt={'delete'}
            />
          </DeleteBtn>
        )}
      </DiaryHeaderContainer>
      <FlexContainer>
        <p>오늘은</p>
        <p>
          {isEdit
            ? getStringFullDate(new Date(originData.id))
            : getStringFullDate(new Date())}
        </p>
      </FlexContainer>
      <FlexContainer>
        <CustomSelect
          labelInValue
          placeholder='지역을 선택하세요'
          size={'large'}
          optionFilterProp='children'
          value={location}
          ref={locationRef}
          onChange={onHandleChange}
          filterOption={filterOption}
          style={{
            width: 185,
            height: 31,
          }}
          options={[
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
        <>
          <p>미세먼지 {dust}</p>
        </>
      </FlexContainer>

      <FlexContainer>
        <Input
          placeholder='제목을 입력해 주세요'
          maxLength={40}
          value={title}
          ref={titleRef}
          onChange={e => setTitle(e.target.value)}
        />
      </FlexContainer>
      <ContentsContainer>
        <FlexContainer>
          <form>
            <label htmlFor='img_reader' style={{ cursor: 'pointer' }}>
              <p>이미지 업로드 🏞️</p>
            </label>
            <input
              type='file'
              accept='image/*'
              id='img_reader'
              onChange={saveImgFile}
              ref={imgRef}
              style={{ display: 'none' }}
            />
          </form>
        </FlexContainer>

        {image && (
          <img src={image ? image : ''} alt={'img'} style={{ width: '100%' }} />
        )}
        <TextArea
          placeholder='맑은 날 떠난 오늘을 기록해주세요'
          autoSize={{ minRows: 20 }}
          ref={textRef}
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <BtnContainer>
          <DisposeBtn onClick={() => navigate(`/`)}>취소</DisposeBtn>
          <SubmittedBtn onClick={event => handleSubmit(event)}>
            저장
          </SubmittedBtn>
        </BtnContainer>
      </ContentsContainer>
    </Container>
  );
};

export default DiaryEditor;
