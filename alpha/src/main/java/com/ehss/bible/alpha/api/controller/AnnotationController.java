package com.ehss.bible.alpha.api.controller;

import com.ehss.bible.alpha.pojo.model.Annotation;
import com.ehss.bible.alpha.services.AnnotationService;
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
@RequestMapping("/api/annotation")
@Slf4j
public class AnnotationController {

    @Autowired
    AnnotationService annotationService;

    @PostMapping(path="/user/{userId}",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Annotation> create(@PathVariable String userId, @Valid @RequestBody Annotation annotation) throws Exception{
        return new ResponseEntity(annotationService.createAnnotation(annotation),HttpStatus.CREATED);
    }

    @DeleteMapping(path="/user/{userId}/{annotationId}",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Void> delete(@PathVariable String userId,@PathVariable String annotationId) throws Exception{
        annotationService.deleteAnnotation(annotationId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(path="/user/{userId}",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<Annotation>> get(@PathVariable String userId) throws Exception{

        return new ResponseEntity(annotationService.getAnnotations(), HttpStatus.OK);
    }

    @GetMapping(path="/user/{userId}/book/{bookId}",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<Annotation>> getAnnotations(@PathVariable String userId,@PathVariable String bookId) throws Exception{

        return new ResponseEntity(annotationService.getAnnotationsByBookId(bookId), HttpStatus.OK);
    }

    @GetMapping(path="/user/{userId}/book/{bookId}/chapter/{chapterId}",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<Annotation>> getAnnotations(@PathVariable String userId,@PathVariable String bookId,@PathVariable String chapterId) throws Exception{
        return new ResponseEntity(annotationService.getAnnotations(bookId, chapterId), HttpStatus.OK);
    }

    @GetMapping(path="/user/{userId}/page/{pageUrl}",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<Annotation>> getAnnotationsByUrl(@PathVariable String userId,@PathVariable String pageUrl) throws Exception{
        return new ResponseEntity(annotationService.getAnnotationsByPageUrl(pageUrl), HttpStatus.OK);
    }
}
