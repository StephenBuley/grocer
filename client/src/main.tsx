import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { loader as appLoader, destroyAction } from './components/App/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <App />, loader: appLoader },
  { path: '/destroy', action: destroyAction },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
