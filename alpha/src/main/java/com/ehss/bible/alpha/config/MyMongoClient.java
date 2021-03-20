package com.ehss.bible.alpha.config;

import com.mongodb.*;

import com.mongodb.client.MongoClients;
import com.mongodb.connection.ConnectionPoolSettings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyMongoClient {

    @Value("${mongo.port:27017}")
    private String port;

    @Value("${mongo.host}")
    private String host;

    @Value("${mongo.dbName}")
    private String dbName;



    public @Bean
    MongoClient mongoClient() {
        String connectStr = "mongodb://"+host+":"+port+"/"+dbName;

        MongoClientOptions.Builder builder = MongoClientOptions.builder()
                            .minConnectionsPerHost(10).connectionsPerHost(50);

        MongoClientURI mongoUri = new MongoClientURI(connectStr, builder);
        MongoClient mongo = new MongoClient(mongoUri);
        return mongo;

    }
}
