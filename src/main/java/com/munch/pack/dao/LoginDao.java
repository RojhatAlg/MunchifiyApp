package com.munch.pack.dao;


import com.munch.pack.entities.Login;
import com.munch.pack.entities.Reply;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class LoginDao {
    private List<Login> loginInfo;
    
    public LoginDao(){
        loginInfo = new ArrayList();
        loadFromDatabase();
        loginInfo.add(new Login(1,  "dummyuser", "dummypassword"));
    }

    private void loadFromDatabase() {
        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/munchdb", "root", "amed2012")){
            Statement statement = con.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT idUser, UserName, Password from user");

            while(resultSet.next()){
                long id = resultSet.getLong("idUser");
                String username = resultSet.getString("UserName");
                String password = resultSet.getString("Password");

                loginInfo.add(new Login(id, username, password));
            }




        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public boolean authenticate(Login login) {
        boolean isUser = false;

        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/munchdb", "root", "amed2012");
             PreparedStatement statement = con.prepareStatement("SELECT COUNT(*) FROM user WHERE UserName = ? AND Password = ?")) {
            statement.setString(1, login.getUsername());
            statement.setString(2, login.getPassword());

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    int count = resultSet.getInt(1);
                    isUser = count > 0;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return isUser;
    }

}
