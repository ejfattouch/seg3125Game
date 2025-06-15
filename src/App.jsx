import React, { useState } from 'react'
import { Input } from './components/ui/input'
import { Progress } from './components/ui/progress'

const App = () => {
  const [gameStart, setGameStart] = useState(false)
  const [progressStatus, setProgressStatus] = useState(35)
  const [wordGuess, setWordGuess] = useState("")
  const [wordLetters, setWordLetters] = useState(['C', 'A', 'T', 'D', 'O', 'G'])
  const [words, setWords] = useState([
    { word: 'CAT', status: 'missing' },
    { word: 'DOG', status: 'missing' },
    { word: 'COT', status: 'missing' },
    { word: 'DOT', status: 'missing' },
    { word: 'GOD', status: 'missing' },
    { word: 'TAC', status: 'missing' },
    { word: 'ADO', status: 'missing' },
    { word: 'ACT', status: 'missing' },
  ])

  const checkWordInListOfWords = () => {
    if (!wordGuess.trim()) return;

    const found = words.find(
      (w) => w.word.toLowerCase() === wordGuess.toLowerCase()
    )
    if (!found) return

    const updated = words.map((w) =>
      w.word === found.word ? { ...w, status: 'completed' } : w
    )
    setWords(updated)

    const completedCount = updated.filter((w) => w.status === 'completed').length
    const newProgress = Math.round((completedCount / updated.length) * 100)
    setProgressStatus(newProgress)

    setWordGuess("")
  }

  return (
    
      gameStart ? <div className="min-h-screen bg-gray-800 text-gray-200 flex flex-col space-y-6 max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center">Word Seeker</h1>
      <p className="text-gray-400 text-center">
        Seek and find all hidden words using the given letters
      </p>

      <div className="flex gap-4 justify-center">
        <div className="bg-green-700/30 text-green-300 font-bold py-2 px-4 rounded-full">
          Words Found: {words.filter((w) => w.status === 'completed').length}/{words.length}
        </div>
        <div className="bg-purple-700/30 text-purple-300 font-bold py-2 px-4 rounded-full">
          Seeker Score: {words.filter((w) => w.status === 'completed').length * 10}
        </div>
      </div>

      <section className="bg-gray-700 border border-gray-600 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Letter Collection</h2>
        <div className="flex gap-2 justify-center">
          {wordLetters.map((ltr) => (
            <span
              key={ltr}
              className="bg-gray-600 text-gray-100 font-bold text-2xl py-2 px-4 rounded-md"
            >
              {ltr}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-gray-700 border border-gray-600 rounded-xl shadow-md flex flex-col gap-4 p-6">
        <Input
          type="text"
          placeholder="Type your word here..."
          value={wordGuess}
          onKeyDown={(e) => {
            if (e.key === "Enter") checkWordInListOfWords();
          }}
          onChange={(e) => setWordGuess(e.target.value)}
          className="bg-gray-600 text-gray-100 border border-gray-500 rounded-md py-2 px-3 w-full placeholder-gray-400"
        />
        <button
          onClick={checkWordInListOfWords}
          className="w-full cursor-pointer text-center py-2 rounded-md font-bold bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
        >
          Seek Word
        </button>
      </section>

      <section className="bg-gray-700 border border-gray-600 rounded-xl shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Words Found</h2>
        {words.filter((w) => w.status === 'completed').length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {words
              .filter((w) => w.status === 'completed')
              .map((w, i) => (
                <span
                  key={i}
                  className="bg-green-600 text-gray-100 font-bold py-1 px-3 rounded"
                >
                  {w.word}
                </span>
              ))}
          </div>
        ) : (
          <p className="text-gray-400">
            You haven't found any words yet. Try typing some to see how many you can
            get!
          </p>
        )}
      </section>

      <section className="bg-gray-700 border border-gray-600 rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Words to Seek</h2>
        <div className="grid grid-cols-4 gap-4">
          {words.map((wordObj, i) => (
            <div
              key={i}
              className="bg-gray-600 rounded-md py-8 flex items-center justify-center"
            >
              {wordObj.status === 'missing' ? (
                <span className="text-gray-500">?</span>
              ) : (
                <span className="text-gray-100 font-bold">{wordObj.word}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-700 border border-gray-600 rounded-xl shadow-md p-6">
        <div className="flex justify-between mb-2">
          <span>Seeking Progress</span>
          <span>{progressStatus}%</span>
        </div>
        <Progress
          value={progressStatus}
          className="w-full bg-gray-600 border border-gray-500 rounded-full [&>*]:bg-gray-100"
        />
      </section>
    </div> : <div className='min-h-screen w-full flex justify-center items-center'>
      <button className='py-2 px-6 shadow-md shadow-gray-800 cursor-pointer text-2xl bg-white border-none text-black rounded-md' onClick={() => setGameStart(true)}>PLAY</button>
    </div>
    
  )
}

export default App


