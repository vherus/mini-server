import React from 'react'

function UserForm({ handleSubmit, handleChange, user }) {
  return (
    <div>
        <form className="form" onSubmit={handleSubmit}>
        <h2>Registration form!</h2>
        <div className="form__section-left">

          <label>
            email
            <input 
              type="email" 
              name="email" 
              required
             onChange={handleChange}
              value={user.email}
              />
          </label>
          <label>
            Password
            <input 
              type="password" 
              name="password" 
              required
             onChange={handleChange}
            value={user.password}
              />
          </label>
          <input 
          type="submit" 
          value="Submit!"
           onClick={handleSubmit}
           />
           </div>
      </form>
    </div>
  )
}

export default UserForm