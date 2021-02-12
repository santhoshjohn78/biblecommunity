package com.ehss.bible.alpha.repository;

import com.ehss.bible.alpha.config.ESClient;
import com.ehss.bible.alpha.pojo.elasticsearch.BibleVerse;
import lombok.extern.slf4j.Slf4j;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.Query;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.common.io.stream.StreamOutput;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.*;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.List;

@Repository
@Slf4j
public class ElasticsearchRepo {
    private ESClient esClient;

    @Autowired
    public ElasticsearchRepo(ESClient esClient){
        this.esClient = esClient;
    }

    public synchronized void indexData(List<BibleVerse> bibleVerseList, String indexName){
        try{
            BulkRequest bulkRequest = new BulkRequest();
            String bookName=null;
            String chapterNo=null;
            for(BibleVerse bibleVerse:bibleVerseList){
                IndexRequest indexRequest = new IndexRequest(indexName);
                indexRequest.source(bibleVerse.toString(), XContentType.JSON);
                bulkRequest.add(indexRequest);
                bookName=bibleVerse.getBookName();
                chapterNo=bibleVerse.getChapterName();

            }
            BulkResponse bulkResponse = esClient.getClient().bulk(bulkRequest, RequestOptions.DEFAULT);
            log.info("Indexing response "+bookName+"-"+chapterNo+"::"+bulkResponse.status());
        }catch (Exception ex){
            log.error("",ex);
        }

    }

    public SearchResponse searchVerseByPage(String pageUrl){
        SearchSourceBuilder searchSourceBuilder;
        org.elasticsearch.action.search.SearchRequest req = null;
        searchSourceBuilder =new SearchSourceBuilder();
        TermQueryBuilder termQueryBuilder = QueryBuilders.termQuery("pageUrl.keyword",pageUrl);
       // termQueryBuilder.
        //(QueryBuilders.queryStringQuery(query[0], fields).getQueryBuilder());
        searchSourceBuilder.query(termQueryBuilder);
        searchSourceBuilder.from(1);
        searchSourceBuilder.size(2000);
        searchSourceBuilder.sort("verseNumber", SortOrder.ASC);
        searchSourceBuilder.highlighter(new HighlightBuilder().field("*").requireFieldMatch(false)
                .highlighterType("unified"));
        String[] indices ={"bibleverse"};
        req = new org.elasticsearch.action.search.SearchRequest(indices, searchSourceBuilder);
        //req.searchType(SearchType.DFS_QUERY_THEN_FETCH);
        //req.preference("_primary_first");


        SearchResponse searchRes = null;
        try {
            searchRes = this.esClient.getClient().search(req, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return searchRes;
    }

    public SearchResponse searchVerseByMatch(String text){
        SearchSourceBuilder searchSourceBuilder;
        org.elasticsearch.action.search.SearchRequest req = null;
        searchSourceBuilder =new SearchSourceBuilder();
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        MatchPhrasePrefixQueryBuilder matchPhrasePrefixQueryBuilder = QueryBuilders.matchPhrasePrefixQuery("verseText",text);
        MatchQueryBuilder matchQueryBuilder = QueryBuilders.matchQuery("verseText",text);
        matchQueryBuilder.fuzziness(1);

        boolQuery.should(matchPhrasePrefixQueryBuilder);
        boolQuery.should(matchQueryBuilder);
        searchSourceBuilder.query(boolQuery);

        searchSourceBuilder.highlighter(new HighlightBuilder().field("verseText").requireFieldMatch(true)
                .highlighterType("unified"));
        String[] indices ={"bibleverse"};
        req = new org.elasticsearch.action.search.SearchRequest(indices, searchSourceBuilder);

        SearchResponse searchRes = null;
        try {
            searchRes = this.esClient.getClient().search(req, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return searchRes;


    }

    public SearchResponse searchVerseByBookChapterVerse(String book,String chapter,String verse){
        SearchSourceBuilder searchSourceBuilder;
        org.elasticsearch.action.search.SearchRequest req = null;
        searchSourceBuilder =new SearchSourceBuilder();
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        TermQueryBuilder verseTermQueryBuilder = QueryBuilders.termQuery("verseNumber",verse);
        TermQueryBuilder chapterTermQueryBuilder = QueryBuilders.termQuery("chapterNumber",chapter);
        TermQueryBuilder bookTermQueryBuilder = QueryBuilders.termQuery("bookName.keyword",book);

        boolQuery.must(verseTermQueryBuilder);
        boolQuery.must(chapterTermQueryBuilder);
        boolQuery.must(bookTermQueryBuilder);

        searchSourceBuilder.query(boolQuery);

        searchSourceBuilder.highlighter(new HighlightBuilder().field("*").requireFieldMatch(false)
                .highlighterType("unified"));
        String[] indices ={"bibleverse"};
        req = new org.elasticsearch.action.search.SearchRequest(indices, searchSourceBuilder);

        SearchResponse searchRes = null;
        try {
            searchRes = this.esClient.getClient().search(req, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return searchRes;
    }
}
