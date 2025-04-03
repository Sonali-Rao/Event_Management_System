package com.example.Event_management_system.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "vendors")
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String contactEmail;
    private String serviceType; // e.g., "Catering", "AV", "Decor"
    private String contractDetails;

    // Many-to-Many with Event
    @ManyToMany(mappedBy = "vendors")
    @JsonIgnoreProperties("vendors") // Add this
    private List<Event> events = new ArrayList<>();

    // Many-to-One with Venue (optional)
    @ManyToOne
    @JoinColumn(name = "venue_id")
    @JsonIgnoreProperties("preferredVendors")  // Add this
    private Venue venue;
}