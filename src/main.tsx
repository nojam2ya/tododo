import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-day-picker/style.css';
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
