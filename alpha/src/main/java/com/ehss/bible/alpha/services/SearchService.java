package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.repository.ElasticsearchRepo;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.directory.SearchResult;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
public class SearchService {

    ElasticsearchRepo elasticsearchRepo;

    public static final String SINGLEVERSE_REGEX="(\\w+) (\\d{1,2}):(\\d{1,2})";

    @Autowired
    public SearchService(ElasticsearchRepo elasticsearchRepo){

        this.elasticsearchRepo = elasticsearchRepo;
    }

    public SearchResponse searchVerseByPage(String versionId,String pageUrl){
        return this.elasticsearchRepo.searchVerseByPage(versionId,pageUrl);
    }

    public SearchResponse searchVerseByMatch(String version,String text){
        Pattern pattern = Pattern.compile(SINGLEVERSE_REGEX);
        Matcher matcher = pattern.matcher(text);
        int count = matcher.groupCount();
        if (matcher.find() && count>=3){
            String book = matcher.group(1);
            String chapter = matcher.group(2);
            String verse = matcher.group(3);
            log.info("Performing query based on bible citation format: "+book+" "+chapter+":"+verse);
            return this.elasticsearchRepo.searchVerseByBookChapterVerse(version,book,chapter,verse);
        }else {
            return this.elasticsearchRepo.searchVerseByMatch(version,text);
        }
    }
}
