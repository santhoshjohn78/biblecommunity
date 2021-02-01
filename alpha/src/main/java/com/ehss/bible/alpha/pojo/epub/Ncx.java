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
@JacksonXmlRootElement(localName = "nxc")
public class Ncx {

    @JacksonXmlElementWrapper(localName = "head")
    @JacksonXmlProperty(localName = "meta")
    List<Meta> meta;

    DocTitle docTitle;

    @JacksonXmlElementWrapper(localName = "navMap")
    @JacksonXmlProperty(localName = "navPoint")
    private List<NavPoint> navPoint;

}
