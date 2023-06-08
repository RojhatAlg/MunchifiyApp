package com.munch.pack;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Scanner;

public class Delete {

    public static void deleteUser(){
        try {
            Scanner sc = new Scanner(System.in);

            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/munchdb", "root", "Passord123");

            Statement statement = connection.createStatement();

            String name = sc.nextLine();

            String insertSql = "Delete from people where name = '" + name + "';";

            statement.executeUpdate(insertSql);

            System.out.println("Success, user is deleted");

            connection.close();
        } catch (Exception e ){
            e.printStackTrace();
        }
    }

}
