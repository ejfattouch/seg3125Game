import React, { useState } from 'react'
import { Input } from './ui/input.jsx'
import { Progress } from './ui/progress.jsx'
import { ArrowLeftFromLine } from 'lucide-react'
import {cn} from "@/lib/utils.js";

const Game = ({setGameStart, charList, wordList}) => {
      const [progressStatus, setProgressStatus] = useState(0)
      const [wordGuess, setWordGuess] = useState("")
      const [wordLetters, setWordLetters] = useState(charList)
      const [words, setWords] = useState(wordList)
      const [isShaking, setIsShaking] = useState(false);
      const [isCorrect, setIsCorrect] = useState(false);

      const shakeInput = () => {
          setIsShaking(true);
          // Stop shaking after a short delay (e.g., 500ms, matching animation duration)
          setTimeout(() => {
              setIsShaking(false);
              setWordGuess("")
          }, 500); // Adjust this duration to match your animation
      }

      const setCorrectInput = () => {
          setIsCorrect(true);
          setTimeout(() => {
              setIsCorrect(false);
          }, 500)
      }

    const checkWordInListOfWords = () => {
        if (!wordGuess.trim()) return shakeInput();
    
        const found = words.find(
          (w) => w.word.toLowerCase() === wordGuess.toLowerCase()
        )
        if (!found || found.status === 'completed') return shakeInput();

        const updated = words.map((w) =>
          w.word === found.word ? { ...w, status: 'completed' } : w
        )
        setWords(updated)
    
        const completedCount = updated.filter((w) => w.status === 'completed').length
        const newProgress = Math.round((completedCount / updated.length) * 100)
        setProgressStatus(newProgress)
    
        setWordGuess("")
    
        return setCorrectInput();
      }
  return (
    <div className="min-h-screen relative bg-gray-800 text-gray-200 flex flex-col space-y-6 max-w-5xl mx-auto mb-10 py-12 px-4">
          <ArrowLeftFromLine onClick={() => setGameStart(false)} className='absolute top-13 left-5 size-10 cursor-pointer' />
          <h1 className="text-4xl font-bold text-center">Word Seeker</h1>
          <p className="text-gray-400 text-center">
            Seek and find all hidden words using the given letters
          </p>
    
          <div className="flex gap-4 justify-center">
            <div className="bg-green-700/30 text-green-300 font-bold py-2 px-4 rounded-full">
              Words Found: {words.filter((w) => w.status === 'completed').length}/{words.length}
            </div>
            <div className="bg-purple-700/30 text-purple-300 font-bold py-2 px-4 rounded-full">
                Seeker Score: {
                words.filter((w) => w.status === 'completed')
                    .reduce((totalScore, wordObject) => totalScore + (wordObject.word.length * 10), 0)
            }            </div>
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
              onChange={(e) => setWordGuess(e.target.value.toUpperCase())}
              className={cn(
                  "bg-gray-600 text-gray-100 border border-gray-500 rounded-md w-full placeholder-gray-400 text-center py-4 px-6 text-xl lg:text-2xl",
                        isShaking ? "animate-shake border-red-500" : "",
                        isCorrect ? "border-green-500" : ""
                  )}
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
            {words.sort((a, b) => a.word.localeCompare(b.word)).filter((w) => w.status === 'completed').length > 0 ? (
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
            <div className="grid grid-cols-4 gap-4 font-mono select-none">
              {words.map((wordObj, i) =>
                  wordObj.status === 'missing' ? (
                <div
                  key={i}
                  className="bg-gray-600 rounded-md px-6 py-8 flex items-center justify-center"
                >
                    {wordObj.word.split("").map((char, i) => (<span className=" border w-6 h-6 text-center mx-1 bg-gray-500">?</span>))}
                </div>
              ) : null )}
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
        </div>
  )
}

export default Game