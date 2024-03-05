import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
// 글로벌 스타일 만들기 위한 createGlobalStyle 불러오기
import { createGlobalStyle } from 'styled-components';
// 스타일 초기화를 위한 reset 불러오기
import reset from 'styled-reset';

import Home from './pages/home/Home';
import Main from './pages/main/Main';
import NewDiary from './pages/newDiary/NewDiary';
import EditDiary from './pages/editDiary/EditDiary';

const queryClient = new QueryClient();

const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
      margin:0;
      padding:0;
      vertical-align: baseline;
      box-sizing: border-box;
      background-color: #242424;
    }
    a {
    text-decoration: none; 
    color: inherit; 
    cursor: pointer;
    
 
  }
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <GlobalStyles />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/main' element={<Main />} />
            <Route path='/newDiary' element={<NewDiary />} />
            <Route path='/editDiary/:diaryId' element={<EditDiary />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
