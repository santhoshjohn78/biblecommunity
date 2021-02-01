package com.ehss.bible.alpha.pojo.epub;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.bind.annotation.XmlAttribute;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Content {

    @JacksonXmlProperty(isAttribute = true)
    String src;
}
