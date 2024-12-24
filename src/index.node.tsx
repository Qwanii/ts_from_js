import { MemoryRouter } from 'react-router-dom';
import { ServicesContext } from './context';
import { I18nProvider } from './i18n/context';
import App from './app';
import Services from './services';
import config from './config';
import { renderToString } from 'react-dom/server'

export default (params) => {

  const services = new Services(config);
  
  const jsx = (
      <ServicesContext.Provider value={services}>
        <I18nProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </I18nProvider>
      </ServicesContext.Provider>
  )
  const html = renderToString(jsx)

  return { html }

}
