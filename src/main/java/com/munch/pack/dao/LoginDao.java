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
        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/munchdb", "root", "Passord123")){
            Statement statement = con.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT idUser, UserName, password from user");

            while(resultSet.next()){
                long id = resultSet.getLong("idUser");
                String username = resultSet.getString("username");
                String password = resultSet.getString("password");

                loginInfo.add(new Login(id, username, password));
            }




        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public long getUserId(Login login){
        long userId = 0;
        for(Login user: loginInfo){
            if (user.getUsername().equals( login.getUsername())){
                userId =  user.getId();
            }
        }
        return userId;
    }


    public boolean authenticate(Login login) {
        boolean isUser = false;
        for (Login user : loginInfo){
            if (user.getUsername().equals(login.getUsername()) &&
            user.getPassword().equals(user.getPassword())){
                isUser =  true;
            }
        }
        return isUser;
    }
}
