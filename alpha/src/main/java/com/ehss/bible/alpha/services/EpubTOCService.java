package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.epub.*;
import com.ehss.bible.alpha.pojo.RootTOC;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.xml.namespace.QName;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamReader;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class EpubTOCService {

    VersionService versionService;

    @Autowired
    public EpubTOCService(VersionService versionService){
        this.versionService = versionService;
    }
    @Cacheable("RootTOC")
    public RootTOC getToc(String version) throws Exception {
        XmlMapper xmlMapper = new XmlMapper();
        XMLInputFactory xmlif = XMLInputFactory.newInstance();
        String toc=versionService.getTocpath().get(version);
        log.info("TOC path="+toc);
        XMLStreamReader xmlStreamReader = xmlif.createXMLStreamReader(new FileInputStream(getClass().getClassLoader()
                .getResource(toc).getFile()));
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

    public PageHtml getPage(String pageUrl) throws  Exception{
        XmlMapper xmlMapper = new XmlMapper();
        XMLInputFactory xmlif = XMLInputFactory.newInstance();
        XMLStreamReader xmlStreamReader = xmlif.createXMLStreamReader(new FileInputStream(getClass().getClassLoader().getResource("static/asv/OEBPS/"+pageUrl).getFile()));
        PageHtml pageHtml= new PageHtml();
        pageHtml.setBody(new PageBody());
        pageHtml.getBody().setParagraphs(new ArrayList<>());
        //Iterate through events.
        Paragraph paragraph=null;
        List<Span> spans;
        String verseText;
        Span span = null;
        while(xmlStreamReader.hasNext()){

            //Get integer value of current event.
            int xmlEvent = xmlStreamReader.getEventType();



            if (paragraph!=null && xmlEvent == XMLStreamConstants.CHARACTERS){
                verseText = xmlStreamReader.getText();
                if (!verseText.startsWith("\n"))
                    span.setVerseText(verseText);
            }

            //Process start element.
            if (xmlEvent == XMLStreamConstants.START_ELEMENT) {
                String startElementStr = xmlStreamReader.getLocalName();

                if (startElementStr.equalsIgnoreCase("h2")){
                    pageHtml.getBody().setH2(xmlStreamReader.getElementText());
                }
                if (startElementStr.equalsIgnoreCase(("p"))){
                    paragraph = new Paragraph();
                    paragraph.setSpans(new ArrayList<>());

                }
                if (startElementStr.equalsIgnoreCase(("a"))) {
                    String id =  xmlStreamReader.getAttributeValue(0);

                    if (span!=null){
                        paragraph.getSpans().add(span);
                    }

                    span = new Span();
                    span.setId(id);
                }
                if (startElementStr.equalsIgnoreCase(("span"))) {
                    String id =  xmlStreamReader.getElementText();

                    span.setValue(id);

                }



            }

            //Process end element.
            if (xmlEvent == XMLStreamConstants.END_ELEMENT) {
                String endElementStr = xmlStreamReader.getLocalName();

                if (endElementStr.equalsIgnoreCase(("p"))){
                    //paragraph.getSpans().add(span);
                    pageHtml.getBody().getParagraphs().add(paragraph);
                }
                if (endElementStr.equalsIgnoreCase("span")){
                    paragraph.getSpans().add(span);
                }
            }
            xmlStreamReader.next();

        };

        return pageHtml;
    }
}
