package com.ehss.bible.alpha.api.controller;


import com.ehss.bible.alpha.pojo.RootTOC;
import com.ehss.bible.alpha.pojo.epub.ChapterHtml;
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


    @GetMapping(path="/virtual",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<RootTOC> getVitrualToc() throws Exception{
        return new ResponseEntity(virtualTOCService.constructVirtualTOC(), HttpStatus.OK);
    }

    @GetMapping(path="/epub",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<RootTOC> getEpubToc() throws Exception{
        return new ResponseEntity(epubTocService.getToc(), HttpStatus.OK);
    }

    @GetMapping(path = "/epub/chapter/{chapterName}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<ChapterHtml> getEpubChapterToc(@PathVariable String chapterName) throws Exception{
        return new ResponseEntity(epubTocService.getChapterToc(chapterName), HttpStatus.OK);
    }

}

