package com.ehss.bible.alpha.pojo.epub;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = false)
public class NavPoint {
    //@XmlAttribute
    @JacksonXmlProperty(isAttribute = true)
    String id;
    //@XmlAttribute
    @JacksonXmlProperty(isAttribute = true)
    String playOrder;


    //@XmlElement(name="text")
    @JacksonXmlProperty
    NavLabel navLabel;

    //@XmlElement
    @JacksonXmlProperty
    Content content;

}
