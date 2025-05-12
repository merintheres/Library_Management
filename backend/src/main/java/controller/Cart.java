package model;

import java.util.*;

import model.Book;
import model.Transaction;

public class Cart {
    private String userId;
    private List<Book> books;

    public Cart(String userId) {
        this.userId = userId;
        this.books = new ArrayList<>();
    }

    public void addBook(Book book) {
        if (book.isAvailable()) {
            books.add(book);
        }
    }

    // Method overloading - Polymorphism
    public void addBook(Book book, int quantity) {
        if (book.isAvailable()) {
            for (int i = 0; i < quantity; i++) {
                books.add(new Book(book)); // Using copy constructor
            }
        }
    }

    public void removeBook(String bookId) {
        books.removeIf(book -> book.getBookId().equals(bookId));
    }

    // Method overloading - Polymorphism
    public void removeBook(Book book) {
        books.remove(book);
    }

    public List<Transaction> checkout(List<Transaction> transactions) {
        List<Transaction> newTransactions = new ArrayList<>();
        for (Book book : books) {
            book.setAvailable(false);
            Transaction t = new Transaction(UUID.randomUUID().toString(), userId, book.getBookId(), new Date());
            newTransactions.add(t);
            transactions.add(t);
        }
        books.clear();
        return newTransactions;
    }

    public List<Book> getBooks() {
        return books;
    }

    public int getBookCount() {
        return books.size();
    }

    public boolean isEmpty() {
        return books.isEmpty();
    }

    public void clear() {
        books.clear();
    }
}
