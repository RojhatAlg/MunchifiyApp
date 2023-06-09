package com.munch.pack;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Connection;

// Press Shift twice to open the Search Everywhere dialog and type `show whitespaces`,
// then press Enter. You can now see whitespace characters in your code.
public class Main {
    public static void main(String[] args) {

        CheckUser.login();
        Insert.insertIntoDB();
        CheckUser.login();
        Delete.deleteUser();


        ResultSet resultSet = CheckUser.login();

        try {
            // Iterate over the ResultSet to print user data
            while (resultSet.next()) {
                String retrievedName = resultSet.getString("name");
                String retrievedLastName = resultSet.getString("lastName");
                System.out.println("User: " + retrievedName + " " + retrievedLastName);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        // Close the ResultSet (if needed)
        try {
            resultSet.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}