import './App.css'

function App() {

  type TResponse = {
    string: string
  }

  async function handleClick() {
    const response = await fetch("http://localhost:5002")
    const data: TResponse  = await response.json()
    console.log(data)
  }

  return (
    <div className="App">
      <div className="title"
           onClick={handleClick}>
            Hello World
      </div>
    </div>
  )
}

export default App
