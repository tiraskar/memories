import React, { useState } from 'react'
import FormInput from './FormComponents/FormInput'

const initialState = {
  memories: '',
  tags: '',
}

const SearchPost = () => {
  const [values, setValues] = useState(initialState)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const { memories, tags } = values
    console.log(memories, tags)
  }
  return (
    <div className='border-2 px-5 py-3  shadow-lg rounded-md'>
      <form onSubmit={handleFormSubmit} className='space-y-3'>
        <FormInput
          name='memories'
          value={values.memories}
          handleChange={handleChange}
          placeholder='Search Memories'
        />
        <FormInput
          name='tags'
          value={values.tags}
          handleChange={handleChange}
          placeholder='Search Tags'
        />
        <button type='submit' className='form-button'>
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchPost
