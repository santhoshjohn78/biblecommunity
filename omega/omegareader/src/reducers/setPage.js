const initialPageState = {
    bookId:'navPoint1',
    bookName:'Genesis',
    pageurl:'',
    chapterid:'',
    nofChapters:50,
    pageContent:{},
    paragraphs:[],
    verseProps:{},
    currentPageNo:1
}

const setPageReducer = (state=initialPageState, action) =>{
    switch (action.type){
        case "GOTO":
            return {
                bookId:(action.bookId===-1)?state.bookId:action.bookId,
                bookName:(action.bookName===-1)?state.bookName:action.bookName,
                pageurl:(action.pageurl===-1)?state.pageurl:action.pageurl,
                chapterid:(action.chapterid===-1)?state.chapterid:action.chapterid ,
                nofChapters:(action.totalPages===-1)?state.nofChapters:action.totalPages,
                pageContent:(action.pageContent===-1)?state.pageContent:action.pageContent,
                paragraphs:(action.paragraphs===-1)?state.paragraphs:action.paragraphs,
                verseProps:(action.verseProps===-1)?state.verseProps:action.verseProps,
                currentPageNo:(action.currentPageNo===-1)?state.currentPageNo:action.currentPageNo
            }
        default:
            return state;
    }
}

export default setPageReducer;