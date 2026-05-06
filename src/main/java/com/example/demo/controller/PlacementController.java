package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Placement;
import com.example.demo.service.PlacementService;

@RestController
public class PlacementController {

    @Autowired
    private PlacementService pser;

    // ADD
    @PostMapping("/addplacement")
    public Placement addPlacement(@RequestBody Placement placement) {
        return pser.addPlacement(placement);
    }

    // GET ALL
    @GetMapping("/getplacement")
    public List<Placement> getPlacements() {
        return pser.getPlacements();
    }

    // SEARCH
    @GetMapping("/getplacement/{id}")
    public Placement getPlacement(@PathVariable Long id) {
        return pser.searchPlacement(id);
    }

    // UPDATE
    @PutMapping("/updateplacement")
    public Placement updatePlacement(@RequestBody Placement placement) {
        return pser.updatePlacement(placement);
    }

    // DELETE (cancel)
    @DeleteMapping("/deleteplacement/{id}")
    public boolean deletePlacement(@PathVariable Long id) {
        return pser.cancelPlacement(id);
    }

    // HEALTH
    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("service", "PlacementManagement2");
        return status;
    }
}