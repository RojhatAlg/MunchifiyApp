package com.munch.pack;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Scanner;

public class CheckUser {

    public static void login(){

        try {
            Scanner sc = new Scanner(System.in);

            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/munchdb", "root", "Passord123");

            Statement statement = connection.createStatement();

            String name = sc.nextLine();

            ResultSet resultSet = statement.executeQuery("SELECT * FROM people where name = '" + name +"'");

            if (resultSet.next()){
                System.out.printf("Success, this is your user: " + resultSet.getString("name") + " ");
                System.out.printf(resultSet.getString("lastName"));
                System.out.println("");
            }else{
                System.out.println("This user is not in the database, try again!");
            }
            connection.close();
        } catch (Exception e ){
            e.printStackTrace();
        }
    }
}
