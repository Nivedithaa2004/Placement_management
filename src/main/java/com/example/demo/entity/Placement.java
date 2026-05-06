package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "placement")
public class Placement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDate college;
    private String qualification;

    @Column(name = "placement_year")
    private int year;

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDate getCollege() {
        return college;
    }

    public String getQualification() {
        return qualification;
    }

    public int getYear() {
        return year;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCollege(LocalDate college) {
        this.college = college;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public void setYear(int year) {
        this.year = year;
    }
}