package com.ehss.bible.alpha.pojo.toc;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Verse {

    String id;
    Integer playOrder;
    String url;
    String text;

}
