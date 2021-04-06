
import ParentConfig from './ParentConfig';

class Config {
    

    SAMPLE2_PAGE_URL = "http://localhost:8080"+"/asv/OEBPS/66.RE.21.xhtml";

    SAMPLE3_PAGE_URL = "http://localhost:8080"+"/asv/OEBPS/01.GE.1.xhtml";

    BASE1_PAGE_URL = "http://localhost:8080"+"/asv/OEBPS/";
    
    VTOC_URL = "http://localhost:8080"+"/api/toc/virtual/version/asv";

    BASE_PAGE_URL = "http://localhost:8080"+"/api/toc/epub/page/";

    QUERY_PAGE_URL= "http://localhost:8080"+"/api/toc/pageurl/version/asv/book/"

    SAMPLE_PAGE_URL = "http://localhost:8080"+"/api/toc/epub/page/01.GE.1.xhtml";

    SEARCH_URL = "http://localhost:8080"+"/api/bible/search/v1?q=";

    BOOKMARK_URL = "http://localhost:8080"+"/api/bookmark/user/";

    ANNOTATION_URL = "http://localhost:8080"+"/api/annotation/user/";

    MEDIASEARCH_URL = "http://localhost:8080"+"/api/bible/search/media";


    DEFAULT_USER_ID = "123456";

    SITE_TITLE = "";
}

export default Config;