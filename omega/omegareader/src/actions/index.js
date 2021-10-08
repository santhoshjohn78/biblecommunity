export const saveJwtAction = (jwtString) => {
    return {
        type: "JWTSAVE",
        jwtString
    }
}

export const loggedInAction = (isLoggedIn) => {
    return {
        type: "SIGN_IN",
        isLoggedIn
    }
}

export const gotoPageAction = (pageurl, bookId, bookName, chapterId, pageContent, paragraphs, totalPages, verseProps, currentPageNo) => {
    return {
        type: "GOTO",
        pageurl,
        bookId,
        bookName,
        chapterId,
        pageContent,
        paragraphs,
        totalPages,
        verseProps,
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

export const changeThemeColorAction = (bgColor, fontColor) => {

    return {
        type: "THEMECOLOR",
        bgColor,
        fontColor
    }
}

export const changeVersionAction = (version) => {

    return {
        type: "VERSION",
        version
    }
}