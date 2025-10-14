import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Frontpage } from './pages/frontpage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Frontpage />
  </StrictMode>,
)
