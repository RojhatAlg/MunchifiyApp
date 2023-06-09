package com.munch.pack.controllers;

import com.munch.pack.entities.Likes;
import com.munch.pack.dao.LikesDao;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class LikesController {
    private final LikesDao likesDao;

    public LikesController(LikesDao likesDao) {
        this.likesDao = likesDao;
    }

    @GetMapping
    public ResponseEntity<List<Likes>> getAllLikes() throws SQLException {
        List<Likes> likes = likesDao.findAll();
        return ResponseEntity.ok(likes);
    }

    @PostMapping
    public ResponseEntity<Likes> createLike(@RequestBody Likes like) throws SQLException {
        Likes createdLike = likesDao.save(like);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLike);
    }
}
