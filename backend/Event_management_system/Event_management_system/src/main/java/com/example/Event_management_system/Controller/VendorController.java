package com.example.Event_management_system.Controller;

import com.example.Event_management_system.Model.Vendor;
import com.example.Event_management_system.Model.Venue;
import com.example.Event_management_system.Repository.VendorRepository;
import com.example.Event_management_system.Repository.VenueRepository;
import com.example.Event_management_system.Service.VendorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {
    private final VendorService vendorService;
    private final VenueRepository venueRepository;
    private final VendorRepository vendorRepository;
    public VendorController(VendorService vendorService,VenueRepository venueRepository,VendorRepository vendorRepository) {
        this.vendorService = vendorService;
        this.venueRepository=venueRepository;
        this.vendorRepository=vendorRepository;
    }

    // Create Vendor (optionally link to Venue)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Vendor addVendor(@RequestBody Vendor vendor,@RequestParam(required = false) Long venueId) {
        return vendorService.addVendor(vendor,venueId);

//        if (venueId != null) {
//            Venue venue = venueRepository.findById(venueId)
//                    .orElseThrow(() -> new RuntimeException("Venue not found"));
//            vendor.setVenue(venue);
//            // Sync bidirectional relationship
//            venue.getPreferredVendors().add(vendor);  // Critical!
//        }
//        return vendorRepository.save(vendor);
    }

    // Read
    @GetMapping
    public List<Vendor> getAllVendors() {
        return vendorService.getAllVendors();
    }

    @GetMapping("/{id}")
    public Vendor getVendorById(@PathVariable Long id) {
        return vendorService.getVendorById(id);
    }

    // Update
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Vendor updateVendor(@PathVariable Long id, @RequestBody Vendor vendorDetails) {
        return vendorService.updateVendor(id, vendorDetails);
    }

    // Delete
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);
        return ResponseEntity.ok().build();
    }

    // Link Vendor to Event
    @PostMapping("/{vendorId}/events/{eventId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Vendor addVendorToEvent(
            @PathVariable Long vendorId,
            @PathVariable Long eventId
    ) {
        return vendorService.addVendorToEvent(vendorId, eventId);
    }

    // Get Vendors by Venue
    @GetMapping("/by-venue/{venueId}")
    public List<Vendor> getVendorsByVenue(@PathVariable Long venueId) {
        return vendorService.getVendorsByVenue(venueId);
    }


}