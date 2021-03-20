package com.ehss.bible.alpha.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MongoClient {

    @Value("${mongo.port:27017}")
    private String port;

    @Value("${mongo.host}")
    private String host;

    
}
