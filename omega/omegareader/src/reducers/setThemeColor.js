const initialThemeState = {
    bgColor:'white',
    fontColor:'black'
}
const setThemeColorReducer = (state=initialThemeState, action) =>{
    switch (action.type){
        case "THEMECOLOR":
            return {
                bgColor:action.bgColor,
                fontColor:action.fontColor
            }
        default:
            return state;
    }
}

export default setThemeColorReducer;