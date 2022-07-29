import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './page_root';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import Error from './components/Error';
import Ranking from './ranking';
import Perfect from './ranking_perfect';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Ranking />} />
      <Route path="/perfect" element={<Perfect />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
