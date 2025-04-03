package com.example.Event_management_system.Repository;

import com.example.Event_management_system.Model.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AttendeeRepository extends JpaRepository<Attendee, Long> {
    // Find attendees by event ID
    List<Attendee> findByEvents_Id(Long eventId);
}