package com.ehss.bible.alpha.repository;

import com.ehss.bible.alpha.pojo.model.Annotation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AnnotationRepo extends MongoRepository<Annotation,String> {

    List<Annotation> findByUserId(String userId);

    List<Annotation> findByUserIdAndBookIdAndChapterId(String userId, String bookId, String chapterId);

    List<Annotation> findByUserIdAndPageUrl(String userId, String pageUrl);

    List<Annotation> findByUserIdAndBookId(String userId, String bookId);
}
