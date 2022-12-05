import { useState } from "react"
import "./App.css"
import { NewListModal } from "./NewListModal"
import {IList} from "../../server/Schemas/ListSchema"

function App() {
  const [inModal, setInModal] = useState<boolean>(false)
  const [listName, setListName] = useState("")
  const [lists, setLists] = useState<IList[]>([])
 
  function handleClick() {
    setInModal(true)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setListName(e.target.value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newList = await fetch("http://localhost:5002/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: listName
      })
    })
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
      <div className="list">{lists.map(list => list.name)}</div> 
    </div>
  )
}

export default App
