package com.ehss.bible.alpha.api.controller;

import com.ehss.bible.alpha.pojo.elasticsearch.BibleMedia;
import com.ehss.bible.alpha.services.MediaService;
import com.ehss.bible.alpha.services.SearchService;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/media")
@Slf4j
public class MediaController {

    @Autowired
    MediaService mediaService;


    @GetMapping(path="/{bookId}/{chapterName}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<BibleMedia>> getMediaByBookIdAndChapterNumber(@PathVariable String bookId, @PathVariable String chapterName){
        return new ResponseEntity(mediaService.searchMediaByBookIdAndChapter(bookId,chapterName),HttpStatus.OK);
    }

    @PutMapping(path="/{userId}/like/{id}/{key}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Void> likeMedia(@PathVariable String userId,@PathVariable String id, @PathVariable String key){
        mediaService.likeMedia(id,key,userId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping(path="/{userId}/dislike/{id}/{key}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Void> dislikeMedia(@PathVariable String userId,@PathVariable String id, @PathVariable String key){
        mediaService.disLikeMedia(id,key,userId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping(path="/{userId}/viewcount/{id}/{key}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Void> viewCount(@PathVariable String userId,@PathVariable String id, @PathVariable String key){
        mediaService.updateViewMediaCount(id,key,userId);
        return new ResponseEntity(HttpStatus.OK);
    }

}
