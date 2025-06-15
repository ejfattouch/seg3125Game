import React from 'react'

const App = () => {

  const dummyWords = ["CAT", "DOG", "COT", "DOT", "GOD", "TAC", "ACT", "ADO", "CAT", "DOG", "COT", "DOT", "GOD", "TAC", "ACT", "ADO"]

  return (
    <div className="flex flex-col space-y-4 max-w-2xl my-12 m-auto text-center w-full justify-center">
      <h1 className='text-3xl font-bold'>Word Seeker</h1>
      <p>Seek and find all hidden words using the given letters</p>
      <div className='flex gap-4 justify-center'>
        <div className='bg-green-200 font-bold text-md text-green-600 px-2 rounded-full'>Words Found: 0/16</div>
        <div className='bg-purple-200 font-bold text-md text-purple-600 px-2 rounded-full'>Seeker Score: 0</div>  
      </div>
      <div className="border rounded-xl border-gray-300 shadow-md p-4">
        <div>
          <h1 className='font-bold text-xl'>Letter Collection</h1>
        </div>
        <div className='flex gap-2 justify-center items-center p-4 '>
          <span className="bg-blue-500 text-white font-bold text-2xl py-1 px-3 rounded-md">C</span>
          <span className="bg-blue-500 text-white font-bold text-2xl py-1 px-3 rounded-md">A</span>
          <span className="bg-blue-500 text-white font-bold text-2xl py-1 px-3 rounded-md">T</span>
          <span className="bg-blue-500 text-white font-bold text-2xl py-1 px-3 rounded-md">D</span>
          <span className="bg-blue-500 text-white font-bold text-2xl py-1 px-3 rounded-md">O</span>
          <span className="bg-blue-500 text-white font-bold text-2xl py-1 px-3 rounded-md">G</span>
          </div>
      </div>
      <div className="border rounded-xl border-gray-300 shadow-md flex flex-col items-center p-4 gap-4">
        <input type="text" placeholder="Type your word here..." className="py-1 px-16 border rounded-md" />
          <button className="py-2 px-4 bg-purple-600 cursor-pointer rounded-md text-white">Seek Work</button>
      </div>
      <div className="border rounded-xl flex justify-center items-center flex-col space-y-4 border-gray-300 shadow-md p-4">
        <div>
          <h1 className='font-bold text-xl'>Words Found</h1>
        </div>
        <p className='text-gray-600 max-w-sm my-4'>You haven't found any words yet. Try typing in some to see how many you can get!</p>
      </div>
      <div className="border rounded-xl border-gray-300 shadow-md p-4">
        <div>
          <h1 className='font-bold text-lg'>Words to Seek</h1>
        </div>
        <div className='grid grid-cols-4 gap-4 mt-4'>
        {
          dummyWords.map((word, index) => {
            return (
              <div key={index} className="bg-gray-200 rounded-md py-6 px- ">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )
          })
        }
      </div>
      </div>
      <div className="border rounded-xl space-y-4 border-gray-300 shadow-md p-4">
        <div className='w-full flex justify-between'>
          <span className=''>Seeking Progress</span>
          <span className=''>0%</span>
        </div>
        <div className="w-full border py-2 rounded-full" />
      </div>
    </div>
  )
}

export default App
