import React from 'react'

export default function NumberCard({ title, number }) {
  return (
    <div style={{width: '250px', height: '100px'}} className='shadow-lg p-5 pt-3 flex flex-col justify-center items-start border-2 border-solid border-gray rounded-lg hover:bg-purple hover:border-0 hover:text-white'>
        <div className= 'font-semibold text-lg h-2/4'>{title}</div>
        <div className= 'text-4xl h-2/4'>{number}</div>
    </div>
  )
}
