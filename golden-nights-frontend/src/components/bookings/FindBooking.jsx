import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'

const FindBooking = () => {


    const[confirmationCode, setConfirmationCode] = useState("")
    const[error, setError] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[isLoading, setIsLoading] = useState(false)
    const[bookingInfo, setBookingInfo] = useState({
        bookingId: "",
        room: {id:"", roomType: ""},
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numberOfAdults: "",
        numberOfChildren: "",
        totalNumOfGuest: "",
    })

    const[isDeleted, setIsDeleted] = useState(false)

    const clearBookingInfo = {
        bookingId: "",
        room: {id:"", roomType:""},
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numberOfAdults: "",
        numberOfChildren: "",
        totalNumOfGuest: "",

    }

    const handleInputChange = (e) =>{
        setConfirmationCode(e.target.value)

    }

    const handleFormSubmit = async(e) =>{
        e.preventDefault()
        setIsLoading(true)
        setError("")
        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)

        } catch (error) {
            setBookingInfo(clearBookingInfo)
            // Handle different error types
            if (error.response) {
                // Backend returned 4xx/5xx response
                if (error.response.status === 404) {
                setError(error.response.data); // Directly use the response body
                } else {
                setError(`Server error: ${error.response.status}`);
                }
            } else if (error.request) {
                // No response received
                setError("No response from server");
            } else {
                // Other errors
                setError(error.message);
            }

            // Auto-clear error after 2 seconds
            setTimeout(() => {
                setError("");
            }, 2000);
        } finally{
            setIsLoading(false)
        }
        
    }

    const handleBookingCancellation = async(bookingId) =>{
        try {
            await cancelBooking(bookingInfo.bookingId)
            setIsDeleted(true)
            setSuccessMessage("Booking has been cancelled successfully!")
            setBookingInfo(clearBookingInfo)
            setConfirmationCode("")
            setError("")
        } catch (error) {
            setError(error.message)
        }
        setTimeout(() =>{
            setSuccessMessage("")
            setIsDeleted(false)
        }, 2000)
    }

    

  return (
    <>
    <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
        <h2>Find My Booking</h2>
        <form onSubmit={handleFormSubmit} className='col-md-6'>
            <div className='input-group mb-3'>
                <input 
                className='form-control'
                id='confirmationCode'
                name='confirmationCode'
                value={confirmationCode}
                onChange={handleInputChange}
                placeholder='Enter the booking confirmation code'
                />
                <button className='btn btn-hotel input-group-text'>Find booking</button>

            </div>

        </form>
        {isLoading ? (
            <div>Finding booking......</div>
        ): error ? (
            <div className='text-danger'><strong>{error}</strong></div>
        ): bookingInfo.bookingConfirmationCode ? (
            <div className='col-md-6 mt-4 mb-5'>
                <h3>Booking Details</h3>
                <p>Booking Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                <p>Booking ID: {bookingInfo.bookingId}</p>
                <p>Room Number: {bookingInfo.room.id}</p>
                <p>Room Type: {bookingInfo.room.roomType}</p>
                <p>Check-in Date: {bookingInfo.checkInDate}</p>
                <p>Check-out Date: {bookingInfo.checkOutDate}</p>
                <p>Full Name: {bookingInfo.guestFullName}</p>
                <p>Email Address: {bookingInfo.guestEmail}</p>
                <p>Adults: {bookingInfo.numberOfAdults}</p>
                <p>Children: {bookingInfo.numberOfChildren}</p>
                <p>Total Guest: {bookingInfo.totalNumOfGuest}</p>


                {!isDeleted && (
                    <button
                    className='btn btn-danger'
                    onClick={ () =>handleBookingCancellation(bookingInfo.bookingId)}
                    >
                        Cancel Booking

                    </button>
                )}

            </div>
        ): (
            <div>Find booking</div>
        )}

        {isDeleted && (
            <div className='alert alert-success mt-3 ' role='alert'>{successMessage}</div>
        )}

    </div>
      
    </>
  )
}

export default FindBooking
