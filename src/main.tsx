import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import LogRocket from 'logrocket';
import { v4 as uuid } from 'uuid';

LogRocket.init('gonje5/pes-e0bgm');

const STORAGE_KEY = 'lr_anonymous_id';

let anonId = localStorage.getItem(STORAGE_KEY);
if (!anonId) {
  anonId = uuid();
  localStorage.setItem(STORAGE_KEY, anonId);
}

LogRocket.identify(anonId, { anonymous: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
