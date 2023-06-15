package com.munch.pack.dao;

import com.munch.pack.entities.Post;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class PostDao {

    private final Connection connection;

    public PostDao() throws SQLException {
        // Establish a database connection
        String url = "jdbc:mysql://localhost:3306/munchdb";
        String username = "root";
        String password = "Passord123";
        connection = DriverManager.getConnection(url, username, password);
    }

    // Existing methods...

    public void updatePost(Post post) throws SQLException {
        String query = "UPDATE post SET UserId = ?, LikesId = ?, CommentId = ?, FavouriteId = ?, Bio = ?, Photo = ?, NrLikes = ?, NrFavourites = ? WHERE idPost = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setLong(1, post.getUserId());
            statement.setLong(2, post.getLikesId());
            statement.setLong(3, post.getCommentId());
            statement.setLong(4, post.getFavouriteId());
            statement.setString(5, post.getBio());
            statement.setString(6, post.getPhoto());
            statement.setString(7, post.getNrLikes());
            statement.setString(8, post.getNrFavourites());
            statement.setLong(9, post.getId());
            statement.executeUpdate();
        }
    }


    public void deletePost(long postId) throws SQLException {
        String query = "DELETE FROM post WHERE idPost = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setLong(1, postId);
            statement.executeUpdate();
        }
    }

    public Post getPostById(long postId) throws SQLException {
        String query = "SELECT * FROM post WHERE idPost = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setLong(1, postId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return extractPostFromResultSet(resultSet);
                }
            }
        }
        return null;
    }

    // Existing methods...

    private Post extractPostFromResultSet(ResultSet resultSet) throws SQLException {
        long id = resultSet.getLong("idPost");
        long userId = resultSet.getLong("UserId");
        long likesId = resultSet.getLong("LikesId");
        long commentId = resultSet.getLong("CommentId");
        long favouriteId = resultSet.getLong("FavouriteId");
        String bio = resultSet.getString("Bio");
        String photo = resultSet.getString("Photo");
        String nrLikes = resultSet.getString("NrLikes");
        String nrFavourites = resultSet.getString("NrFavourites");
        return new Post(id, userId, likesId, commentId, favouriteId, bio, photo, nrLikes, nrFavourites);
    }

    public List<Post> getAllPosts() throws SQLException {
        List<Post> posts = new ArrayList<>();
        String query = "SELECT * FROM post";
        try (PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                Post post = extractPostFromResultSet(resultSet);
                posts.add(post);
            }
        }
        return posts;
    }

    public List<Post> getPostsByUserId(long userId) throws SQLException {
        List<Post> posts = new ArrayList<>();
        String query = "SELECT * FROM post WHERE UserId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setLong(1, userId);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    Post post = extractPostFromResultSet(resultSet);
                    posts.add(post);
                }
            }
        }
        return posts;
    }

    public void addPost(Post post) throws SQLException {
        String query = "INSERT INTO post (UserId, LikesId, CommentId, FavouriteId, Bio, Photo, NrLikes, NrFavourites) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setLong(1, post.getUserId());
            statement.setLong(2, post.getLikesId());
            statement.setLong(3, post.getCommentId());
            statement.setLong(4, post.getFavouriteId());
            statement.setString(5, post.getBio());
            statement.setString(6, post.getPhoto());
            statement.setString(7, post.getNrLikes());
            statement.setString(8, post.getNrFavourites());
            statement.executeUpdate();
        }
    }

    // Add other methods for updating, deleting, and retrieving individual posts

    // Remember to handle SQLException appropriately in your application
}
