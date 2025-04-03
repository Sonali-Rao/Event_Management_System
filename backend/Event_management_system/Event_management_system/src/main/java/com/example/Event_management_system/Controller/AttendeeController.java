package com.example.Event_management_system.Controller;

import com.example.Event_management_system.Model.Attendee;
import com.example.Event_management_system.Service.AttendeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//
@RestController
@RequestMapping("/api/attendees")
@RequiredArgsConstructor
public class AttendeeController {
    private final AttendeeService attendeeService;

    // Create
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Attendee createAttendee(@RequestBody Attendee attendee) {
        return attendeeService.createAttendee(attendee);
    }

    // Read (All)
    @GetMapping
    public List<Attendee> getAllAttendees() {
        return attendeeService.getAllAttendees();
    }

    // Read (Single)
    @GetMapping("/{id}")
    public Attendee getAttendeeById(@PathVariable Long id) {
        return attendeeService.getAttendeeById(id);
    }

    // Update
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Attendee updateAttendee(
            @PathVariable Long id,
            @RequestBody Attendee attendeeDetails
    ) {
        return attendeeService.updateAttendee(id, attendeeDetails);
    }

    // Delete
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAttendee(@PathVariable Long id) {
        attendeeService.deleteAttendee(id);
        return ResponseEntity.ok().build();
    }

    // Register for Event
    @PostMapping("/{attendeeId}/events/{eventId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Attendee registerForEvent(
            @PathVariable Long attendeeId,
            @PathVariable Long eventId
    ) {
        return attendeeService.registerForEvent(attendeeId, eventId);
    }
}