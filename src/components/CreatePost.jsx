import React, { useEffect, useState } from 'react'
import FormInput from './FormComponents/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../redux/slices/postSlices'
import Alert from './Alert'
import { toast } from 'react-toastify'
import FileBase64 from 'react-file-base64'

const initialState = {
  title: '',
  message: '',
  tags: '',
  creator: '',
  selectedFile: '',
}

const CreatePost = () => {
  const [values, setValues] = useState(initialState)
  const [showAlert, setShowAlert] = useState(false)
  const dispatch = useDispatch()
  const { appErr, success, loading, creator } = useSelector(
    (store) => store.posts
  )
  const handleChange = (e) => {
    setValues({
      ...values,
      creator: creator,
      [e.target.name]: e.target.value,
    })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost(values))
  }

  useEffect(() => {
    if (appErr) {
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 1000)
    }
    if (success) {
      toast.success('Post created Successfully...!', {
        position: 'top-center',
      })
      setValues(initialState)
    }
  }, [appErr, success])
  return (
    <>
      <div className='border-2  shadow-lg px-5 py-3 rounded-md space-y-3 text-center'>
        <h2 className='text-xl uppercase'>Creating a Memory</h2>
        {showAlert && <Alert errors={appErr} />}
        <form onSubmit={handleFormSubmit} className='space-y-3'>
          <FormInput
            name='title'
            value={values.title}
            handleChange={handleChange}
            placeholder='Memory Title'
          />
          <FormInput
            name='message'
            value={values.message}
            handleChange={handleChange}
            type='textarea'
            placeholder='Message of memory'
          />
          <FormInput
            name='tags'
            value={values.tags}
            handleChange={handleChange}
            placeholder='Tags'
          />
          <FileBase64
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setValues({ ...values, selectedFile: base64 })
            }
          />
          <button type='submit' className='form-button'>
            Create Post
          </button>
        </form>
      </div>
    </>
  )
}

export default CreatePost
