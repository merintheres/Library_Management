package controller;

import model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.LibraryService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private LibraryService libraryService;

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest loginRequest) {
        Object user = libraryService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        
        if (user instanceof Admin) {
            Admin admin = (Admin) user;
            Map<String, Object> response = new HashMap<>();
            response.put("id", admin.getId());
            response.put("name", admin.getName());
            response.put("email", admin.getEmail());
            response.put("isAdmin", true);
            
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginRequest loginRequest) {
        Object user = libraryService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        
        if (user instanceof User) {
            User userObj = (User) user;
            Map<String, Object> response = new HashMap<>();
            response.put("id", userObj.getId());
            response.put("name", userObj.getName());
            response.put("email", userObj.getEmail());
            response.put("rollNo", userObj.getRollNo());
            response.put("isAdmin", false);
            
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        // Generate a new user ID
        String userId = "U" + (libraryService.getUsers().size() + 1);
        
        User newUser = new User(
            userId,
            registerRequest.getName(),
            registerRequest.getEmail(),
            registerRequest.getRollNo(),
            registerRequest.getPassword()
        );
        
        libraryService.registerUser(newUser);
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", newUser.getId());
        response.put("name", newUser.getName());
        response.put("email", newUser.getEmail());
        response.put("rollNo", newUser.getRollNo());
        response.put("isAdmin", false);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Request models
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class RegisterRequest {
        private String name;
        private String email;
        private String rollNo;
        private String password;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getRollNo() {
            return rollNo;
        }

        public void setRollNo(String rollNo) {
            this.rollNo = rollNo;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
