package com.ehss.bible.alpha.api.controller;

import com.ehss.bible.alpha.pojo.model.User;
import com.ehss.bible.alpha.security.JwtUtils;
import com.ehss.bible.alpha.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

//    @Autowired
//    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User signUpRequest){
        if (userService.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Username is already taken!");
        }
        userService.createUser(signUpRequest);

        return ResponseEntity.ok().body("User successfully created...");
    }
}
