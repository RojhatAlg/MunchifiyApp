package com.munch.pack;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Scanner;

public class Insert {

    public static void insertIntoDB(){

        try {
            Scanner sc = new Scanner(System.in);

            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/projekt_smidig", "root", "amed2012");

            Statement statement = connection.createStatement();

            System.out.println("Enter name for your new account: ");
            String name = sc.nextLine();
            System.out.println("Enter your last name for your new account: ");
            String lastName = sc.nextLine();

            String insertSql = "INSERT INTO bruker (Navn) VALUES ('" + name + "');";

            statement.executeUpdate(insertSql);

            System.out.println("Success, user is made");

            connection.close();
        } catch (Exception e ){
            e.printStackTrace();
        }
    }

}
