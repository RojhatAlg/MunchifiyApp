package com.munch.pack;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Scanner;

public class Delete {

    public static void deleteUser(){
        try {
            Scanner sc = new Scanner(System.in);

            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/projekt_smidig", "root", "amed2012");

            Statement statement = connection.createStatement();

            System.out.println("Enter user you want to delete:");
            String name = sc.nextLine();

            String insertSql = "Delete from bruker where Navn = '" + name + "';";

            statement.executeUpdate(insertSql);

            System.out.println("Success, user is deleted");

            connection.close();
        } catch (Exception e ){
            e.printStackTrace();
        }
    }

}
