package com.example.Event_management_system.Service;

import com.example.Event_management_system.Model.Attendee;
import com.example.Event_management_system.Model.Event;
import com.example.Event_management_system.Repository.AttendeeRepository;
import com.example.Event_management_system.Repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

//
//import java.util.List;
//
@Service
@RequiredArgsConstructor
public class AttendeeService {
    private final AttendeeRepository attendeeRepo;
    private final EventRepository eventRepo;

    // Create
    public Attendee createAttendee(Attendee attendee) {
        return attendeeRepo.save(attendee);
    }

    // Read
    public List<Attendee> getAllAttendees() {
        return attendeeRepo.findAll();
    }

    public Attendee getAttendeeById(Long id) {
        return attendeeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendee not found"));
    }

    // Update
    public Attendee updateAttendee(Long id, Attendee attendeeDetails) {
        Attendee attendee = getAttendeeById(id);
        attendee.setName(attendeeDetails.getName());
        attendee.setEmail(attendeeDetails.getEmail());
        return attendeeRepo.save(attendee);
    }

    // Delete
    public void deleteAttendee(Long id) {
        Attendee attendee = getAttendeeById(id);
        // Remove attendee from all events first
        attendee.getEvents().forEach(event -> event.getAttendees().remove(attendee));
        attendeeRepo.delete(attendee);
    }

    // Register for Event
    @Transactional
    public Attendee registerForEvent(Long attendeeId, Long eventId) {
        Attendee attendee = getAttendeeById(attendeeId);
        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        attendee.getEvents().add(event);
        event.getAttendees().add(attendee);
        eventRepo.save(event);  // Cascade saves attendee

        return attendee;
    }
}