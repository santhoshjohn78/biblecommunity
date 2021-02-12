package com.ehss.bible.alpha.pojo.epub;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JacksonXmlRootElement(localName = "html")
@JsonIgnoreProperties(ignoreUnknown = true)
public class PageHtml {

    @JacksonXmlProperty(localName = "body")
    PageBody body;
}
