import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import en from '@/translations/en/translation.json';
import vi from '@/translations/vi/translation.json';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { theme } from './theme/theme';
import { routers } from './utils/constants/routePaths';
import { store } from './utils/redux/store';
import { MantineEmotionProvider } from '@mantine/emotion';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
});

export default function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <MantineEmotionProvider>
        <MantineProvider theme={theme}>
          {/* <GlobalStyles /> */}
          <Notifications />
          <Provider store={store}>
            <RouterProvider router={routers} />
          </Provider>
        </MantineProvider>
      </MantineEmotionProvider>
    </I18nextProvider>
  );
}
