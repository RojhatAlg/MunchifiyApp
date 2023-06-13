package com.munch.pack.controllers;

import com.munch.pack.entities.Login;
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

    private List<User> createuserInfo;

    @Autowired
    public UserController(UserDao userDao) {
        userDao = new UserDao();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public  void signUp(@RequestBody User user){
        createuserInfo.add(user);
    }

    @GetMapping
    public List<User> getUsers() {
        return userDao.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userDao.findById(id);
    }

    // Other methods for handling user-related requests

    // ...
}
