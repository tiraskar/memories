import React, { useEffect } from 'react'
import { AiOutlineLike, AiOutlineDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, deletePost, likePost } from '../redux/slices/postSlices'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'

const Posts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { allPosts, creator, deletedPost } = useSelector((store) => store.posts)

  const handlePostLike = (like) => {
    if (!creator) {
      toast.error('Login first to like post', { position: 'top-center' })
      navigate('/login')
    }
    dispatch(likePost(like))
  }

  const handleDeletePost = (data) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure want to delete post?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deletePost(data)),
        },
        {
          label: 'No',
        },
      ],
    })
  }

  useEffect(() => {
    if (deletedPost) {
      toast.success('Post deleted successfully..!', { position: 'top-center' })
    }
    dispatch(fetchPosts())
  }, [dispatch, deletePost, creator])

  return (
    <>
      <div className=' md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-6 md:pr-10 gap-10'>
        {allPosts?.map((post) => (
          <div key={post._id} className='shadow-lg  rounded-lg'>
            <div className='relative'>
              <div className='h-40 overflow-hidden  rounded-t-lg lg:h-36'>
                <img src={post.selectedFile} alt='' />
              </div>
            </div>
            <div className='pl-4 py-2  overflow-hidden'>
              <p className='text-sm opacity-60'>{post.tags}</p>

              <h2 className='py-2 text-xl'>{post.title}</h2>

              <p className='h-12 overflow-hidden'>{post.message}</p>
              <div className='flex py-3 items-center justify-between'>
                <div className='flex space-x-4'>
                  <AiOutlineLike
                    size={28}
                    onClick={() => handlePostLike(post._id)}
                    className='cursor-pointer'
                  />
                  <span className='text-xl'>{post.likeCount} Likes</span>
                </div>
                {creator
                  ? creator.email === post.creator.email && (
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className='pr-10'
                      >
                        <AiOutlineDelete size={28} />
                      </button>
                    )
                  : null}
              </div>
            </div>
            <button
              onClick={() => {
                navigate(`/post/${post._id}`)
              }}
              className='text-center w-full  text-lg bg-slate-200  lg:px-20'
            >
              See more
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Posts
