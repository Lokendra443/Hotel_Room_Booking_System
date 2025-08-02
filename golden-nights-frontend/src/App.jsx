import { useState } from 'react'
import Home from './components/home/Home';
import EditRoom from './components/room/EditRoom';
import ExistingRooms from './components/room/ExistingRooms';
import AddRoom from './components/room/AddRoom';
import NavBar from './components/layout/NavBar';
import { Route, Routes } from 'react-router-dom';
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';
import Checkout from './components/bookings/Checkout';
import BookingSuccess from './components/bookings/BookingSuccess';
import Bookings from './components/bookings/Bookings';
import FindBooking from './components/bookings/FindBooking';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Profile from './components/auth/Profile';
import Logout from './components/auth/Logout';
import AuthProvider from './components/auth/AuthProvider';
import Footer from './components/layout/Footer';


function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <div className="app-container">
        <main className="flex-grow">
          <NavBar />
          <div className='flex-1'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-room" element={<AddRoom />} />
              <Route path="/book-room/:roomId" element={<Checkout />} />
              <Route path="/existing-rooms" element={<ExistingRooms />} />
              <Route path="/edit-room/:roomId" element={<EditRoom />} />
              <Route path="/browse-all-rooms" element={<RoomListing />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/existing-bookings" element={<Bookings />} />
              <Route path="/find-booking" element={<FindBooking />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
