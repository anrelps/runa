import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nProvider } from 'react-aria-components';
import App from './App.tsx';
import './index.css';
import { store } from './redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <I18nProvider locale={navigator.language}>
        <App />
      </I18nProvider>
    </Provider>
  </StrictMode>,
);
