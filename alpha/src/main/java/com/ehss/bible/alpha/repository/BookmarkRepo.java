package com.ehss.bible.alpha.repository;

import com.ehss.bible.alpha.pojo.model.Bookmark;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface BookmarkRepo extends MongoRepository<Bookmark,String> {

    List<Bookmark> findByUserId(String userId);

    Bookmark findByUserIdAndBookIdAndChapterId(String userId,String bookId,String chapterId);

    List<Bookmark> findDistinctByUserIdAndPageUrl(String userId,String pageUrl);

    List<Bookmark> findByUserIdAndBookId(String userId,String bookId);
}
