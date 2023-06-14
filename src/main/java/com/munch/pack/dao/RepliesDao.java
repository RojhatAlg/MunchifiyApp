package com.munch.pack.dao;

import com.munch.pack.entities.Reply;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class RepliesDao {
    private List<Reply> replies;

    public RepliesDao() {
        replies = new ArrayList<>();
        loadRepliesFromDatabase();
    }

    private void loadRepliesFromDatabase() {
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/munchdb", "root", "passord123")) {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM replies");

            while (resultSet.next()) {
                Long id = resultSet.getLong("idReplies");
                Long commentId = resultSet.getLong("idComments");
                String text = resultSet.getString("text");
                Long userId = resultSet.getLong("userId");
                Date date = resultSet.getDate("date");

                Reply reply = new Reply(id, text, commentId, date, userId);
                replies.add(reply);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Reply> findAll() {
        return replies;
    }

    public Reply save(Reply reply) {
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/projekt_smidig", "root", "amed2012")) {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO replies (idComments, text, userId, date) VALUES (?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            statement.setLong(1, reply.getCommentId());
            statement.setString(2, reply.getText());
            statement.setLong(3, reply.getUserId());
            statement.setDate(4, new java.sql.Date(reply.getDate().getTime()));

            int rowsInserted = statement.executeUpdate();
            if (rowsInserted > 0) {
                ResultSet generatedKeys = statement.getGeneratedKeys();
                if (generatedKeys.next()) {
                    Long id = generatedKeys.getLong(1);
                    reply.setId(id);
                    replies.add(reply);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return reply;
    }



}
