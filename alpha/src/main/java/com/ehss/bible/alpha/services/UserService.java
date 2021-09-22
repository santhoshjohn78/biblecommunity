package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.model.User;
import com.ehss.bible.alpha.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public Optional<User> findByEmail(String email){
        return userRepo.findByEmail(email);
    }


    public Boolean existsByEmail(String email){
        return userRepo.existsByEmail(email);
    }

    @Transactional
    public User createUser(User user){
        Date markedDate = new Date();
        user.setCreatedDate(markedDate);
        user.setId(UUID.randomUUID().toString());
        userRepo.save(user);
        return user;
    }

    @Transactional
    public void deleteUser(User user){
        userRepo.delete(user);
    }
}
