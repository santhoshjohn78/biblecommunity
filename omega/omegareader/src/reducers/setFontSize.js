
const setFontSizeReducer = (state=15, action) =>{
    switch (action.type){
        case "FONTSIZE":
            return action.size;
        default:
            return state;
    }
}

export default setFontSizeReducer;