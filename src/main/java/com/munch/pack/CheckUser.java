package com.munch.pack;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Scanner;

public class CheckUser {

    public static ResultSet login(){

        ResultSet resultSet = null;

        try {
            Scanner sc = new Scanner(System.in);

            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/projekt_smidig", "root", "amed2012");

            Statement statement = connection.createStatement();

            System.out.println("Enter name to check if your user exist:");
            String name = sc.nextLine();

            resultSet = statement.executeQuery("SELECT * FROM user where Name = '" + name +"'");

            if (resultSet.next()){
                System.out.printf("Success, this is your user: " + resultSet.getString("Name") + " ");
                System.out.println("");
            }else{
                System.out.println("This user is not in the database, try again!");
            }
            connection.close();
        } catch (Exception e ){
            e.printStackTrace();
        }
        return resultSet;
    }


}
