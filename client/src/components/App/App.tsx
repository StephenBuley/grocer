import React, { useState } from 'react'
import './App.css'
import { NewListModal } from '../NewListModal/NewListModal'
import { IList } from '../../../../server/Schemas/ListSchema'
import ListOfLists from '../ListOfLists/ListOfLists'
import { Outlet, redirect, useLoaderData } from 'react-router-dom'

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
  const [listName, setListName] = useState('')

  function handleNewListClick() {
    setInModal(true)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setListName(e.target.value)
  }

  function handleCloseModal() {
    setListName('')
    setInModal(false)
  }

  async function handleModalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (listName === '') {
      console.log('no name submitted')
      return
    }
    const response = await fetch('http://localhost:5002/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: listName,
      }),
    })
    const newList: IList = await response.json()
    handleCloseModal()
  }

  return (
    <div className="App">
      <div className="sidebar">
        <div className="header">
          <h1 className="title">grocer</h1>
          <button className="btn__new-list" onClick={handleNewListClick}>
            New
          </button>
        </div>
        {inModal && (
          <NewListModal
            handleSubmit={handleModalSubmit}
            handleChange={handleChange}
            handleCloseModal={handleCloseModal}
            listName={listName}
          />
        )}
        <ListOfLists lists={fetchedLists} />
      </div>
      <div className="view-panel">
        <Outlet />
      </div>
    </div>
  )
}

export default App
