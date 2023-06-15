package com.munch.pack.dao;

import com.munch.pack.entities.Comment;
import com.munch.pack.entities.Reply;
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
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/munchdb", "root", "passord123")) {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT c.idComments, c.Comment, c.UserId, c.Date, c.PostId, u.name, u.photo " +
                    "FROM comments c " +
                    "JOIN user u ON c.UserId = u.idUser;");

            while (resultSet.next()) {
                Long id = resultSet.getLong("idComments");
                String text = resultSet.getString("Comment");
                Long userId = resultSet.getLong("UserId");
                Date date = resultSet.getDate("Date");
                Long postId = resultSet.getLong("PostId");
                String photo = resultSet.getString("u.photo");

                System.out.println("Photo: " + photo);

                Comment comment = new Comment(id, text, userId, postId, date, photo);
                comment.setPhoto(photo);
                comments.add(comment);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    private void loadRepliesFromDatabase() {
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/munchdb", "root", "passord123")) {
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

    public Comment save(Comment comment) {
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/munchdb", "root", "passord123")) {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO comments (PostId, UserId, Comment, Date) VALUES (?, ?, ?, ?)");
            statement.setLong(1, comment.getPostId());
            statement.setLong(2, comment.getUserId());
            statement.setString(3, comment.getText());
            statement.setDate(4, (Date) comment.getDate());

            int rowsInserted = statement.executeUpdate();
            if (rowsInserted > 0) {
                // Comment was successfully inserted into the database
                ResultSet generatedKeys = statement.getGeneratedKeys();
                if (generatedKeys.next()) {
                    comment.setId(generatedKeys.getLong(1));
                    comments.add(comment);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return comment;
    }

}
