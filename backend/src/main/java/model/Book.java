package model;

// Encapsulation - private fields with public getters/setters
public class Book {
    private String bookId;
    private String title;
    private String author;
    private String genre;
    private int publicationYear;
    private boolean isAvailable;

    public Book(String bookId, String title, String author, String genre, int publicationYear) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.publicationYear = publicationYear;
        this.isAvailable = true;
    }

    // Copy constructor - demonstrates another form of constructor overloading
    public Book(Book other) {
        this.bookId = other.bookId;
        this.title = other.title;
        this.author = other.author;
        this.genre = other.genre;
        this.publicationYear = other.publicationYear;
        this.isAvailable = other.isAvailable;
    }

    // Getters and Setters - Encapsulation
    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public String getBookId() {
        return bookId;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getGenre() {
        return genre;
    }

    public int getPublicationYear() {
        return publicationYear;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setPublicationYear(int publicationYear) {
        this.publicationYear = publicationYear;
    }

    @Override
    public String toString() {
        return bookId + " - " + title + " by " + author + " (" + (isAvailable ? "Available" : "Unavailable") + ")";
    }

    // Method overloading - Polymorphism
    public String getDetails() {
        return title + " by " + author + " (" + publicationYear + ")";
    }

    public String getDetails(boolean includeAvailability) {
        String details = getDetails();
        if (includeAvailability) {
            details += " - " + (isAvailable ? "Available" : "Unavailable");
        }
        return details;
    }
}
