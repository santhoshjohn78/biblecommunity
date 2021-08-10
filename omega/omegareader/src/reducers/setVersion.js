
const setVersionReducer = (state="kjv", action) =>{
    switch (action.type){
        case "VERSION":
            return action.version;
        default:
            return state;
    }
}

export default setVersionReducer;