package com.ehss.bible.alpha.repository;

import com.ehss.bible.alpha.pojo.model.Bookmark;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface BookmarkRepo extends MongoRepository<Bookmark, String> {

    List<Bookmark> findByUserIdAndIsLastVisitedPage(String userId, Boolean isLastVisitedPage);

    Bookmark findByUserIdAndBookIdAndChapterIdAndIsLastVisitedPage(String userId, String bookId, String chapterId, Boolean isLastVisitedPage);

    List<Bookmark> findDistinctByUserIdAndPageUrlAndIsLastVisitedPage(String userId, String pageUrl, Boolean isLastVisitedPage);

    List<Bookmark> findByUserIdAndBookIdAndIsLastVisitedPage(String userId, String bookId, Boolean isLastVisitedPage);


}
