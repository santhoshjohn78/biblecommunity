const initialPageState = {
    bookId:'navPoint1',
    bookName:'Genesis',
    pageurl:'',
    chapterid:'',
    nofChapters:50,
    pageContent:{},
    paragraphs:[],
    currentPageNo:1
}

const setPageReducer = (state=initialPageState, action) =>{
    switch (action.type){
        case "GOTO":
            return {
                bookId:action.bookId,
                bookName:action.bookName,
                pageurl:action.pageurl,
                chapterid:action.chapterid,
                nofChapters: (action.totalPages==-1)?state.nofChapters:action.totalPages,
                pageContent:action.pageContent,
                paragraphs:action.paragraphs,
                currentPageNo:action.currentPageNo
            }
        default:
            return state;
    }
}

export default setPageReducer;