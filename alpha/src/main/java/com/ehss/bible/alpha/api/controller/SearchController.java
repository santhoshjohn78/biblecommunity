package com.ehss.bible.alpha.api.controller;

import com.ehss.bible.alpha.pojo.RootTOC;
import com.ehss.bible.alpha.pojo.elasticsearch.BibleMedia;
import com.ehss.bible.alpha.services.MediaService;
import com.ehss.bible.alpha.services.SearchService;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/bible")
@Slf4j
public class SearchController {

    @Autowired
    SearchService searchService;

    @Autowired
    MediaService mediaService;

    @GetMapping(path="/version/{versionId}/search/page/{pageUrl}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<SearchResponse> getVersesForPage(@PathVariable String versionId,
                                                           @PathVariable String pageUrl) throws Exception{
        return new ResponseEntity( searchService.searchVerseByPage(versionId,pageUrl), HttpStatus.OK);
    }

    @GetMapping(path="/version/{versionId}/search/v1",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<SearchResponse> getVersesByMatches(
            @PathVariable String versionId,@RequestParam(name = "q",required = true) String query){
        return new ResponseEntity( searchService.searchVerseByMatch(versionId,query), HttpStatus.OK);
    }

    @GetMapping(path="/search/media/{bookId}/{chapterName}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<BibleMedia>> getMediaByBookIdAndChapterNumber(@PathVariable String bookId,
                                                                             @PathVariable String chapterName){
        return new ResponseEntity(mediaService.searchMediaByBookIdAndChapter(bookId,chapterName),HttpStatus.OK);
    }
}
