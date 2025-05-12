package model;

import java.util.*;

import model.Book;

// Inheritance - User extends Person
public class User extends Person implements Authenticatable, Searchable<Book> {
    private String rollNo;
    private Cart cart;

    public User(String userId, String name, String email, String rollNo, String password) {
        super(userId, name, email, password); // Call to parent constructor
        this.rollNo = rollNo;
        this.cart = new Cart(userId);
    }

    // Implementation of abstract method from Person - Polymorphism
    @Override
    public boolean hasAdminRights() {
        return false;
    }

    // Implementation of interface method - Polymorphism
    @Override
    public boolean login(String email, String password) {
        System.out.println("User login attempt");
        return authenticate(email, password);
    }

    @Override
    public void logout() {
        System.out.println("User logged out");
    }

    @Override
    public boolean changePassword(String oldPassword, String newPassword) {
        if (getPassword().equals(oldPassword)) {
            setPassword(newPassword);
            return true;
        }
        return false;
    }

    // Implementation of Searchable interface - Polymorphism
    @Override
    public List<Book> search(List<Book> items, String keyword) {
        List<Book> results = new ArrayList<>();
        for (Book book : items) {
            if (book.getTitle().toLowerCase().contains(keyword.toLowerCase())) {
                results.add(book);
            }
        }
        return results;
    }

    // Method overloading - Polymorphism
    @Override
    public List<Book> search(List<Book> items, String keyword, String filterBy) {
        List<Book> results = new ArrayList<>();
        for (Book book : items) {
            if (filterBy.equalsIgnoreCase("title") && 
                book.getTitle().toLowerCase().contains(keyword.toLowerCase())) {
                results.add(book);
            } else if (filterBy.equalsIgnoreCase("author") && 
                       book.getAuthor().toLowerCase().contains(keyword.toLowerCase())) {
                results.add(book);
            }
        }
        return results;
    }

    public Cart getCart() {
        return cart;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }
}
