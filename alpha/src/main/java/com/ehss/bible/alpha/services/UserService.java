package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.model.User;
import com.ehss.bible.alpha.repository.UserRepo;
import com.ehss.bible.alpha.services.exceptions.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> dbuser = userRepo.findByEmail(username);
        if (dbuser.isPresent()) {
            org.springframework.security.core.userdetails.User user = new org.springframework.security.core.userdetails.User(dbuser.get().getEmail(), dbuser.get().getPassword(), new ArrayList<>());

            return user;
        } else {
            throw new UsernameNotFoundException("User not found");
        }

    }

    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }


    public Boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    @Transactional
    public User createUser(User user) throws UserAlreadyExistsException {
        if (existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException();
        }
        Date markedDate = new Date();
        user.setCreatedDate(markedDate);
        user.setId(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return user;
    }

    @Transactional
    public void deleteUser(User user){
        userRepo.delete(user);
    }
}
