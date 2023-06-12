package com.munch.pack.dao;

import com.munch.pack.entities.Likes;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class LikesDao {
    private List<Likes> likes;

    public LikesDao() {
        likes = new ArrayList<>();
        likes.add(new Likes(1L, 1L, 1L));
        likes.add(new Likes(2L, 2L, 2L));
        likes.add(new Likes(3L, 1L, 2L));
    }

    public List<Likes> findAll() {
        return likes;
    }

    public Likes save(Likes like) {
        like.setId(generateNextId());
        likes.add(like);
        return like;
    }

    private Long generateNextId() {
        Long maxId = likes.stream()
                .mapToLong(Likes::getId)
                .max()
                .orElse(0L);
        return maxId + 1;
    }
}
