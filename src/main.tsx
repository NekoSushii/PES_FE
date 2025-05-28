import emailjs from "@emailjs/browser";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import LogRocket from 'logrocket';
import { BrowserRouter } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

LogRocket.init('gonje5/pes-e0bgm');
emailjs.init('VimqPPDkbwRHJfhBo');

const STORAGE_KEY = 'lr_anonymous_id';

let anonId = localStorage.getItem(STORAGE_KEY);
if (!anonId) {
  anonId = uuid();
  localStorage.setItem(STORAGE_KEY, anonId);
}

LogRocket.identify(anonId, { anonymous: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
