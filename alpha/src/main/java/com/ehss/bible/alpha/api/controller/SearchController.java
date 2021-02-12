package com.ehss.bible.alpha.api.controller;

import com.ehss.bible.alpha.pojo.RootTOC;
import com.ehss.bible.alpha.services.SearchService;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/bible/search")
@Slf4j
public class SearchController {

    SearchService searchService;

    public SearchController(SearchService searchService){
        this.searchService = searchService;
    }

    @GetMapping(path="/page/{pageUrl}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<SearchResponse> getVersesForPage(@PathVariable String pageUrl) throws Exception{
        return new ResponseEntity( searchService.searchVerseByPage(pageUrl), HttpStatus.OK);
    }

    @GetMapping(path="/v1",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<SearchResponse> getVersesByMatches(@RequestParam(name = "q",required = true) String query){
        return new ResponseEntity( searchService.searchVerseByMatch(query), HttpStatus.OK);
    }
}
