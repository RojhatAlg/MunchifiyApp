package com.munch.pack.controllers;

import com.munch.pack.entities.User;
import com.munch.pack.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/signup")
public class UserController {
    private UserDao userDao;

    public ResponseEntity<String> signUpUser(@RequestBody User user) {
        try {
            // Save the user object to the database
            userDao.save(user);
            return ResponseEntity.ok("User signup successful");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to sign up user");
        }
    }

    @Autowired
    public UserController(UserDao userDao) {
        this.userDao = userDao;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<Void> signUp(@RequestBody User user) {
        userDao.addUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public List<User> getUsers() {
        return userDao.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userDao.getUserById(id);
    }

    // Other methods for handling user-related requests

    // ...
}
