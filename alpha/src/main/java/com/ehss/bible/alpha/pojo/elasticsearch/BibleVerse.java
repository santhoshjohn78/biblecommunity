package com.ehss.bible.alpha.pojo.elasticsearch;

import com.google.gson.Gson;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class BibleVerse {

    String key;
    Integer verseNumber;
    String verseText;
    Integer chapterNumber;
    String chapterName;
    String bookId;
    String bookName;
    String[] tags;
    String pageUrl;
    String anchorId;
    String bibleVersionId;
    String bibleVersionName;

    @Override
    public String toString() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

}
