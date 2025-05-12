package model;

import java.util.Date;

// Final class - cannot be extended
public final class Transaction {
    private final String transactionId; // Final field - immutability
    private final String userId;
    private final String bookId;
    private final Date issueDate;
    private Date returnDate;
    private String status;

    public Transaction(String transactionId, String userId, String bookId, Date issueDate) {
        this.transactionId = transactionId;
        this.userId = userId;
        this.bookId = bookId;
        this.issueDate = new Date(issueDate.getTime()); // Defensive copy
        this.status = "Issued";
    }

    public void markReturned() {
        this.returnDate = new Date();
        this.status = "Returned";
    }

    // Method overloading - Polymorphism
    public void markReturned(Date returnDate) {
        this.returnDate = new Date(returnDate.getTime()); // Defensive copy
        this.status = "Returned";
    }

    // Final method - cannot be overridden
    public final String getTransactionId() {
        return transactionId;
    }

    public String getUserId() {
        return userId;
    }

    public String getBookId() {
        return bookId;
    }

    public Date getIssueDate() {
        return new Date(issueDate.getTime()); // Defensive copy
    }

    public Date getReturnDate() {
        return returnDate != null ? new Date(returnDate.getTime()) : null; // Defensive copy
    }

    public String getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "transactionId='" + transactionId + '\'' +
                ", bookId='" + bookId + '\'' +
                ", status='" + status + '\'' +
                ", issued=" + issueDate +
                ", returned=" + returnDate +
                '}';
    }
}
