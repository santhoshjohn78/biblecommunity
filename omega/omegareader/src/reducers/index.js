import {combineReducers} from 'redux';
import isLoggedReducer from './isLogged';
import setPageReducer from './setPage';
import setFontSizeReducer from './setFontSize';

import setFontFamilyReducer from './setFontFamily';


const rootReducer = combineReducers({
    loggedIn: isLoggedReducer,
    page:setPageReducer,
    fontSize:setFontSizeReducer,
    fontFamily:setFontFamilyReducer
});

export default rootReducer;