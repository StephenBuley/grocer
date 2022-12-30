import { useState, useEffect } from "react"
import "./App.css"
import { NewListModal } from "../NewListModal/NewListModal"
import { IList } from "../../../../server/Schemas/ListSchema"
import DeleteButton from "../DeleteButton/DeleteButton"

function App() {
  const [inModal, setInModal] = useState<boolean>(false)
  const [listName, setListName] = useState("")
  const [lists, setLists] = useState<IList[]>([])

  //TODO: initialize lists state with database call on app start up
  // ReactQuery?
  useEffect(() => {
    console.log("this is the useEffect")
    async function fetchLists() {
      const response = await fetch("http://localhost:5002/lists")
      const fetchedLists = await response.json()
      setLists(fetchedLists)
    }
    fetchLists().catch((e) => {
      console.error(e)
    })
  }, [])

  function handleClick() {
    setInModal(true)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setListName(e.target.value)
  }

  function handleCloseModal() {
    setListName("")
    setInModal(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (listName === "") {
      console.log("no name submitted")
      return
    }
    const response = await fetch("http://localhost:5002/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: listName,
      }),
    })
    const newList = await response.json()
    setLists((prevLists) => [...prevLists, newList])
    setInModal(false)
  }

  return (
    <div className="App">
      <button className="btn__new-list" onClick={handleClick}>
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
          {list.name}
          <DeleteButton />
        </div>
      ))}
    </div>
  )
}

export default App
