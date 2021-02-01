package com.ehss.bible.alpha.api.controller;


import com.ehss.bible.alpha.services.IngestionService;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.WebAsyncTask;

import java.util.HashMap;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/ingestion")
@Slf4j
public class IngestionController {

    IngestionService ingestionService;


    @Autowired
    public IngestionController(IngestionService ingestionService){
        this.ingestionService = ingestionService;

    }

    @PostMapping("/version/{versionId}")
    public ResponseEntity<String> startIngestion(@PathVariable String versionId) throws Exception{
        log.info("starting ingestion submission...");

        String responseString = "";
        String status = null;

        status = ingestionService.getIngestionStatus(versionId);

        if (status==null || "done".equalsIgnoreCase(status)){
            UUID uuid = UUID.randomUUID();

            responseString = "ingestion request submitted..."+uuid.toString();
            log.info("Waiting for task "+uuid.toString());
            ingestionService.startIngestion(versionId,uuid);
            log.info(responseString);
        }else{
            responseString = "ingestion in progress with request id "+status+", please wait.";
            log.info(responseString);
        }
        log.info("returning from request...");
        return  new ResponseEntity(responseString, HttpStatus.OK);
    }
}
