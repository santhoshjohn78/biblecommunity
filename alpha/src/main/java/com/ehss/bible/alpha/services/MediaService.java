package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.elasticsearch.BibleMedia;
import com.ehss.bible.alpha.pojo.elasticsearch.BibleVerse;
import com.ehss.bible.alpha.pojo.model.Annotation;
import com.ehss.bible.alpha.pojo.toc.Book;
import com.ehss.bible.alpha.pojo.toc.Section;
import com.ehss.bible.alpha.pojo.toc.VirtualTOC;
import com.ehss.bible.alpha.repository.ElasticsearchRepo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.SearchHit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class MediaService {

    ElasticsearchRepo elasticsearchRepo;

    @Autowired
    public MediaService(ElasticsearchRepo elasticsearchRepo){
        this.elasticsearchRepo = elasticsearchRepo;
    }


    public void indexMedia(Annotation annotation){
        log.info("inside ingestion service");

        try {
            List<BibleMedia> bibleMediaList = new ArrayList<>();
            for(String mediaUrls:annotation.getMediaUrls()){

                String encodedUrl = Base64.getUrlEncoder().encodeToString(mediaUrls.getBytes());
                log.info("key="+encodedUrl+" "+encodedUrl);
                BibleMedia bibleMedia = BibleMedia.builder().bookId(annotation.getBookId()).mediaUrl(mediaUrls)
                    .bookName(annotation.getBookName()).chapterName(annotation.getChapterId()).chapterNumber(Integer.parseInt(annotation.getChapterId()))
                        .verseNumber(annotation.getVerseNumber()).verseText(annotation.getVerseText()).key(encodedUrl)
                        .tags(annotation.getTags()).build();
                bibleMediaList.add(bibleMedia);

            }
            elasticsearchRepo.indexBibleMedia(bibleMediaList,ElasticsearchRepo.BIBLEMEDIAINDEX);

        } catch (Exception e) {
            log.error("",e);
        }
        log.info("done with indexing media.");
    }

    public List<BibleMedia> searchMediaByBookIdAndChapter(String bookId,String chapterName){
        List<BibleMedia> bibleMediaList = new ArrayList<>();
        SearchResponse searchResponse =this.elasticsearchRepo.searchMediaByBookIdAndChapterNumber(bookId,chapterName);
        for(SearchHit searchHit:searchResponse.getHits().getHits()){
            Map<String,Object> searchMap =searchHit.getSourceAsMap();
            BibleMedia bibleMedia = BibleMedia.builder().key(searchMap.get("key").toString()).verseText(searchMap.get("verseText").toString())
                    .bookId(searchMap.get("bookId").toString()).bookName(searchMap.get("bookName").toString()).mediaUrl(searchMap.get("mediaUrl").toString())
                    .chapterName(searchMap.get("chapterName").toString()).chapterNumber(Integer.parseInt(searchMap.get("chapterNumber").toString()))
                    //.tags(searchMap.get("tags"))
                    .build();
            bibleMediaList.add(bibleMedia);
        }
        return bibleMediaList;
    }


}