package controller;

import model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.LibraryService;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private LibraryService libraryService;

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        // This would typically be admin-only
        return ResponseEntity.ok(libraryService.getTransactions());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Transaction>> getUserTransactions(@PathVariable String userId) {
        List<Transaction> userTransactions = libraryService.getTransactions().stream()
                .filter(t -> t.getUserId().equals(userId))
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(userTransactions);
    }

    @PostMapping("/{transactionId}/return")
    public ResponseEntity<Transaction> returnBook(@PathVariable String transactionId) {
        Transaction transaction = libraryService.getTransactionById(transactionId);
        
        if (transaction == null) {
            return ResponseEntity.notFound().build();
        }
        
        if ("Returned".equals(transaction.getStatus())) {
            return ResponseEntity.badRequest().build();
        }
        
        // Mark the transaction as returned
        transaction.markReturned();
        
        // Make the book available again
        Book book = libraryService.getBookById(transaction.getBookId());
        if (book != null) {
            book.setAvailable(true);
        }
        
        return ResponseEntity.ok(transaction);
    }
}
