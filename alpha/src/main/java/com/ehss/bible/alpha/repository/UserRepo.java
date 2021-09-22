package com.ehss.bible.alpha.repository;


import com.ehss.bible.alpha.pojo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<User,String> {

    Optional<User> findByEmail(String email);


    Boolean existsByEmail(String email);
}
