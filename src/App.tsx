import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleAlert = (message: string) => {
    alert(message)
  }

  const handleConfirm = (message: string) => {
    const confirmed = confirm(message)
    if (confirmed) {
      alert('You confirmed!')
    } else {
      alert('You cancelled!')
    }
  }

  const handlePrompt = () => {
    const userInput = prompt('Enter your favorite color:')
    if (userInput) {
      alert(`Your favorite color is: ${userInput}`)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Form submitted! Name: ${name}, Email: ${email}`)
    setName('')
    setEmail('')
    setShowForm(false)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Meticulous</h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <div className="interactive-section">
        <h2>Interactive Elements for Testing</h2>
        
        <div className="button-group">
          <button onClick={() => handleAlert('Hello from Meticulous!')}>
            Show Alert
          </button>
          
          <button onClick={() => handleConfirm('Do you want to continue?')}>
            Show Confirm
          </button>
          
          <button onClick={handlePrompt}>
            Show Prompt
          </button>
          
          {/* <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Hide Form' : 'Show Form'}
          </button> */}
        </div>

        {showForm && (
          <form onSubmit={handleFormSubmit} className="test-form">
            <h3>Test Form</h3>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <button type="submit">Submit Form</button>
          </form>
        )}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
