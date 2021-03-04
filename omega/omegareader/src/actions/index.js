export const gotoPageAction = (pageurl,bookId,bookName,chapterId,pageContent,paragraphs,totalPages,currentPageNo) =>{
    return {
        type: "GOTO",
        pageurl,
        bookId,
        bookName,
        chapterId,
        pageContent,
        paragraphs,
        totalPages,
        currentPageNo
        
    }
}

export const changeFontSizeAction = (size) => {

    return {
        type: "FONTSIZE",
        size
    }
}

export const changeFontFamilyAction = (font) => {

    return {
        type: "FONTFAMILY",
        font
    }
}