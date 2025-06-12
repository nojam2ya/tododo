import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@styles/reset.css';
import '@styles/global.css';
import 'dayjs/locale/ko';
import * as dayjs from 'dayjs';

dayjs.locale('ko');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
