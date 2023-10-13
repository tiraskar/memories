import React from 'react'
import { TbMathGreater, TbMathLower } from 'react-icons/tb'
import { pages } from '../utils/page'

const Pagination = () => {
  return (
    <div className='flex justify-between border-2 rounded-md shadow-lg py-3 px-2'>
      <div className='bg-slate-200 rounded-full p-2'>
        <TbMathLower />
      </div>
      <div className='flex space-x-5 items-center  px-2'>
        {pages.map((page) => (
          <div key={page.id} className='bg-slate-200 rounded-full px-2 '>
            {page.number}
          </div>
        ))}
      </div>
      <div className='bg-slate-200 rounded-full p-2'>
        <TbMathGreater />
      </div>
    </div>
  )
}

export default Pagination
