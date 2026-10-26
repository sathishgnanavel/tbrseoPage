import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production pages are prerendered, so hydrate; in `vite dev` the root is empty, so render.
if (root.hasChildNodes()) hydrateRoot(root, app)
else {
  document.title ||= 'ThreeBestRated App Download'
  createRoot(root).render(app)
}
