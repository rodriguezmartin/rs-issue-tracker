import React from 'react'
import ReactDOM from 'react-dom/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './index.css'
import App from './App'

dayjs.extend(relativeTime)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
