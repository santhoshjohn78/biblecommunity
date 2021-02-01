package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.epub.ChapterHtml;
import com.ehss.bible.alpha.pojo.epub.Ncx;
import com.ehss.bible.alpha.pojo.RootTOC;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.stereotype.Service;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamReader;
import java.io.FileInputStream;

@Service
public class EpubTOCService {

    public RootTOC getToc() throws Exception {
        XmlMapper xmlMapper = new XmlMapper();
        XMLInputFactory xmlif = XMLInputFactory.newInstance();
        XMLStreamReader xmlStreamReader = xmlif.createXMLStreamReader(new FileInputStream(getClass().getClassLoader().getResource("static/asv/OEBPS/toc.ncx").getFile()));
        Ncx ncx = xmlMapper.readValue(xmlStreamReader, Ncx.class);

        return new RootTOC(ncx);

    }

    public ChapterHtml getChapterToc(String chapterId) throws Exception {
        XmlMapper xmlMapper = new XmlMapper();
        XMLInputFactory xmlif = XMLInputFactory.newInstance();
        XMLStreamReader xmlStreamReader = xmlif.createXMLStreamReader(new FileInputStream(getClass().getClassLoader().getResource("static/asv/OEBPS/"+chapterId).getFile()));
        ChapterHtml chapterHtml = xmlMapper.readValue(xmlStreamReader, ChapterHtml.class);
        return chapterHtml;
    }
}
