package model;

import java.util.List;

import model.Book;

// Interface - Abstraction concept
public interface BookManagement {
    void addBook(List<Book> books, Book book);
    void updateBook(List<Book> books, String bookId, Book updatedBook);
    void deleteBook(List<Book> books, String bookId);
    List<Book> getAllBooks(List<Book> books);
}
