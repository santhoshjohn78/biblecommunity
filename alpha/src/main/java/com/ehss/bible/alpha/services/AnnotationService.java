package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.model.Annotation;
import com.ehss.bible.alpha.repository.AnnotationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class AnnotationService {

    @Autowired
    AnnotationRepo annotationRepo;

    @Autowired
    MediaService mediaService;

    @Autowired
    AuthService authService;

    private boolean isValidUrl(String url) {
        return url != null && url.length() > 0;
    }

    @Transactional
    public Annotation createAnnotation(Annotation annotation) {
        annotation.setId(UUID.randomUUID().toString());
        String userId = authService.getUserIdFromSecurityContext();
        if (userId != null) {

            Date markedDate = new Date();
            annotation.setUserId(userId);
            DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            String formattedDate = dateFormat.format(markedDate);
            annotation.setFormattedAnnotationDate(formattedDate);
            annotation.setAnnotationDate(markedDate);
            List<String> urlList = new ArrayList<>();
            for (String urls : annotation.getMediaUrls()) {
                if (isValidUrl(urls)) {
                    urlList.add(urls);
                }
            }

            annotation.setMediaUrls(urlList.toArray(new String[urlList.size()]));

            annotationRepo.save(annotation);
            mediaService.indexMedia(annotation);
        }


        return annotation;
    }

    @Transactional
    public void deleteAnnotation(String id) {
        annotationRepo.deleteById(id);
    }

    public List<Annotation> getAnnotations() {
        return annotationRepo.findByUserId(authService.getUserIdFromSecurityContext());
    }

    public List<Annotation> getAnnotationsByBookId(String bookId) {
        return annotationRepo.findByUserIdAndBookId(authService.getUserIdFromSecurityContext(), bookId);
    }

    public List<Annotation> getAnnotations(String bookId, String chapterId) {
        return annotationRepo.findByUserIdAndBookIdAndChapterId(authService.getUserIdFromSecurityContext(), bookId, chapterId);
    }

    public List<Annotation> getAnnotationsByPageUrl(String pageUrl) {
        return annotationRepo.findByUserIdAndPageUrl(authService.getUserIdFromSecurityContext(), pageUrl);
    }
}
