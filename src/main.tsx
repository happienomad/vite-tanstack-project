import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { DEFAULT_LOCALE, dynamicActivate } from './internationalization/i18n';


dynamicActivate(DEFAULT_LOCALE).then(() => {
  const rootElement = document.getElementById('root')!
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }
}).catch((e) => {
  console.error(e);
})

