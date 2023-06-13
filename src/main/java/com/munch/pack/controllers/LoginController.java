package com.munch.pack.controllers;

import com.munch.pack.dao.LoginDao;
import com.munch.pack.dao.UserDao;
import com.munch.pack.entities.Login;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    private LoginDao loginDao;
    private UserDao userdao;

    public LoginController(){
        loginDao = new LoginDao();

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<Long> authenticateUser(@RequestBody Login login){


        if (loginDao.authenticate(login)){
            long id = login.getId();
            return ResponseEntity.ok(id);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body((long)-1);
        }
    }


}
