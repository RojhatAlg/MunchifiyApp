package com.munch.pack.dao;

import com.munch.pack.entities.Notification;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class NotificationDao {
    private final Connection connection;

    public NotificationDao() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/munchdb";
        String username = "root";
        String password = "passord123";
        connection = DriverManager.getConnection(url, username, password);
    }

    public List<Notification> getNotificationsByUserId(long userId) throws SQLException {
        List<Notification> notifications = new ArrayList<>();
        String query = "SELECT * FROM notification WHERE UserId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setLong(1, userId);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    Notification notification = extractNotificationFromResultSet(resultSet);
                    notifications.add(notification);
                }
            }
        }
        return notifications;
    }

    public void addNotification(Notification notification) throws SQLException {
        String query = "INSERT INTO notification (UserId, Message, Timestamp, IsRead) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setLong(1, notification.getUserId());
            statement.setString(2, notification.getMessage());
            statement.setTimestamp(3, Timestamp.valueOf(notification.getTime()));
            statement.setBoolean(4, notification.isRead());
            statement.executeUpdate();
        }
    }

    public void markNotificationAsRead(long notificationId) throws SQLException {
        String query = "UPDATE notification SET IsRead = true WHERE id = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setLong(1, notificationId);
            statement.executeUpdate();
        }
    }

    private Notification extractNotificationFromResultSet(ResultSet resultSet) throws SQLException {
        long id = resultSet.getLong("id");
        long userId = resultSet.getLong("UserId");
        String message = resultSet.getString("Message");
        LocalDateTime timestamp = resultSet.getTimestamp("Time").toLocalDateTime();
        boolean isRead = resultSet.getBoolean("IsRead");

        Notification notification = new Notification();
        notification.setId(id);
        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setTime(timestamp);
        notification.setRead(isRead);

        return notification;
    }
}
