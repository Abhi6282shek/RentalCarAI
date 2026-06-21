package com.com.rentalcarai.backend.repository;

import com.com.rentalcarai.backend.model.Car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

}