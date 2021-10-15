
const setJwtStringReducer = (state = 0, action) => {
    switch (action.type) {
        case "JWTSAVE":
            return action.jwtString;
        default:
            return state;
    }
}

export default setJwtStringReducer;