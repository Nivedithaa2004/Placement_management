package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Placement;
import com.example.demo.repository.PlacementRepository;

@Service
public class PlacementService {

    @Autowired
    private PlacementRepository prepo;

    // ADD
    public Placement addPlacement(Placement placement) {
        return prepo.save(placement);
    }

    // GET ALL (extra useful)
    public List<Placement> getPlacements() {
        return prepo.findAll();
    }

    // SEARCH
    public Placement searchPlacement(Long id) {
        return prepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Placement not found"));
    }

    // UPDATE
    public Placement updatePlacement(Placement placement) {
        Placement existing = prepo.findById(placement.getId())
                .orElseThrow(() -> new RuntimeException("Placement not found"));

        existing.setName(placement.getName());
        existing.setCollege(placement.getCollege());
        existing.setQualification(placement.getQualification());
        existing.setYear(placement.getYear());

        return prepo.save(existing);
    }

    // DELETE (cancelPlacement)
    public boolean cancelPlacement(Long id) {
        Placement placement = prepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Placement not found"));

        prepo.deleteById(id);
        return true;
    }
}