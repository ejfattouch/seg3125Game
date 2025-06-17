import React, { useState } from 'react'
import Game from './Game'

const App = () => {
  const [gameStart, setGameStart] = useState(false)


  return (
    
      gameStart ? 
      <Game setGameStart={setGameStart} charList={['C', 'A', 'T', 'D', 'O', 'G']} wordList={[{ word: 'CAT', status: 'missing' },
        { word: 'DOG', status: 'missing' },
        { word: 'COT', status: 'missing' },
        { word: 'DOT', status: 'missing' },
        { word: 'GOD', status: 'missing' },
        { word: 'TAC', status: 'missing' },
        { word: 'ADO', status: 'missing' },
        { word: 'ACT', status: 'missing' }]} /> : <div className='min-h-screen w-full flex justify-center items-center'>
      <button className='py-2 px-6 shadow-md shadow-gray-800 cursor-pointer text-2xl bg-white border-none text-black rounded-md' onClick={() => setGameStart(true)}>PLAY</button>
    </div>
    
  )
}

export default App


