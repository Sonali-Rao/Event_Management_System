package com.example.Event_management_system.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;
    @ManyToMany
    @JoinTable(
            name = "event_vendor",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "vendor_id"))
    @JsonIgnoreProperties("events") // Add this
    private List<Vendor> vendors = new ArrayList<>();
    @ManyToMany
    @JoinTable(
            name = "event_attendee",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "attendee_id")
    )
    @JsonIgnoreProperties("events")  // Prevent circular JSON
    private List<Attendee> attendees = new ArrayList<>();
}
