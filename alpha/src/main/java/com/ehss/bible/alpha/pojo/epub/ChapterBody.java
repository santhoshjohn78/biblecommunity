package com.ehss.bible.alpha.pojo.epub;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChapterBody {

    String h2;

    @JacksonXmlElementWrapper(localName = "div")
    @JacksonXmlProperty(localName = "a")
    List<Anchor> pages;
}
