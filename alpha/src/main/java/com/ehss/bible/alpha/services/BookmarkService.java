package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.model.Bookmark;
import com.ehss.bible.alpha.repository.BookmarkRepo;
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

    @Autowired
    AuthService authService;

    @Transactional
    public Bookmark createBookmark(Bookmark bookmark) {
        bookmark.setId(UUID.randomUUID().toString());
        Date markedDate = new Date();
        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        bookmark.setUserId(authService.getUserIdFromSecurityContext());
        String formattedDate = dateFormat.format(markedDate);
        bookmark.setFormattedBookMarkedDate(formattedDate);
        bookmark.setBookMarkedDate(markedDate);
       // bookmark.setIsLastVisitedPage(false);
        bookmarkRepo.save(bookmark);
        return bookmark;
    }


    @Transactional
    public Bookmark createLastVisitedPage(Bookmark bookmark) {
        bookmark.setId(UUID.randomUUID().toString());
        Date markedDate = new Date();
        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        String formattedDate = dateFormat.format(markedDate);
        bookmark.setUserId(authService.getUserIdFromSecurityContext());
        bookmark.setFormattedBookMarkedDate(formattedDate);
        bookmark.setBookMarkedDate(markedDate);
        bookmark.setIsLastVisitedPage(true);
        bookmarkRepo.save(bookmark);
        return bookmark;
    }

    @Transactional
    public void deleteBookmark(String id) {
        bookmarkRepo.deleteById(id);
    }

    public List<Bookmark> getBookmarks() {
        return bookmarkRepo.findByUserIdAndIsLastVisitedPage(authService.getUserIdFromSecurityContext(), false);
    }

    public Bookmark getLastVisitedPage() {
        Bookmark bookmark = null;
        String userId = authService.getUserIdFromSecurityContext();
        List<Bookmark> bookmarks = bookmarkRepo.findByUserIdAndIsLastVisitedPage(userId, true);
        if (bookmarks == null || bookmarks.isEmpty()) {
            bookmark = new Bookmark();

            bookmark.setBookId("navPoint1");
            bookmark.setBookName("Genesis");
            bookmark.setPageUrl("01.GE.1.xhtml");
            bookmark.setUserId(userId);
            bookmark.setChapterId("1");
            bookmark.setPageNumber("1");
            bookmark = createLastVisitedPage(bookmark);

        } else {
            bookmark = bookmarks.get(0);
        }
        return bookmark;
    }

    public List<Bookmark> getBookmarks(String bookId) {
        return bookmarkRepo.findByUserIdAndBookIdAndIsLastVisitedPage(authService.getUserIdFromSecurityContext(), bookId, false);
    }

    public Bookmark getBookmark(String bookId, String chapterId) {
        return bookmarkRepo.findByUserIdAndBookIdAndChapterIdAndIsLastVisitedPage(authService.getUserIdFromSecurityContext(), bookId, chapterId, false);
    }

    public Bookmark getBookmark(String pageUrl) {
        String userId = authService.getUserIdFromSecurityContext();
        List<Bookmark> bookmarks = bookmarkRepo.findDistinctByUserIdAndPageUrlAndIsLastVisitedPage(userId, pageUrl, false);
        if (bookmarks != null && !bookmarks.isEmpty())
            return bookmarkRepo.findDistinctByUserIdAndPageUrlAndIsLastVisitedPage(userId, pageUrl, false).get(0);
        else
            return null;
    }
}
