package com.ehss.bible.alpha.pojo.toc;

import com.ehss.bible.alpha.pojo.epub.Meta;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    String id;
    String title;
    Integer playOrder;
    String url;

    List<Section> sectionList;
}
