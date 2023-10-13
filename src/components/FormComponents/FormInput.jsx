import React from 'react'

const FormInput = ({
  type,
  value,
  name,
  handleChange,
  labelText,
  placeholder,
}) => {
  return (
    <div className=''>
      <label className='block mb-2 text-xl text-start'>{labelText}</label>
      {type === 'textarea' ? (
        <textarea
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className='form-input h-24 bg-white'
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className='form-input bg-white'
        />
      )}
    </div>
  )
}

export default FormInput
