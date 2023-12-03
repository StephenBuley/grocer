import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App, { loader as appLoader, destroyAction } from './components/App/App'
import List, {
  loader as listLoader,
  newItemAction as listAction,
  checkAction,
} from './components/List/List'
import {
  action as newListAction,
  NewListModal,
} from './components/NewListModal/NewListModal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    children: [
      {
        path: '/lists/:listId',
        element: <List />,
        loader: listLoader,
      },
      {
        path: '/lists/createList',
        element: <NewListModal />,
        action: newListAction,
      },
    ],
  },
  { path: '/destroy', action: destroyAction },
  { path: '/lists/:listId/createItem', action: listAction },
  { path: '/lists/:listId/:itemId', action: checkAction },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
