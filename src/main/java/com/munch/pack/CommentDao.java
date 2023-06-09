package com.munch.pack;

import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class CommentDao {
    private List<Comment> comments;

    public CommentDao() {
        comments = new ArrayList<>();
        loadCommentsFromDatabase();
    }

    private void loadCommentsFromDatabase() {
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/projekt_smidig", "root", "amed2012")) {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM Comments");

            while (resultSet.next()) {
                Long id = resultSet.getLong("idComments");
                Long postId = resultSet.getLong("PostId");
                Long userId = resultSet.getLong("UserId");
                String text = resultSet.getString("Comment");

                Comment comment = new Comment(id, text, userId);
                comments.add(comment);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
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
        Long maxId = comments.stream()
                .mapToLong(Comment::getId)
                .max()
                .orElse(0L);
        return maxId + 1;
    }
}
