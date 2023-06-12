package com.munch.pack;

import org.springframework.stereotype.Component;

import java.util.List;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class UserDao {
    private Connection connection;

    public UserDao() {
        try {
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/projekt_smidig", "root", "amed2012");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();

        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT * FROM user")) {
            while (resultSet.next()) {
                Long id = resultSet.getLong("idUser");
                String name = resultSet.getString("Name");
                User user = new User(id, name);
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
                    String name = resultSet.getString("Name");
                    user = new User(id, name);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return user;
    }

    public void addUser(User user) {
        try (PreparedStatement statement = connection.prepareStatement("INSERT INTO user (Name) VALUES (?)")) {
            statement.setString(1, user.getName());
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

        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/projekt_smidig", "root", "amed2012")) {
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

