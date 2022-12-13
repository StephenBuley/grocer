import { useState, useEffect } from "react"
import "./App.css"
import { NewListModal } from "../../NewListModal"
import { IList } from "../../../../server/Schemas/ListSchema"

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
    fetchLists().catch((err) => {
      console.error(err)
    })
  }, [])

  function handleClick() {
    setInModal(true)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setListName(e.target.value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
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
          listName={listName}
        />
      )}
      {lists.map((list) => (
        <div key={list._id} className="list">
          {list.name}
        </div>
      ))}
    </div>
  )
}

export default App
