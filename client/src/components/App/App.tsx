import React, { useState } from 'react'
import './App.css'
import { NewListModal } from '../NewListModal/NewListModal'
import { IList } from '../../../../server/Schemas/ListSchema'
import ListOfLists from '../ListOfLists/ListOfLists'
import { useLoaderData } from 'react-router-dom'

export async function loader() {
  const response = await fetch('http://localhost:5002/lists')
  const fetchedLists: IList[] = await response.json()
  return fetchedLists
}

function App() {
  const fetchedLists = useLoaderData() as IList[]

  const [inModal, setInModal] = useState(false)
  const [listName, setListName] = useState('')
  const [lists, setLists] = useState<IList[]>(fetchedLists)

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

  async function handleDeleteList(id: string) {
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
    setLists((prevLists) =>
      prevLists.filter((list) => list._id !== deletedList._id),
    )
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
    setLists((prevLists) => [...prevLists, newList])
    handleCloseModal()
  }

  async function handleListClick(id: string) {
    const response = await fetch(`http://localhost:5002/lists/${id}`)
    console.log(await response.text())
  }

  return (
    <div className="App">
      <button className="btn__new-list" onClick={handleNewListClick}>
        Create New List
      </button>
      {inModal && (
        <NewListModal
          handleSubmit={handleModalSubmit}
          handleChange={handleChange}
          handleCloseModal={handleCloseModal}
          listName={listName}
        />
      )}
      <ListOfLists
        lists={lists}
        handleDeleteList={handleDeleteList}
        handleListClick={handleListClick}
      />
    </div>
  )
}

export default App
