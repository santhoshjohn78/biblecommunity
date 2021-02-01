package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.RootTOC;
import com.ehss.bible.alpha.pojo.epub.Anchor;
import com.ehss.bible.alpha.pojo.epub.ChapterHtml;
import com.ehss.bible.alpha.pojo.epub.NavPoint;
import com.ehss.bible.alpha.pojo.toc.Book;
import com.ehss.bible.alpha.pojo.toc.Section;
import com.ehss.bible.alpha.pojo.toc.VirtualTOC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TOCAdapterService {

    EpubTOCService epubTOCService;

    @Autowired
    public TOCAdapterService(EpubTOCService epubTOCService){
        this.epubTOCService = epubTOCService;
    }

    public VirtualTOC toVirtualTOC(RootTOC rootTOC) throws Exception{
        VirtualTOC vtoc = new VirtualTOC();
        List<Book> bookList = new ArrayList<>();

        for(NavPoint navPoint:rootTOC.getNcx().getNavPoint()){
            Book book = new Book();
            book.setId(navPoint.getId());
            book.setPlayOrder(Integer.parseInt(navPoint.getPlayOrder()));
            book.setTitle(navPoint.getNavLabel().getText());
            book.setUrl(navPoint.getContent().getSrc());

            ChapterHtml chapterHtml = epubTOCService.getChapterToc(book.getUrl());
            List<Section> sectionList = new ArrayList<>();
            for(Anchor anchor:chapterHtml.getBody().getPages()){
                Section section = new Section();
                section.setId(anchor.getValue());
                section.setUrl(anchor.getHref());
                section.setTitle(anchor.getValue());
                sectionList.add(section);

            }
            book.setSectionList(sectionList);

            bookList.add(book);
        }

        vtoc.setBookList(bookList);

        return vtoc;
    }

}
