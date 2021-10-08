package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.model.User;
import com.ehss.bible.alpha.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    UserRepo userRepo;

    public String getUserIdFromSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Optional<User> dbuser = userRepo.findByEmail(currentPrincipalName);
        if (dbuser.isPresent()) {
            User user = dbuser.get();
            return user.getId();
        } else {
            return null;
        }
    }

}
