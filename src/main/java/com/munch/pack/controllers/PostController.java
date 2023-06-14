package com.munch.pack.controllers;

import com.munch.pack.dao.PostDao;
import com.munch.pack.entities.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/post")
public class PostController {

    private final PostDao postDao;

    @Autowired
    public PostController(PostDao postDao) {
        this.postDao = postDao;
    }

    @GetMapping
    public List<Post> getAllPosts() throws SQLException {
        return postDao.getAllPosts();
    }

    @GetMapping("/{userId}")
    public List<Post> getPostsByUserId(@PathVariable long userId) throws SQLException {
        return postDao.getPostsByUserId(userId);
    }

    @PostMapping
    public void createPost(@RequestBody Post post) throws SQLException {
        postDao.addPost(post);
    }
}
