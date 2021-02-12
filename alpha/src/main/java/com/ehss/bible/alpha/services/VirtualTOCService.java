package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.toc.Book;
import com.ehss.bible.alpha.pojo.toc.PageUrl;
import com.ehss.bible.alpha.pojo.toc.Section;
import com.ehss.bible.alpha.pojo.toc.VirtualTOC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class VirtualTOCService {
    TOCAdapterService tocAdapterService;
    EpubTOCService epubTOCService;

    @Autowired
    public VirtualTOCService(TOCAdapterService tocAdapterService, EpubTOCService epubTOCService){
        this.tocAdapterService = tocAdapterService;
        this.epubTOCService = epubTOCService;
    }

    @Cacheable("VirtualTOC")
    public VirtualTOC constructVirtualTOC(String versionId) throws Exception{
        return tocAdapterService.toVirtualTOC(epubTOCService.getToc(versionId));
    }


    @Cacheable(cacheNames = "PageUrl")
    public PageUrl getPageUrlByBookAndChapter(String versionId, String bookId, String chapterId) throws Exception{
        VirtualTOC virtualTOC = this.constructVirtualTOC(versionId);
        for(Book book:virtualTOC.getBookList()){
            if (book.getId().equalsIgnoreCase(bookId)){
                for (Section section:book.getSectionList()){
                    if(section.getId().equalsIgnoreCase(chapterId)){
                        String key=versionId+bookId+chapterId;
                        return new PageUrl(key,versionId,bookId,chapterId,section.getUrl());
                    }

                }

            }
        }
        return null;
    }
}
