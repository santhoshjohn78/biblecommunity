package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.RootTOC;
import com.ehss.bible.alpha.pojo.elasticsearch.BibleVerse;
import com.ehss.bible.alpha.pojo.epub.*;
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

    public VirtualTOC toVirtualTOC(String version,RootTOC rootTOC) throws Exception{
        VirtualTOC vtoc = new VirtualTOC();
        List<Book> bookList = new ArrayList<>();

        for(NavPoint navPoint:rootTOC.getNcx().getNavPoint()){
            Book book = new Book();
            book.setId(navPoint.getId());
            book.setPlayOrder(Integer.parseInt(navPoint.getPlayOrder()));
            book.setTitle(navPoint.getNavLabel().getText());
            book.setUrl(navPoint.getContent().getSrc());

            ChapterHtml chapterHtml = epubTOCService.getChapterToc(version,book.getUrl());
            List<Section> sectionList = new ArrayList<>();
            for(Anchor anchor:chapterHtml.getBody().getPages()){
                Section section = new Section();
                section.setId(anchor.getValue());
                section.setUrl(anchor.getHref());
                section.setTitle(anchor.getValue());
                section.setSectionTotal(chapterHtml.getBody().getPages().size());
                sectionList.add(section);

            }
            book.setSectionList(sectionList);

            bookList.add(book);
        }

        vtoc.setBookList(bookList);

        return vtoc;
    }

    /**
     *
     * @param section
     * @return
     */

    public List<BibleVerse> toBibleVerseList(String version,String bookName,String bookId,Section section) throws Exception {
        List<BibleVerse> bibleVerseList = new ArrayList<>();

        String pageurl = section.getUrl();
        PageHtml pageHtml = this.epubTOCService.getPage(version,pageurl);
        for (Paragraph paragraph:pageHtml.getBody().getParagraphs()) {
            for (Span span:paragraph.getSpans()){
                BibleVerse bibleVerse = new BibleVerse();
                bibleVerse.setPageUrl(pageurl);
                bibleVerse.setBookName(bookName);
                bibleVerse.setBookId(bookId);
                bibleVerse.setChapterName(section.getTitle());
                bibleVerse.setChapterNumber(Integer.parseInt(section.getId()));
                bibleVerse.setBibleVersionId(version);
                bibleVerse.setBibleVersionName(version);
                String key = bookName+"_"+section.getTitle()+"_"+span.getValue();
                bibleVerse.setKey(key);
                bibleVerse.setAnchorId(span.getId());
                bibleVerse.setVerseNumber(Integer.parseInt(span.getValue()));
                bibleVerse.setVerseText(span.getVerseText());
                bibleVerseList.add(bibleVerse);

            }
        }

        return bibleVerseList;
    }



}
