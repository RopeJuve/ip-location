import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { IPtrackerProvider } from './context/IPtracker.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IPtrackerProvider>
      <App />
    </IPtrackerProvider>
  </React.StrictMode>,
)
