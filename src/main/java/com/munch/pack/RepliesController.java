package com.munch.pack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/replies")
public class RepliesController {
    private RepliesDao repliesDao;

    @Autowired
    public RepliesController(RepliesDao repliesDao) {
        this.repliesDao = repliesDao;
    }

    @GetMapping
    public List<Reply> getAllReplies() {
        return repliesDao.findAll();
    }

    @PostMapping
    public Reply createReply(@RequestBody Reply reply) {
        return repliesDao.save(reply);
    }

    // Add other methods for updating, deleting, and retrieving specific replies

    // Example:
    // @GetMapping("/{id}")
    // public Reply getReplyById(@PathVariable Long id) {
    //     return repliesDao.findById(id);
    // }

    // Note: The above code assumes you are using a framework like Spring Boot with annotations.
    // If you are using a different framework, the code might vary.
}

