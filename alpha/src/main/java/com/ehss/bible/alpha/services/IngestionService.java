package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.api.controller.IngestionController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;

@Service
@Slf4j
public class IngestionService {

    HashMap<String,String> requestMap;

    public IngestionService(){
        requestMap = new HashMap<>();
    }

    public String getIngestionStatus(String versionId){
        return requestMap.get(versionId);
    }

    @Async("threadPoolTaskExecutor")
    public void startIngestion(String versionId,UUID uuid){
        log.info("inside ingestion service");
        requestMap.put(versionId,uuid.toString());
        try {
            Thread.sleep(8000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        requestMap.put(versionId,"done");
        log.info("done with ingestion");
    }
}
