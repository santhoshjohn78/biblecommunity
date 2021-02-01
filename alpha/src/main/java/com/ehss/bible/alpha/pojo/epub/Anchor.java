package com.ehss.bible.alpha.pojo.epub;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlText;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Anchor {
    @JacksonXmlProperty(isAttribute = true)
    String href;

    @JacksonXmlText
    String value;
}
