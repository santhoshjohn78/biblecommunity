package com.ehss.bible.alpha.pojo.model;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.Date;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class Annotation {

    @Id
    String id;
    String userId;
    String bookId;
    String bookName;
    String pageUrl;
    String chapterId;
    Integer verseNumber;
    String verseText;
    String pageNumber;
    Date annotationDate;
    String formattedAnnotationDate;
    boolean sharedAnnotation;
    String[] tags;
    String[] mediaUrls;

}
