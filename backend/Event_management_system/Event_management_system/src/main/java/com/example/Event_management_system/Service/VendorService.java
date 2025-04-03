package com.example.Event_management_system.Service;

import com.example.Event_management_system.Model.Vendor;
import com.example.Event_management_system.Model.Event;
import com.example.Event_management_system.Model.Venue;
import com.example.Event_management_system.Repository.VendorRepository;
import com.example.Event_management_system.Repository.EventRepository;
import com.example.Event_management_system.Repository.VenueRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class VendorService {
    private final VendorRepository vendorRepository;
    private final EventRepository eventRepository;
    private final VenueRepository venueRepository;

    public VendorService(VendorRepository vendorRepository, EventRepository eventRepository, VenueRepository venueRepository) {
        this.vendorRepository = vendorRepository;
        this.eventRepository = eventRepository;
        this.venueRepository=venueRepository;
    }

    // Create
//    public Vendor addVendor(Vendor vendor) {
//        return vendorRepository.save(vendor);
//    }

    // Add Vendor (with optional venue link)

    public Vendor addVendor(Vendor vendor, Long venueId) {

        if (venueId != null) {
            Venue venue = venueRepository.findById(venueId)
                    .orElseThrow(() -> new RuntimeException("Venue not found"));

            vendor.setVenue(venue);
            venue.getPreferredVendors().add(vendor);  // Critical!

            // Save venue to cascade the operation
            venueRepository.save(venue);
        }
        return vendorRepository.save(vendor);
    }

    // Read
    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    public Vendor getVendorById(Long id) {
        return vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
    }

    // Update
    public Vendor updateVendor(Long id, Vendor vendorDetails) {
        Vendor vendor = getVendorById(id);
        vendor.setName(vendorDetails.getName());
        vendor.setContactEmail(vendorDetails.getContactEmail());
        vendor.setServiceType(vendorDetails.getServiceType());
        vendor.setContractDetails(vendorDetails.getContractDetails());
        return vendorRepository.save(vendor);
    }

    // Delete
    public void deleteVendor(Long id) {
        vendorRepository.deleteById(id);
    }

    // Link Vendor to Event
    public Vendor addVendorToEvent(Long vendorId, Long eventId) {
        Vendor vendor = getVendorById(vendorId);
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        vendor.getEvents().add(event);
        event.getVendors().add(vendor);
        vendorRepository.save(vendor);
        eventRepository.save(event);
        return vendor;
    }

    // Get Vendors by Venue
    public List<Vendor> getVendorsByVenue(Long venueId) {
        return vendorRepository.findByVenueId(venueId);
    }



}
