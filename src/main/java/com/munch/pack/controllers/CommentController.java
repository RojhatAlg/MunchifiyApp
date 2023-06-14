package com.munch.pack.controllers;

import com.munch.pack.dao.UserDao;
import com.munch.pack.entities.Comment;
import com.munch.pack.dao.CommentDao;
import com.munch.pack.entities.User;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class CommentController {
    private final CommentDao commentDAO;
    private final UserDao userDao;

    public CommentController(CommentDao commentDAO, UserDao userDao) {

        this.commentDAO = commentDAO;
        this.userDao = userDao;
    }

    /*
    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentDAO.findAll();
        for (Comment comment : comments) {
            User user = userDao.findById(comment.getUserId());
            if (user != null) {
                comment.setUserName(user.getName()); // Assuming you have a setter method for userName in Comment entity
                comment.setProfilePicture(user.getProfilePicture());
            }
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<>(comments, headers, HttpStatus.OK);
    }

     */



    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment createdComment = commentDAO.save(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }

    // Other endpoints for update, delete, etc.
}
