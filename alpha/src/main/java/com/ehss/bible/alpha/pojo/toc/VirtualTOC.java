package com.ehss.bible.alpha.pojo.toc;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VirtualTOC {
    String versionId;
    String versionName;
    List<Book> bookList;
}
