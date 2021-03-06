package com.ehss.bible.alpha.api.controller;


import com.ehss.bible.alpha.pojo.RootTOC;
import com.ehss.bible.alpha.pojo.epub.ChapterHtml;
import com.ehss.bible.alpha.pojo.epub.PageHtml;
import com.ehss.bible.alpha.pojo.toc.PageUrl;
import com.ehss.bible.alpha.services.EpubTOCService;
import com.ehss.bible.alpha.services.VirtualTOCService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/toc")
@Slf4j
public class TocController {

    EpubTOCService epubTocService;
    VirtualTOCService virtualTOCService;

    @Autowired
    public TocController(EpubTOCService epubTocService, VirtualTOCService virtualTOCService){
        this.virtualTOCService = virtualTOCService;
        this.epubTocService = epubTocService;
    }

    @GetMapping(path="pageurl/version/{versionId}/book/{bookId}/chapter/{chapterId}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<PageUrl> getPageUrl(@PathVariable String versionId,@PathVariable String bookId, @PathVariable String chapterId) throws Exception{
        return new ResponseEntity(virtualTOCService.getPageUrlByBookAndChapter(versionId,bookId,chapterId),HttpStatus.OK);
    }

    @GetMapping(path="/virtual/version/{versionId}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<RootTOC> getVitrualToc(@PathVariable String versionId) throws Exception{
        return new ResponseEntity(virtualTOCService.constructVirtualTOC(versionId), HttpStatus.OK);
    }

    @GetMapping(path="/epub/version/{versionId}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<RootTOC> getEpubToc(@PathVariable String versionId) throws Exception{
        return new ResponseEntity(epubTocService.getToc(versionId), HttpStatus.OK);
    }

    @GetMapping(path = "/epub/chapter/{chapterName}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<ChapterHtml> getEpubChapterToc(@PathVariable String chapterName) throws Exception{
        return new ResponseEntity(epubTocService.getChapterToc(chapterName), HttpStatus.OK);
    }


    @GetMapping(path = "/epub/page/{pageUrl}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<PageHtml> getPageHtml(@PathVariable String pageUrl) throws Exception{
        return new ResponseEntity(epubTocService.getPage(pageUrl), HttpStatus.OK);
    }

}

