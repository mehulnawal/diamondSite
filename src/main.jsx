import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Components/Global/App'
import { Provider } from 'react-redux'
import { Store } from './Components/Global/Store'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={Store}>
      <App />
    </Provider>
  </StrictMode>,
)
