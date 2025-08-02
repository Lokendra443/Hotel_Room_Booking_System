import React, { useEffect, useState } from 'react'
import MainHeader from '../layout/MainHeader'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'
import { useLocation } from 'react-router-dom'


const Home = () => {

  const location = useLocation()
  const initialMessage = location.state && location.state.message
  const currentUser = localStorage.getItem("userId")

  const [message, setMessage] = useState(initialMessage);
  const [showUser, setShowUser] = useState(!!currentUser);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
      setShowUser(false);
    }, 3000); // Clear message after 3 seconds
    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [])



  return (
    <section>
      {message && <p className='text-warning px-5 text-center'>{message}</p> }
      {showUser && <h6 className='text-success text-center'>You are logged In as {currentUser}</h6> }
      <MainHeader/>
      <div className='container'>
        <RoomCarousel/>
        <Parallax/>
        <HotelService/>
        <Parallax/>
      </div>
    </section>
  )
}

export default Home
