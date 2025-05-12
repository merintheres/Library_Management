package model;

import java.util.*;

// Inheritance - Admin extends Person
public class Admin extends Person implements Authenticatable, BookManagement, Searchable<Book> {
    // No need for duplicate fields as they're inherited from Person

    public Admin(String adminId, String name, String email, String password) {
        super(adminId, name, email, password); // Call to parent constructor
    }

    // Implementation of abstract method from Person - Polymorphism
    @Override
    public boolean hasAdminRights() {
        return true;
    }

    // Implementation of interface method - Polymorphism
    @Override
    public boolean login(String email, String password) {
        System.out.println("Admin login attempt");
        return authenticate(email, password);
    }

    @Override
    public void logout() {
        System.out.println("Admin logged out");
    }

    @Override
    public boolean changePassword(String oldPassword, String newPassword) {
        if (getPassword().equals(oldPassword)) {
            setPassword(newPassword);
            return true;
        }
        return false;
    }

    // Implementation of BookManagement interface - Polymorphism
    @Override
    public void addBook(List<Book> books, Book book) {
        books.add(book);
        System.out.println("Book added by admin: " + getName());
    }

    @Override
    public void updateBook(List<Book> books, String bookId, Book updatedBook) {
        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getBookId().equals(bookId)) {
                books.set(i, updatedBook);
                System.out.println("Book updated by admin: " + getName());
                break;
            }
        }
    }

    @Override
    public void deleteBook(List<Book> books, String bookId) {
        books.removeIf(book -> book.getBookId().equals(bookId));
        System.out.println("Book deleted by admin: " + getName());
    }

    @Override
    public List<Book> getAllBooks(List<Book> books) {
        return new ArrayList<>(books);
    }

    // Implementation of Searchable interface - Polymorphism
    @Override
    public List<Book> search(List<Book> items, String keyword) {
        List<Book> results = new ArrayList<>();
        for (Book book : items) {
            if (book.getTitle().toLowerCase().contains(keyword.toLowerCase()) ||
                book.getAuthor().toLowerCase().contains(keyword.toLowerCase())) {
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
            } else if (filterBy.equalsIgnoreCase("genre") &&
                       book.getGenre().toLowerCase().contains(keyword.toLowerCase())) {
                results.add(book);
            }
        }
        return results;
    }
}
