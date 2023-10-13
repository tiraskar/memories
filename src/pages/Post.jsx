import React, { useEffect } from 'react'
import { PostRecommendation } from '../components'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSinglePost } from '../redux/slices/postSlices'

const Post = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  useEffect(() => {
    dispatch(getSinglePost(id))
  }, [dispatch, id])

  const { selectedPost } = useSelector((store) => store.posts)

  if (!selectedPost) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <div className=' border-2 mx-5 p-4 shadow-lg rounded-lg  lg:mx-8 my-6 items-center'>
        <div className='flex flex-col-reverse lg:flex-row '>
          <div className='lg:w-2/3 lg:px-5'>
            <h2 className='text-4xl font-semibold pb-2'>
              {selectedPost.post.title}
            </h2>
            <p className='opacity-70'>{selectedPost.post.tags}</p>
            <p className='py-2 text-lg text-start '>
              {selectedPost.post.message}
            </p>
            <p className='text-xl'>
              {`Create by: ${selectedPost.post.creator.firstName} 
              ${selectedPost.post.creator.lastName}`}
            </p>
            <p className='opacity-80'>5 hours ago</p>

            <div className=' border-y-2 space-y-3 py-2 my-2 font-semibold'>
              <p className=''>Realtime Chat: Coming Soon...</p>
              <hr />
              <p>Commenting: Coming Soon...</p>
            </div>
          </div>
          <div className='rounded-lg'>
            <img
              src={selectedPost.post.selectedFile}
              alt=''
              className='rounded-lg'
            />
          </div>
        </div>
      </div>
      <div>
        <PostRecommendation />
      </div>
    </>
  )
}

export default Post
