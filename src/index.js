import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { RecoilRoot } from 'recoil';
// import { QueryClient, QueryClientProvider } from 'react-query';

// const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> 개발자 도구 제거
  // <QueryClientProvider client={QueryClient}>
  //   <RecoilRoot>
      <App />
  //   </RecoilRoot>
  // </QueryClientProvider>

  // </React.StrictMode>
);
