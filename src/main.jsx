import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ContextProvider from './context/Provider'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextProvider>
      <GoogleOAuthProvider clientId="364668099021-5ka3pobjqunoduedu4m8g51s0j9b8jcg.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </ContextProvider>
  </BrowserRouter>
)
