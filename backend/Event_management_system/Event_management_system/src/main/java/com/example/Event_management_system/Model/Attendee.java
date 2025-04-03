package com.example.Event_management_system.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;


import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "attendees")
@Data
public class Attendee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    // Many-to-Many with Event (managed by Event)
    @ManyToMany(mappedBy = "attendees")
    @JsonIgnoreProperties("attendees")  // Prevent circular JSON
    private List<Event> events = new ArrayList<>();
}