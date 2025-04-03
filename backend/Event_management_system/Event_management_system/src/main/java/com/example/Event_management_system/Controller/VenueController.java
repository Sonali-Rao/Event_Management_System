package com.example.Event_management_system.Controller;

import com.example.Event_management_system.Model.Venue;
import com.example.Event_management_system.Service.VenueService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/venues")
public class VenueController {
    private final VenueService venueService;

    public VenueController(VenueService venueService) {
        this.venueService = venueService;
    }

    @GetMapping
    public List<Venue> getAllVenues() {
        return venueService.getAllVenues();
    }

    @GetMapping("/{id}")
    public Venue getVenueById(@PathVariable Long id) {
        return venueService.getVenueById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Venue addVenue(@RequestBody Venue venue) {
        return venueService.addVenue(venue);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Venue updateVenue(@PathVariable Long id, @RequestBody Venue venueDetails) {
        return venueService.updateVenue(id, venueDetails);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteVenue(@PathVariable Long id) {
        venueService.deleteVenue(id);
        return ResponseEntity.ok().build();
    }
}