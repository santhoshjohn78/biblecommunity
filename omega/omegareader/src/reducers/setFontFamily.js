
const setFontFamilyReducer = (state="Georgia,Serif, Times, serif;", action) =>{
    switch (action.type){
        case "FONTFAMILY":
            return action.font;
        default:
            return state;
    }
}

export default setFontFamilyReducer;