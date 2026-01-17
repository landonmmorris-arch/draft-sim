import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NFLMockDraft from './nfl_mock_draft_2026'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NFLMockDraft />
  </StrictMode>,
)
