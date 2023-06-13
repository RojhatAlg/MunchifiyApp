package com.munch.pack.controllers;

import com.munch.pack.dao.LoginDao;
import com.munch.pack.entities.Login;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    private LoginDao loginDao;

    public LoginController(){
        loginDao = new LoginDao();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<String> authenticateUser(@RequestBody Login login){

        if (loginDao.authenticate(login)){
            return new ResponseEntity<>("User signed in successfully", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Failed to login", HttpStatus.UNAUTHORIZED);
        }
    }


}
