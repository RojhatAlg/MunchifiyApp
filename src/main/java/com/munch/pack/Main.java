package com.munch.pack;

// Press Shift twice to open the Search Everywhere dialog and type `show whitespaces`,
// then press Enter. You can now see whitespace characters in your code.
public class Main {
    public static void main(String[] args) {

        CheckUser.login();
        Insert.insertIntoDB();
        CheckUser.login();
        Delete.deleteUser();
    }
}