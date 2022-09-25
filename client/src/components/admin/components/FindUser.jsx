import React from 'react'

function FindUser({ handleSubmit, handleChange }) {
  return (
    <div className='admin__delete-user'>
        <h4>Find user by -</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor='userId'>
            User ID: 
            <input
              type='number'
              name='userId'
              onChange={handleChange}
            />
          </label>
          <label htmlFor='email'>
            Email: 
            <input
              type='email'
              name='email'
              onChange={handleChange}
            />
          </label>
          <input type='submit' value='Submit!' />
        </form>
      </div>
  )
}

export default FindUser