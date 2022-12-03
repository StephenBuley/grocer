import { useState } from 'react'
import './App.css'
import { NewListModal } from './NewListModal'

function App() {
  const [inModal, setInModal] = useState<boolean>(false)

  function handleClick() {
    setInModal(true)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setInModal(false)
  }

  return (
    <div className="App">
      <button className="btn__new-list"
              onClick={handleClick}>Create New List</button>
      {inModal && <NewListModal handleSubmit={handleSubmit}/>}
    </div>
  )
}

export default App
