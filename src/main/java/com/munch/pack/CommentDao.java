package com.munch.pack;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CommentDao {
    private List<Comment> comments;

    public CommentDao() {
        // Initialize the comments list with dummy data
        comments = new ArrayList<>();
        comments.add(new Comment(1L, "This is the first comment.", 1L));
        comments.add(new Comment(2L, "This is the second comment.", 2L));
        comments.add(new Comment(3L, "This is the third comment.", 1L));
    }

    public List<Comment> findAll() {
        return comments;
    }

    public Comment save(Comment comment) {
        comment.setId(generateNextId());
        comments.add(comment);
        return comment;
    }

    private Long generateNextId() {
        // Generate a unique ID for the new comment
        Long maxId = comments.stream()
                .mapToLong(Comment::getId)
                .max()
                .orElse(0L);
        return maxId + 1;
    }
}
