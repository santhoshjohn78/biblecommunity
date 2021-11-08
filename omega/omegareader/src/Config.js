

class Config {


    // replace http://localhost:8080 with https://mediascripture.com

    SAMPLE2_PAGE_URL = "http://localhost:8080" + "/kjv/OEBPS/66.RE.21.xhtml";

    SAMPLE3_PAGE_URL = "http://localhost:8080" + "/kjv/OEBPS/01.GE.1.xhtml";

    BASE1_PAGE_URL = "http://localhost:8080" + "/kjv/OEBPS/";

    VTOC_URL = "http://localhost:8080" + "/api/toc/virtual/version/kjv";

    BASE_PAGE_URL = "http://localhost:8080" + "/api/toc/epub/version/";

    DEFAULT_PAGE_URL = "01.GE.1.xhtml";
    //BASE_PAGE_URL = "http://localhost:8080"+"/api/toc/epub/version/kjv/page/";

    QUERY_PAGE_URL = "http://localhost:8080" + "/api/toc/pageurl/version/kjv/book/"

    SAMPLE_PAGE_URL = 'http://localhost:8080/api/toc/epub/version/kjv/page/01.GE.1.xhtml';



    LAST_PAGE_URL = "http://localhost:8080" + "/api/bookmark/user/";

    SEARCH_URL = "http://localhost:8080" + "/api/bible/version/kjv/search/v1?q=";

    BOOKMARK_URL = "http://localhost:8080" + "/api/bookmark/user/";

    ANNOTATION_URL = "http://localhost:8080" + "/api/annotation/user/";

    MEDIASEARCH_URL = "http://localhost:8080" + "/api/bible/search/media";


    MEDIA_URL = "http://localhost:8080" + "/api/media/";

    AUTH_URL = "http://localhost:8080" + "/api/auth/authenticate";

    SIGNUP_URL = "http://localhost:8080" + "/api/auth/signup";

    DEFAULT_USER_ID = "123456";

    SITE_TITLE = "";
}

export default Config;