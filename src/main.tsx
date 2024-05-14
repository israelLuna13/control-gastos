import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BudgetProvider } from './context/BudgetContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* rodeamos nuestra aplicacion con el provider que hicimos */}
    <BudgetProvider>
    <App />
    </BudgetProvider>
    
  </React.StrictMode>,
)
