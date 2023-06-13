package com.munch.pack.dao;

import com.munch.pack.entities.User;
import org.springframework.stereotype.Component;

import java.util.List;

import java.sql.*;
import java.util.ArrayList;

@Component
public class UserDao {
    private Connection connection;

    public UserDao() {
        try {
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/munch_db", "root", "Passord123");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();

        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT * FROM user")) {
            while (resultSet.next()) {
                String username = resultSet.getString("username");
                User user = new User(username);
                users.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return users;
    }

    public User getUserById(Long id) {
        User user = null;

        try (PreparedStatement statement = connection.prepareStatement("SELECT * FROM user WHERE idUser = ?")) {
            statement.setLong(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    String username = resultSet.getString("username");
                    user = new User(username);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return user;
    }

    public void addUser(User user) {
        try (PreparedStatement statement = connection.prepareStatement("INSERT INTO user (Name, Surname, Username, Email, Password) VALUES (?, ?, ?, ?, ?)")) {
            statement.setString(1, user.getName());
            statement.setString(2, user.getSurname());
            statement.setString(3, user.getUsername());
            statement.setString(4, user.getEmail());
            statement.setString(5, user.getPassword());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void updateUser(User user) {
        try (PreparedStatement statement = connection.prepareStatement("UPDATE user SET Name = ? WHERE idUser = ?")) {
            statement.setString(1, user.getName());
            statement.setLong(2, user.getId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteUser(Long id) {
        try (PreparedStatement statement = connection.prepareStatement("DELETE FROM user WHERE idUser = ?")) {
            statement.setLong(1, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }



    public User findById(Long id) {
        User user = null;

        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/munch_db", "root", "Passord123")) {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM user WHERE idUser = ?");
            statement.setLong(1, id);

            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                user = new User();
                user.setId(resultSet.getLong("idUser"));
                user.setName(resultSet.getString("Name"));
                // Set other properties of the user if needed
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return user;
    }
}

