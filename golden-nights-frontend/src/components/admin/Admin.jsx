import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className='container mt-5'>
        <h2>Welcome to Admin Panel</h2>
        <hr />
        <Link to={"/existing-rooms"} className='btn btn-hotel'>
            Manage Rooms
        </Link>
        <br />

        <Link to={"/existing-bookings"} className='btn btn-hotel mt-3'>
            Manage Bookings
        </Link>
      
    </section>
  )
}

export default Admin
