import { useState } from 'react'
import './App.css'
import { NewListModal } from './NewListModal'

function App() {
  const [inModal, setInModal] = useState<boolean>(false)
  const [listName, setListName] = useState("")

  function handleClick() {
    setInModal(true)
  }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setListName(e.target.value)
    }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setInModal(false)
  }

  return (
    <div className="App">
      <button className="btn__new-list"
              onClick={handleClick}>Create New List</button>
      {inModal && <NewListModal 
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    listName={listName}/>}
      <div className="list">{listName}</div>
    </div>
  )
}

export default App
