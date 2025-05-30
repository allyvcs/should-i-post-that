'use client'

import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<null | {
    sentiment: string
    toxicity: string
    recommendation: string
  }>(null)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!input.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      })

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setResult({
        sentiment: 'error',
        toxicity: 'error',
        recommendation: 'Oops! Something went wrong.',
      })
    } finally {
      setLoading(false)
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      case 'neutral':
        return 'text-gray-600'
      default:
        return 'text-yellow-600'
    }
  }

  const getToxicityColor = (toxicity: string) => {
    return toxicity === 'high' ? 'text-red-600' : 'text-green-600'
  }

  const getEmoji = (sentiment: string, toxicity: string) => {
    if (toxicity === 'high') return '☣️'
    if (sentiment === 'positive') return '😊'
    if (sentiment === 'negative') return '😬'
    if (sentiment === 'neutral') return '😐'
    return '🤔'
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Should I Post That?</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your post or headline here..."
        className="w-full max-w-xl p-4 h-48 rounded-lg border border-gray-400 shadow-md mb-4"
      ></textarea>

      <button
        onClick={handleClick}
        disabled={loading}
        className={`${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
        } text-white px-6 py-3 rounded-lg font-semibold transition`}
      >
        {loading ? 'Analyzing...' : 'Analyze Post'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-white border rounded-lg shadow w-full max-w-xl">
          <p className={`text-lg mb-1 ${getSentimentColor(result.sentiment)}`}>
            Sentiment: <strong>{result.sentiment}</strong> {getEmoji(result.sentiment, result.toxicity)}
          </p>
          <p className={`text-lg mb-1 ${getToxicityColor(result.toxicity)}`}>
            Toxicity: <strong>{result.toxicity}</strong>
          </p>
          <p className="text-lg text-indigo-800">
            Recommendation: <strong>{result.recommendation}</strong>
          </p>
        </div>
      )}
    </main>
  )
}
