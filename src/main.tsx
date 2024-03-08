import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'virtual:uno.css';
import './index.css';
//svg雪碧图插件
import 'virtual:svg-icons-register';
//import 语句即代表一个 HTTP 请求

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//感叹号是typescript的非空断言操作符 因为getElementById会返回HTMLElement 和null两种情况 我们确信一定会返回HTMLElement 所以采用!来剔除ts 返回的null或者undefined
