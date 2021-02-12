package com.ehss.bible.alpha.pojo.epub;


import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlText;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Span {

    String id;

    @JacksonXmlProperty(localName = "class",  isAttribute = true)
    String spanClass;

    @JacksonXmlText
    String value;

    String verseText;

}
