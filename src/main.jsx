import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {HashRouter} from 'react-router-dom'
import ShoppingCartProvider from './context/ShoppingCartContext.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ShoppingCartProvider>
      <App/>
    </ShoppingCartProvider> 
  </HashRouter>
)
