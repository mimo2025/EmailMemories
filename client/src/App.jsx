import { useState, useEffect } from 'react'

function App() {
  const [memories, setMemories] = useState([])
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3001/auth/status', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setLoggedIn(data.loggedIn)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (loggedIn) {
      fetch('http://localhost:3001/memories', { credentials: 'include' })
        .then(res => res.json())
        .then(data => setMemories(data.memories || []))
    }
  }, [loggedIn])

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold text-gray-800">📬 Email Memories</h1>
        <p className="text-gray-500 text-lg">Rediscover emails from this day in years past.</p>
        
          <a href="http://localhost:3001/auth/login"
          className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg hover:bg-gray-700 transition"
          >
          Sign in with Google
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📬 Email Memories</h1>
        <p className="text-gray-500 mb-8">Emails from this day in past years</p>

        {memories.length === 0 ? (
          <p className="text-gray-400">No memories found for today. Try again tomorrow!</p>
        ) : (
          memories.map((memory, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-amber-100">
              <p className="text-xs text-amber-500 font-semibold uppercase tracking-wide mb-2">{memory.year} · {new Date(memory.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">{memory.subject}</h2>
              <p className="text-gray-500 text-sm">{memory.from}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
