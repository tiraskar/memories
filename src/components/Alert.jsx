import React from 'react'

const Alert = ({ errors }) => {
  if (!errors) return null

  return (
    <div className='flex  justify-center text-center py-2  '>
      <h2 className='px-10 py-1 bg-red-200 rounded-lg'>{errors}</h2>
    </div>
  )
}

export default Alert

//  {
//    errors.split(',').map((error, index) => (
//      <p className='p-4 bg-red w-full' key={index}>
//        {error}
//      </p>
//    ))
//  }
