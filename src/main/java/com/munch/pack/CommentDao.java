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
        loadRepliesFromDatabase();
    }

    private void loadCommentsFromDatabase() {
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/projekt_smidig", "root", "amed2012")) {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * from comments, user WHERE  comments.UserId = user.idUser;");

            while (resultSet.next()) {
                Long id = resultSet.getLong("idComments");
                String name = resultSet.getString("name");
                Long postId = resultSet.getLong("PostId");
                Long userId = resultSet.getLong("UserId");
                String text = resultSet.getString("Comment");
                Date date = resultSet.getDate("Date");

                Comment comment = new Comment(id, text, userId, name, date);
                comments.add(comment);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void loadRepliesFromDatabase() {
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/projekt_smidig", "root", "amed2012")) {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * from replies;");

            while (resultSet.next()) {
                Long id = resultSet.getLong("idReplies");
                Long commentId = resultSet.getLong("idComments");
                Long userId = resultSet.getLong("userId");
                String text = resultSet.getString("text");
                Date date = resultSet.getDate("date");

                // Find the corresponding comment for the reply
                Comment comment = findCommentById(commentId);
                if (comment != null) {
                    Reply reply = new Reply(id, text, commentId, date, userId);
                    comment.addReply(reply);
                }
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

    private Comment findCommentById(Long commentId) {
        for (Comment comment : comments) {
            if (comment.getId().equals(commentId)) {
                return comment;
            }
        }
        return null;
    }
}
