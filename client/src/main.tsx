import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App, { loader as appLoader, destroyAction } from './components/App/App'
import List, { loader as listLoader } from './components/List/List'
import { action as newListAction } from './components/NewListModal/NewListModal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    children: [
      {
        path: '/lists/:listId',
        element: <List title={'title'} />,
        loader: listLoader,
      },
    ],
  },
  { path: '/destroy', action: destroyAction },
  { path: '/lists/createList', action: newListAction },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
