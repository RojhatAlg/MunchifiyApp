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
        loginInfo.add(new Login("dummyuser", "dummypassword"));
    }

    private void loadFromDatabase() {
        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/projekt_smidig", "root", "amed2012")){
            Statement statement = con.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT username, password from users");

            while(resultSet.next()){
                String username = resultSet.getString("username");
                String password = resultSet.getString("password");

                loginInfo.add(new Login(username, password));
            }




        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public boolean authenticate(Login login) {
        boolean isUser = false;
        for (Login user : loginInfo){
            if (user.getUsername() == login.getUsername() &&
            user.getPassword() == user.getPassword()){
                isUser =  true;
            }
        }
        return isUser;
    }
}
