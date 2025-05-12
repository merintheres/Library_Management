package controller;

import model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.LibraryService;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private LibraryService libraryService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Book>> getCart(@PathVariable String userId) {
        User user = libraryService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(user.getCart().getBooks());
    }

    @PostMapping("/{userId}/add/{bookId}")
    public ResponseEntity<?> addToCart(
            @PathVariable String userId,
            @PathVariable String bookId) {
        
        User user = libraryService.getUserById(userId);
        Book book = libraryService.getBookById(bookId);
        
        if (user == null || book == null) {
            return ResponseEntity.notFound().build();
        }
        
        if (!book.isAvailable()) {
            return ResponseEntity.badRequest().body("Book is not available");
        }
        
        user.getCart().addBook(book);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/remove/{bookId}")
    public ResponseEntity<?> removeFromCart(
            @PathVariable String userId,
            @PathVariable String bookId) {
        
        User user = libraryService.getUserById(userId);
        
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        
        user.getCart().removeBook(bookId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{userId}/checkout")
    public ResponseEntity<List<Transaction>> checkout(@PathVariable String userId) {
        User user = libraryService.getUserById(userId);
        
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        
        if (user.getCart().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        List<Transaction> transactions = user.getCart().checkout(libraryService.getTransactions());
        return ResponseEntity.ok(transactions);
    }
}
