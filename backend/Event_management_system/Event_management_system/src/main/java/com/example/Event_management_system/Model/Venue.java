package com.example.Event_management_system.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "venues")
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private int capacity;
    @OneToMany(mappedBy = "venue", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("venue")  // Add this
    private List<Vendor> preferredVendors = new ArrayList<>();

}
