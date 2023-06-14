package com.munch.pack.dao;

import com.munch.pack.entities.Likes;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class LikesDao {
    private final Connection connection;

    public LikesDao() throws SQLException {
        // Establish a database connection
        String url = "jdbc:mysql://localhost:3306/munchdb";
        String username = "root";
        String password = "passord123";
        connection = DriverManager.getConnection(url, username, password);
    }

    public List<Likes> getAllLikes() throws SQLException {
        List<Likes> likes = new ArrayList<>();
        String query = "SELECT * FROM likes";
        try (PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                Likes like = extractLikesFromResultSet(resultSet);
                likes.add(like);
            }
        }
        return likes;
    }

    public Likes saveLike(Likes like) throws SQLException {
        String query = "INSERT INTO likes (UserId, PostId) VALUES (?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            statement.setLong(1, like.getUserId());
            statement.setLong(2, like.getPostId());
            statement.executeUpdate();

            ResultSet generatedKeys = statement.getGeneratedKeys();
            if (generatedKeys.next()) {
                like.setId(generatedKeys.getLong(1));
                return like;
            } else {
                throw new SQLException("Failed to save like, no ID obtained.");
            }
        }
    }

    public boolean hasUserLikedPost(long userId, long postId) throws SQLException {
        String query = "SELECT COUNT(*) FROM likes WHERE UserId = ? AND PostId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setLong(1, userId);
            statement.setLong(2, postId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    int count = resultSet.getInt(1);
                    return count > 0;
                }
            }
        }
        return false;
    }

    // Other methods for updating, deleting, and retrieving individual likes can be added here

    // Remember to handle SQLException appropriately in your application

    private Likes extractLikesFromResultSet(ResultSet resultSet) throws SQLException {
        long id = resultSet.getLong("idLikes");
        long userId = resultSet.getLong("UserId");
        long postId = resultSet.getLong("PostId");
        return new Likes(id, userId, postId);
    }
}
