package com.com.rentalcarai.backend.controller;

import com.com.rentalcarai.backend.model.Booking;
import com.com.rentalcarai.backend.repository.BookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
}

    @PostMapping
public Booking createBooking(@RequestBody Booking booking) {
    return bookingRepository.save(booking);
}

@PutMapping("/cancel/{id}")
public Booking cancelBooking(@PathVariable Long id) {

    Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

    booking.setBookingStatus("Cancelled");

    return bookingRepository.save(booking);
}

@PutMapping("/complete/{id}")
public Booking completeBooking(@PathVariable Long id) {

    Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

    booking.setBookingStatus("Completed");

    return bookingRepository.save(booking);
}
}