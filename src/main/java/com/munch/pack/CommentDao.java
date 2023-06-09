package com.munch.pack;

import org.apache.catalina.User;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class CommentDao {
    private List<Comment> comments;
    private List<User> users;

    public CommentDao() {
        comments = new ArrayList<>();
        users = new ArrayList<>();
        loadCommentsFromDatabase();
    }

    private void loadCommentsFromDatabase() {
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/munch_db", "root", "Passord123")) {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * from comments, user WHERE  comments.UserId = user.idUser;");

            while (resultSet.next()) {
                Long id = resultSet.getLong("idComments");
                String name = resultSet.getString("name");
                Long postId = resultSet.getLong("PostId");
                Long userId = resultSet.getLong("UserId");
                String text = resultSet.getString("Comment");

                Comment comment = new Comment(id, text, userId, name);
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
