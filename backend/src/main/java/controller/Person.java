package model;

// Abstract class - Abstraction concept
public abstract class Person {
    // Encapsulation - private fields
    private String id;
    private String name;
    private String email;
    private String password;

    // Constructor
    public Person(String id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Abstract method - to be implemented by subclasses
    public abstract boolean hasAdminRights();

    // Method to be overridden by subclasses - Polymorphism
    public boolean authenticate(String email, String password) {
        return this.email.equals(email) && this.password.equals(password);
    }

    // Getters and Setters - Encapsulation
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    protected String getPassword() {
        return password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    protected void setPassword(String password) {
        this.password = password;
    }
}
