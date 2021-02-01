package com.ehss.bible.alpha.pojo.epub;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Meta {
    @JacksonXmlProperty(isAttribute = true)
    String content;
    @JacksonXmlProperty(isAttribute = true)
    String name;
}
