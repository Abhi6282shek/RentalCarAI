package com.com.rentalcarai.backend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;

    private String model;

    @Column(name = "fuel_type")
    private String fuelType;

    @Column(name = "price_per_day")
    private Double pricePerDay;

    private String status;

    private Integer year;

    private Integer seats;

    private String transmission;

    private Double rating;

    @Column(name = "image_url")
    private String imageUrl;

    // Default Constructor
    public Car() {
    }

    // Parameterized Constructor
    public Car(Long id, String brand, String model,
               String fuelType, Double pricePerDay,
               String status, Integer year,
               Integer seats, String transmission,
               Double rating, String imageUrl) {

        this.id = id;
        this.brand = brand;
        this.model = model;
        this.fuelType = fuelType;
        this.pricePerDay = pricePerDay;
        this.status = status;
        this.year = year;
        this.seats = seats;
        this.transmission = transmission;
        this.rating = rating;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public Double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(Double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getSeats() {
        return seats;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}