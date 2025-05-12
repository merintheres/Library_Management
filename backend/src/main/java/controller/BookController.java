package controller;

import model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.LibraryService;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private LibraryService libraryService;

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(libraryService.getAllBooks());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(
            @RequestParam String keyword,
            @RequestParam(required = false, defaultValue = "all") String filterBy) {
        
        List<Book> results;
        if ("all".equals(filterBy)) {
            results = libraryService.searchBooks(keyword);
        } else {
            results = libraryService.searchBooks(keyword, filterBy);
        }
        
        return ResponseEntity.ok(results);
    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        // Check if request is from admin (would use authentication in real app)
        libraryService.addBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(book);
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<Book> updateBook(
            @PathVariable String bookId,
            @RequestBody Book updatedBook) {
        
        // Check if request is from admin (would use authentication in real app)
        libraryService.updateBook(bookId, updatedBook);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable String bookId) {
        // Check if request is from admin (would use authentication in real app)
        libraryService.deleteBook(bookId);
        return ResponseEntity.noContent().build();
    }
}
