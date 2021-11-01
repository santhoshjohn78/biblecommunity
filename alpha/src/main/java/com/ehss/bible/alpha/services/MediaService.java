package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.elasticsearch.BibleMedia;
import com.ehss.bible.alpha.pojo.model.Annotation;
import com.ehss.bible.alpha.repository.ElasticsearchRepo;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.SearchHit;
import org.springframework.beans.factory.annotation.Autowired;
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
                        .dislike(0L).likeCount(0L).viewCount(0L)
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
            BibleMedia bibleMedia = BibleMedia.builder().id(searchHit.getId()).key(searchMap.get("key").toString()).verseText(searchMap.get("verseText").toString())
                    .bookId(searchMap.get("bookId").toString()).bookName(searchMap.get("bookName").toString()).mediaUrl(searchMap.get("mediaUrl").toString())
                    .chapterName(searchMap.get("chapterName").toString()).chapterNumber(Integer.parseInt(searchMap.get("chapterNumber").toString()))
                    .likeCount(Long.parseLong(searchMap.get("likeCount").toString())).dislike(Long.parseLong(searchMap.get("dislike").toString()))
                    .viewCount(Long.parseLong(searchMap.get("viewCount").toString()))
                    .verseNumber(Integer.parseInt(searchMap.get("verseNumber").toString()))
                    //.tags(searchMap.get("tags").toString())
                    .build();
            bibleMediaList.add(bibleMedia);
        }
        return bibleMediaList;
    }

    public void likeMedia(String id,String key,String userId){
       elasticsearchRepo.updateLikeCount(id);
    }

    public void disLikeMedia(String id,String key,String userId){
        elasticsearchRepo.updateDislikeCount(id);
    }
    public void updateViewMediaCount(String id,String key,String userId){
        elasticsearchRepo.updateViewCount(id);
    }

}
