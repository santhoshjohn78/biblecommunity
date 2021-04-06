package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.model.Annotation;
import com.ehss.bible.alpha.pojo.model.Bookmark;
import com.ehss.bible.alpha.repository.AnnotationRepo;
import com.ehss.bible.alpha.repository.BookmarkRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class AnnotationService {

    @Autowired
    AnnotationRepo annotationRepo;

    @Autowired
    MediaService mediaService;

    private boolean isValidUrl(String url){
        if (url==null || url.length()<=0){
            return false;
        }else{
            return true;
        }
    }

    @Transactional
    public Annotation createAnnotation(Annotation annotation){
        annotation.setId(UUID.randomUUID().toString());
        Date markedDate = new Date();
        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        String formattedDate = dateFormat.format(markedDate);
        annotation.setFormattedAnnotationDate(formattedDate);
        annotation.setAnnotationDate(markedDate);
        List<String> urlList = new ArrayList<>();
        for(String urls:annotation.getMediaUrls()){
            if (isValidUrl(urls)){
                    urlList.add(urls);
            }
        }

        annotation.setMediaUrls(urlList.toArray(new String[urlList.size()]));

        annotationRepo.save(annotation);
        mediaService.indexMedia(annotation);

        return annotation;
    }

    @Transactional
    public void deleteAnnotation(String id){
        annotationRepo.deleteById(id);
    }

    public List<Annotation> getAnnotations(String userId){
        return annotationRepo.findByUserId(userId);
    }

    public List<Annotation> getAnnotationsByBookId(String userId,String bookId){
        return annotationRepo.findByUserIdAndBookId(userId,bookId);
    }

    public List<Annotation> getAnnotations(String userId,String bookId,String chapterId){
        return annotationRepo.findByUserIdAndBookIdAndChapterId(userId,bookId,chapterId);
    }

    public List<Annotation> getAnnotationsByPageUrl(String userId, String pageUrl){
        return annotationRepo.findByUserIdAndPageUrl(userId,pageUrl);
    }
}
