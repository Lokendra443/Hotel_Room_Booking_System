package com.lenncoder.hotel.service;

import com.lenncoder.hotel.entity.BookedRoom;

import java.util.List;

public interface BookingService {

    List<BookedRoom> getAllBookings();

    BookedRoom findByBookingConfirmtionCode(String confirmationCode);

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    void cancelBooking(Long bookingId);

    List<BookedRoom> getAllBookingsByRoomId(Long roomId);

}
