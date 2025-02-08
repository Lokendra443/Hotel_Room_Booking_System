package com.lenncoder.hotel.service.impl;

import com.lenncoder.hotel.entity.BookedRoom;
import com.lenncoder.hotel.entity.Room;
import com.lenncoder.hotel.exception.InvalidBookingRequestException;
import com.lenncoder.hotel.exception.ResourceNotFoundException;
import com.lenncoder.hotel.repository.BookingRepo;
import com.lenncoder.hotel.service.BookingService;
import com.lenncoder.hotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepo bookingRepo;
    private final RoomService roomService;

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepo.findAll();
    }

    @Override
    public BookedRoom findByBookingConfirmtionCode(String confirmationCode) {
        return bookingRepo.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException("No booking found with booking code: "+confirmationCode));
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if(!bookingRequest.getCheckOutDate().isAfter(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Check-out date must come after check-out date");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, existingBookings);
        if(roomIsAvailable){
            bookingRequest.setRoom(room);
            room.addBooking(bookingRequest);
            bookingRepo.save(bookingRequest);
        }
        else {
            throw new InvalidBookingRequestException("Sorry, This room is not available for the selected dates");

        }
        return bookingRequest.getBookingConfirmationCode();
    }



    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepo.deleteById(bookingId);

    }

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingRepo.findByRoomId(roomId);
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
       return existingBookings.stream()
               .noneMatch(existingBooking ->
                               bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()) &&
                                       bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckInDate())

//                       bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
//                       || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
//                       || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
//                       && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
//                       || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
//
//                       && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
//                       || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
//
//                       && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))
//
//                       || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
//                       && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))
//
//                       ||(bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
//                       && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))

               );
    }
}
