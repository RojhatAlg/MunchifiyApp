package com.munch.pack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Scanner;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        // Start the application and get the application context
        ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);

        // Get the server's host address
        String hostAddress = getHostAddress();

        // Print the host address
        System.out.println("Application is running at: " + hostAddress);

        // Wait for user input to terminate the application
        System.out.println("Press Enter to stop the server.");
        Scanner scanner = new Scanner(System.in);
        scanner.nextLine();

        // Shut down the application gracefully
        context.close();
    }

    private static String getHostAddress() {
        try {
            // Get the IP address of the local machine
            InetAddress localhost = InetAddress.getLocalHost();
            String ipAddress = localhost.getHostAddress();

            // Construct the URL with the IP address and port
            return "http://" + ipAddress + ":8080";
        } catch (UnknownHostException e) {
            return "Unknown";
        }
    }

}
