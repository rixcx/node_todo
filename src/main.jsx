import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App.jsx'

import '@/styles/global/reset.css'
import '@/styles/global/global.scss'
import '@/styles/index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
