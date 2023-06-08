package com.munch.pack;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Scanner;

public class Insert {

    public static void insertIntoDB(){

        try {
            Scanner sc = new Scanner(System.in);

            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/munchdb", "root", "Passord123");

            Statement statement = connection.createStatement();

            String name = sc.nextLine();
            String lastName = sc.nextLine();

            String insertSql = "INSERT INTO `people` (`name`, `lastName`) VALUES ('" + name + "', '" + lastName + "');";

            statement.executeUpdate(insertSql);

            System.out.println("Success, user is made");

            connection.close();
        } catch (Exception e ){
            e.printStackTrace();
        }
    }

}
