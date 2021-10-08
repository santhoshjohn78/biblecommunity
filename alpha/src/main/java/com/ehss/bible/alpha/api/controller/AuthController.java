package com.ehss.bible.alpha.api.controller;

import com.ehss.bible.alpha.pojo.model.SignupResponse;
import com.ehss.bible.alpha.pojo.model.User;
import com.ehss.bible.alpha.pojo.model.jwt.AuthRequest;
import com.ehss.bible.alpha.pojo.model.jwt.AuthResponse;
import com.ehss.bible.alpha.security.JwtUtils;
import com.ehss.bible.alpha.services.UserService;
import com.ehss.bible.alpha.services.exceptions.UserAlreadyExistsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;


    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> registerUser(@Valid @RequestBody User signUpRequest) {

        try {
            userService.createUser(signUpRequest);
        } catch (UserAlreadyExistsException uae) {
            return ResponseEntity.badRequest().body(new SignupResponse("Username is already taken!"));
        }
        return ResponseEntity.ok().body(new SignupResponse("User successfully created..."));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> createAuthToken(@Valid @RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));
        } catch (BadCredentialsException badCredentialsException) {
            throw new Exception("Bad credentials", badCredentialsException);
        }
        UserDetails userDetails = userService.loadUserByUsername(authRequest.getUserName());
        String jwtString = jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(jwtString));
    }
}
