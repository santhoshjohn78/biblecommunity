import { combineReducers } from 'redux';
import isLoggedReducer from './isLogged';
import setPageReducer from './setPage';
import setFontSizeReducer from './setFontSize';
import setThemeColorReducer from './setThemeColor';
import setFontFamilyReducer from './setFontFamily';
import setVersionReducer from './setVersion';
import setJwtStringReducer from './setJwtString';


const rootReducer = combineReducers({
    loggedIn: isLoggedReducer,
    page: setPageReducer,
    fontSize: setFontSizeReducer,
    theme: setThemeColorReducer,
    fontFamily: setFontFamilyReducer,
    version: setVersionReducer,
    jwt: setJwtStringReducer
});

export default rootReducer;