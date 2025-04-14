import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TabsDemo } from './pages/frontpage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TabsDemo />
  </StrictMode>,
)
