package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.api.controller.IngestionController;
import com.ehss.bible.alpha.config.ESClient;
import com.ehss.bible.alpha.pojo.elasticsearch.BibleVerse;
import com.ehss.bible.alpha.pojo.toc.Book;
import com.ehss.bible.alpha.pojo.toc.Section;
import com.ehss.bible.alpha.pojo.toc.VirtualTOC;
import com.ehss.bible.alpha.repository.ElasticsearchRepo;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.common.xcontent.XContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class IngestionService {

    HashMap<String,String> requestMap;

    ElasticsearchRepo elasticsearchRepo;
    VirtualTOCService virtualTOCService;
    TOCAdapterService tocAdapterService;

    @Autowired
    public IngestionService(ElasticsearchRepo elasticsearchRepo, VirtualTOCService virtualTOCService,TOCAdapterService tocAdapterService){
        requestMap = new HashMap<>();
        this.elasticsearchRepo = elasticsearchRepo;
        this.virtualTOCService = virtualTOCService;
        this.tocAdapterService = tocAdapterService;
    }

    public String getIngestionStatus(String versionId){
        return requestMap.get(versionId);
    }

    @Async("threadPoolTaskExecutor")
    public void startIngestion(String versionId,UUID uuid){
        log.info("inside ingestion service");
        requestMap.put(versionId,uuid.toString());
        try {
            VirtualTOC vtoc = this.virtualTOCService.constructVirtualTOC(versionId);
            List<Book> bookList = vtoc.getBookList();

            for(Book book:bookList){
                for (Section section:book.getSectionList()){
                    List<BibleVerse> bibleVerseList= this.tocAdapterService.toBibleVerseList(versionId,book.getTitle(),book.getId(),section);
                    elasticsearchRepo.indexData(bibleVerseList,"bibleverse");
                }
            }

        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        requestMap.put(versionId,"done");
        log.info("done with ingestion");
    }


}
