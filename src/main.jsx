import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contex/index.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <StrictMode>
        <div className='mx-auto w-full max-w-screen-md lg:max-w-screen-lg'>
          <App />

        </div>
      </StrictMode>
    </BrowserRouter>
  </AuthProvider>
)
