import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api')
      const data = await response.json()
      setMessage(data.message)
    } catch (error) {
      setMessage('Failed to connect to server')
      console.error('Connection test failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>💼 Peopulse</h1>
        <p className="tagline">Know Your People. Drive Your Pulse.</p>
        
        <div className="test-connection">
          <button onClick={testConnection} disabled={loading}>
            {loading ? 'Testing...' : 'Test Server Connection'}
          </button>
          {message && (
            <p className={`message ${message.includes('Failed') ? 'error' : 'success'}`}>
              {message}
            </p>
          )}
        </div>
        
        <div className="info">
          <h2>🎯 Phase 0 Complete!</h2>
          <p>Your full-stack development environment is ready.</p>
          <div className="tech-stack">
            <h3>Tech Stack:</h3>
            <ul>
              <li>⚛️ React 19 + Vite</li>
              <li>🚀 Express 5 + Node.js</li>
              <li>🗄️ MySQL 8 + Docker</li>
              <li>📦 pnpm workspaces</li>
              <li>🔐 JWT Authentication ready</li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
