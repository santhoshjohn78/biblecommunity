package com.ehss.bible.alpha.api.controller;

import com.ehss.bible.alpha.pojo.model.Bookmark;
import com.ehss.bible.alpha.services.BookmarkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/bookmark")
@Slf4j
public class BookmarkController {

    @Autowired
    BookmarkService bookmarkService;

    @PostMapping(path = "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Bookmark> createBookmark(@PathVariable String userId, @Valid @RequestBody Bookmark bookmark) throws Exception {
        return new ResponseEntity(bookmarkService.createBookmark(bookmark), HttpStatus.CREATED);
    }

    @PostMapping(path = "/user/{userId}/pagevisit", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Bookmark> createLastVisitedPage(@PathVariable String userId, @Valid @RequestBody Bookmark bookmark) throws Exception {
        return new ResponseEntity(bookmarkService.createLastVisitedPage(bookmark), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/user/{userId}/{bookmarkId}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Void> deleteBookmark(@PathVariable String userId, @PathVariable String bookmarkId) throws Exception {
        bookmarkService.deleteBookmark(bookmarkId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(path = "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<Bookmark>> getBookmark(@PathVariable String userId) throws Exception {

        return new ResponseEntity(bookmarkService.getBookmarks(), HttpStatus.OK);
    }

    @GetMapping(path = "/user/{userId}/pagevisit", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<Bookmark>> getLastVisitedPage(@PathVariable String userId) throws Exception {

        return new ResponseEntity(bookmarkService.getLastVisitedPage(), HttpStatus.OK);
    }

    @GetMapping(path = "/user/{userId}/book/{bookId}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<Bookmark>> getBookmark(@PathVariable String userId, @PathVariable String bookId) throws Exception {

        return new ResponseEntity(bookmarkService.getBookmarks(bookId), HttpStatus.OK);
    }

    @GetMapping(path = "/user/{userId}/book/{bookId}/chapter/{chapterId}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Bookmark> getBookmark(@PathVariable String userId, @PathVariable String bookId, @PathVariable String chapterId) throws Exception {
        return new ResponseEntity(bookmarkService.getBookmark(bookId, chapterId), HttpStatus.OK);
    }

    @GetMapping(path="/user/{userId}/page/{pageUrl}",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Bookmark> getBookmarkByUrl(@PathVariable String userId,@PathVariable String pageUrl) throws Exception{
        Bookmark bookmark = bookmarkService.getBookmark(pageUrl);
        if (bookmark!=null)
            return new ResponseEntity(bookmark,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
