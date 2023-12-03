import { useState } from 'react'
import './App.css'
import { NewListModal } from '../NewListModal/NewListModal'
import { IList } from '../../../../server/Schemas/ListSchema'
import ListOfLists from '../ListOfLists/ListOfLists'
import { Link, Outlet, redirect, useLoaderData } from 'react-router-dom'

export async function loader() {
  const response = await fetch('http://localhost:5002/lists')
  const fetchedLists: IList[] = await response.json()
  return fetchedLists
}

export async function destroyAction({ request }: { request: Request }) {
  const id = (await request.formData()).get('listToDelete')
  const response = await fetch('http://localhost:5002/lists', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _id: id,
    }),
  })
  const deletedList: IList = await response.json()
  return redirect('/')
}

function App() {
  const fetchedLists = useLoaderData() as IList[]

  const [inModal, setInModal] = useState(false)

  return (
    <div className="App">
      <div className="sidebar">
        <div className="header">
          <h1 className="title">grocer</h1>
          <Link to={'/lists/createList'} className="btn__new-list">
            New
          </Link>
        </div>
        {inModal && <NewListModal />}
        <ListOfLists lists={fetchedLists} />
      </div>
      <div className="view-panel">
        <Outlet />
      </div>
    </div>
  )
}

export default App
