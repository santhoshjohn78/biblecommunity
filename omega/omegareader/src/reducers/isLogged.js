const isLoggedReducer = (state = false, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return action.isLoggedIn;
        default:
            return state;

    }
};

export default isLoggedReducer;