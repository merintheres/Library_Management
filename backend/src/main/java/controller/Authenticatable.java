package model;

// Interface - Abstraction concept
public interface Authenticatable {
    boolean login(String email, String password);
    void logout();
    boolean changePassword(String oldPassword, String newPassword);
}
