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
public class Bookmark {

    @Id
    String id;
    String userId;
    String bookId;
    String bookName;
    String pageUrl;
    String chapterId;
    String pageNumber;
    Date bookMarkedDate;
    String formatedBookMarkedDate;

}
