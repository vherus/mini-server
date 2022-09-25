import React from 'react'

function DeleteUser({ handleSubmit, handleChange }) {
  return (
    <div className='admin__delete-user'>
        <h4>Delete user by -</h4>
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

export default DeleteUser