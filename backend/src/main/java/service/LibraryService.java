package service;

import model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LibraryService {
    private List<User> users;
    private List<Admin> admins;
    private List<Book> books;
    private List<Transaction> transactions;

    public LibraryService() {
        // Initialize with some sample data
        users = new ArrayList<>();
        admins = new ArrayList<>();
        books = new ArrayList<>();
        transactions = new ArrayList<>();
        
        // Add a default admin
        Admin admin = new Admin("A001", "Librarian", "admin@lib.com", "admin123");
        admins.add(admin);
        
        // Add some sample books
        Book b1 = new Book("B101", "Harry Potter", "JK Rowling", "Fantasy", 1997);
        Book b2 = new Book("B102", "The Hobbit", "J.R.R. Tolkien", "Fantasy", 1937);
        Book b3 = new Book("B103", "To Kill a Mockingbird", "Harper Lee", "Fiction", 1960);
        Book b4 = new Book("B104", "1984", "George Orwell", "Dystopian", 1949);
        
        books.add(b1);
        books.add(b2);
        books.add(b3);
        books.add(b4);
    }

    // Authentication
    public Object authenticate(String email, String password) {
        for (User user : users) {
            if (user.login(email, password)) return user;
        }
        for (Admin admin : admins) {
            if (admin.login(email, password)) return admin;
        }
        return null;
    }

    // User management
    public void registerUser(User user) {
        users.add(user);
    }

    public User getUserById(String userId) {
        return users.stream()
                .filter(u -> u.getId().equals(userId))
                .findFirst()
                .orElse(null);
    }

    // Book management
    public List<Book> getAllBooks() {
        return new ArrayList<>(books);
    }

    public Book getBookById(String bookId) {
        return books.stream()
                .filter(b -> b.getBookId().equals(bookId))
                .findFirst()
                .orElse(null);
    }

    public void addBook(Book book) {
        books.add(book);
    }

    public void updateBook(String bookId, Book updatedBook) {
        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getBookId().equals(bookId)) {
                books.set(i, updatedBook);
                break;
            }
        }
    }

    public void deleteBook(String bookId) {
        books.removeIf(book -> book.getBookId().equals(bookId));
    }

    // Search functionality
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

    // Transaction management
    public List<Transaction> getTransactions() {
        return transactions;
    }

    public Transaction getTransactionById(String transactionId) {
        return transactions.stream()
                .filter(t -> t.getTransactionId().equals(transactionId))
                .findFirst()
                .orElse(null);
    }

    // Getters for collections
    public List<User> getUsers() {
        return users;
    }

    public List<Admin> getAdmins() {
        return admins;
    }
}
