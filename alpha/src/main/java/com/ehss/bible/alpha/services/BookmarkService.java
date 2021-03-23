package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.model.Bookmark;
import com.ehss.bible.alpha.repository.BookmarkRepo;
import com.sun.java.accessibility.util.GUIInitializedListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class BookmarkService {

    @Autowired
    BookmarkRepo bookmarkRepo;

    @Transactional
    public Bookmark createBookmark(Bookmark bookmark){
        bookmark.setId(UUID.randomUUID().toString());
        Date markedDate = new Date();
        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        String formattedDate = dateFormat.format(markedDate);
        bookmark.setFormattedBookMarkedDate(formattedDate);
        bookmark.setBookMarkedDate(markedDate);
        bookmarkRepo.save(bookmark);
        return bookmark;
    }

    @Transactional
    public void deleteBookmark(String id){
        bookmarkRepo.deleteById(id);
    }

    public List<Bookmark> getBookmarks(String userId){
        return bookmarkRepo.findByUserId(userId);
    }

    public List<Bookmark> getBookmarks(String userId,String bookId){
        return bookmarkRepo.findByUserIdAndBookId(userId,bookId);
    }

    public Bookmark getBookmark(String userId,String bookId,String chapterId){
        return bookmarkRepo.findByUserIdAndBookIdAndChapterId(userId,bookId,chapterId);
    }

    public Bookmark getBookmark(String userId, String pageUrl){
        List<Bookmark> bookmarks = bookmarkRepo.findDistinctByUserIdAndPageUrl(userId,pageUrl);
        if (bookmarks!=null && !bookmarks.isEmpty())
            return bookmarkRepo.findDistinctByUserIdAndPageUrl(userId,pageUrl).get(0);
        else
            return null;
    }
}
