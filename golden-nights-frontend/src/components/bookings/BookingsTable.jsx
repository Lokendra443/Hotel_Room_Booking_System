import { parseISO } from 'date-fns'
import React, { useEffect, useState } from 'react'
import DateSlider from '../common/DateSlider'

const BookingsTable = ({bookingInfo, handleBookingCancellation}) => {

    const[filteredBookings, setFilteredBookings] = useState(bookingInfo)
    
    
    const filterBookings = (startDate, endDate) =>{
        let filtered = bookingInfo
        if(startDate && endDate){
            filtered = bookingInfo.filter((booking) =>{
                const bookingStartDate = parseISO(booking.checkInDate)
                const bookingEndDate = parseISO(booking.checkOutDate)
                return bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
            })
        }
        setFilteredBookings(filtered)

    }

    useEffect(() =>{
        console.log(bookingInfo); //
        setFilteredBookings(bookingInfo)
    }, [bookingInfo])


  return (
    <section className='p-4'>
        <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings}/>
        
        <div >

        <table className='table table-bordered table-hover shadow small text-nowrap '>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Booking ID</th>
                    <th>Room ID</th>
                    <th>Room Type</th>
                    <th>Check-In Date</th>
                    <th>Check-Out Date</th>
                    <th>Guest Name</th>
                    <th>Guest Email</th>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Total Guest</th>
                    <th>Confirmation Code</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>

            <tbody className='text-center'>
                {filteredBookings.map((booking, index) => (
                    <tr key={booking.id || index}>
                        <td>{index + 1}</td>
                        <td>{booking.bookingId}</td>
                        <td>{booking.room?.id}</td>
                        <td>{booking.room?.roomType}</td>
                        <td>{booking.checkInDate}</td>
                        <td>{booking.checkOutDate}</td>
                        <td>{booking.guestFullName}</td>
                        <td>{booking.guestEmail}</td>
                        <td>{booking.numberOfAdults}</td>
                        <td>{booking.numberOfChildren}</td>
                        <td>{booking.totalNumOfGuest || 'N/A'}</td>
                        <td>{booking.bookingConfirmationCode}</td>
                        <td>
                            <button
                            className='btn btn-danger btn-sm mx-2'
                            onClick={() =>handleBookingCancellation(booking.id)}
                            >
                                Cancel

                            </button>
                        </td>
                        
                    </tr>
                ))}

            </tbody>
        </table>
        </div>
        {filteredBookings.length === 0 && 
            <p className='text-center mt-3'>No booking found for selected date</p>
        }


      
    </section>
  )
}

export default BookingsTable
