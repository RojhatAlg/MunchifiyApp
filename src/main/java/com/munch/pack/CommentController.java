package com.munch.pack;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;



import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentDao commentDAO;

    public CommentController(CommentDao commentDAO) {
        this.commentDAO = commentDAO;
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentDAO.findAll();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<>(comments, headers, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment createdComment = commentDAO.save(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }

    // Other endpoints for update, delete, etc.
}
