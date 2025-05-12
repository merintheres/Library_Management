package model;

import java.util.*;

import model.Admin;
import model.Book;
import model.Transaction;

public class LibrarySystem {
    private List<User> users;
    private List<Admin> admins;
    private List<Book> books;
    private List<Transaction> transactions;

    public LibrarySystem() {
        users = new ArrayList<>();
        admins = new ArrayList<>();
        books = new ArrayList<>();
        transactions = new ArrayList<>();
    }

    public void registerUser(User user) {
        users.add(user);
    }

    public void registerAdmin(Admin admin) {
        admins.add(admin);
    }

    // Polymorphism - using Person as a common type
    public List<Person> getAllPersons() {
        List<Person> allPersons = new ArrayList<>();
        allPersons.addAll(users);
        allPersons.addAll(admins);
        return allPersons;
    }

    // Polymorphism - using Authenticatable interface
    public Object authenticate(String email, String password) {
        for (Authenticatable user : users) {
            if (user.login(email, password)) return user;
        }
        for (Authenticatable admin : admins) {
            if (admin.login(email, password)) return admin;
        }
        return null;
    }

    // Method overloading - Polymorphism
    public List<Book> searchBooks(String keyword) {
        List<Book> results = new ArrayList<>();
        for (Book book : books) {
            if (book.getTitle().toLowerCase().contains(keyword.toLowerCase()) || 
                book.getAuthor().toLowerCase().contains(keyword.toLowerCase()) ||
                book.getGenre().toLowerCase().contains(keyword.toLowerCase())) {
                results.add(book);
            }
        }
        return results;
    }

    public List<Book> searchBooks(String keyword, String filterBy) {
        List<Book> results = new ArrayList<>();
        for (Book book : books) {
            if (filterBy.equalsIgnoreCase("title") && 
                book.getTitle().toLowerCase().contains(keyword.toLowerCase())) {
                results.add(book);
            } else if (filterBy.equalsIgnoreCase("author") && 
                       book.getAuthor().toLowerCase().contains(keyword.toLowerCase())) {
                results.add(book);
            } else if (filterBy.equalsIgnoreCase("genre") && 
                       book.getGenre().toLowerCase().contains(keyword.toLowerCase())) {
                results.add(book);
            }
        }
        return results;
    }

    public List<Book> getBooks() {
        return books;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public List<User> getUsers() {
        return users;
    }

    public List<Admin> getAdmins() {
        return admins;
    }
}
