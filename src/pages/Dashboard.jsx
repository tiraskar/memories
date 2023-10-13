import React from 'react'
import { Posts, SearchPost, CreatePost, Pagination } from '../components'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { userInfo } = useSelector((store) => store.user)

  return (
    <div className='flex flex-col-reverse md:flex md:flex-row md:justify-between mx-10 '>
      <Posts />
      <div className='space-y-4'>
        <SearchPost />
        {userInfo && <CreatePost />}
        <Pagination />
      </div>
    </div>
  )
}

export default Dashboard
