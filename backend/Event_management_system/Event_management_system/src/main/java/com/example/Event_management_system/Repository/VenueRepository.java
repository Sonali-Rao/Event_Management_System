package com.example.Event_management_system.Repository;

import com.example.Event_management_system.Model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {
    List<Venue> findByLocation(String location);
    List<Venue> findByCapacityGreaterThanEqual(int minCapacity);
    List<Venue> findByLocationAndCapacityGreaterThanEqual(String location, int minCapacity);
}