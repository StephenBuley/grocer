import React, { useState, useEffect } from 'react'
import './App.css'
import { NewListModal } from '../NewListModal/NewListModal'
import { IList } from '../../../../server/Schemas/ListSchema'
import DeleteButton from '../DeleteButton/DeleteButton'

function App() {
  const [inModal, setInModal] = useState(false)
  const [listName, setListName] = useState('')
  const [lists, setLists] = useState<IList[]>([])

  // should this use ReactQuery? Maybe
  // need to refactor maybe?
  useEffect(() => {
    console.log('this is the useEffect')
    async function fetchLists() {
      const response = await fetch('http://localhost:5002/lists')
      const fetchedLists: IList[] = await response.json()
      setLists(fetchedLists)
    }
    fetchLists().catch((e) => {
      console.error(e)
    })
  }, [])

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleCloseModal={handleCloseModal}
          listName={listName}
        />
      )}
      {lists.map((list) => (
        <div key={list._id} className="list">
          <button onClick={() => handleListClick(list._id!)}>
            {list.name}
          </button>
          <DeleteButton id={list._id!} handleDeleteList={handleDeleteList} />
        </div>
      ))}
    </div>
  )
}

export default App
