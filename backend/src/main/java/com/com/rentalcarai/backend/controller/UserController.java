package com.com.rentalcarai.backend.controller;

import com.com.rentalcarai.backend.model.User;
import com.com.rentalcarai.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public java.util.List<User> getAllUsers() {
    return userRepository.findAll();
}

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        return userRepository.findByEmailAndPassword(
                user.getEmail(),
                user.getPassword()
        );
    }
}