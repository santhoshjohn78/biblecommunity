package com.ehss.bible.alpha.pojo.toc;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageUrl {

    String key;
    String versionId;
    String bookId;
    String chapterId;
    String url;
}
