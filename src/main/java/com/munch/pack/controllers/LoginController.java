package com.munch.pack.controllers;

import com.munch.pack.dao.LoginDao;
import com.munch.pack.dao.UserDao;
import com.munch.pack.entities.Login;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    private LoginDao loginDao;

    public LoginController(LoginDao loginDao) {
        this.loginDao = loginDao;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<Long> authenticateUser(@RequestBody Login login, HttpServletResponse response) {
        if (loginDao.authenticate(login)) {
            long id = login.getId();

            // Create a cookie
            Cookie cookie = new Cookie("user_id", String.valueOf(id));
            cookie.setPath("/");
            cookie.setMaxAge(24 * 60 * 60);
            // Add the cookie to the response
            response.addCookie(cookie);

            return ResponseEntity.ok(id);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body((long) -1);
        }
    }
}

