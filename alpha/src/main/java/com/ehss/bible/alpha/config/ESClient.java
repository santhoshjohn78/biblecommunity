/*
 *
 *  * PEARSON PROPRIETARY AND CONFIDENTIAL INFORMATION SUBJECT TO NDA
 *  * Copyright © 2018 Pearson Education, Inc.
 *  * All Rights Reserved.
 *  *
 *  * NOTICE: All information contained herein is, and remains the property of
 *  * Pearson Education, Inc. The intellectual and technical concepts contained
 *  * herein are proprietary to Pearson Education, Inc. and may be covered by U.S.
 *  * and Foreign Patents, patent applications, and are protected by trade secret
 *  * or copyright law. Dissemination of this information, reproduction of this
 *  * material, and copying or distribution of this software is strictly forbidden
 *  * unless prior written permission is obtained from Pearson Education, Inc.
 *
 */
package com.ehss.bible.alpha.config;

import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
@Slf4j
public class ESClient {


	private RestHighLevelClient client;
	private RestClientBuilder restClientBuilder;


	@Value("${elasticsearch.port:9200}")
	private String PORT;

	@Value("${elasticsearch.host}")
	private String HOSTS;
	

	@Bean(destroyMethod = "close")
	public RestHighLevelClient initialiseClient() throws Exception {
		try {

			final int port = Integer.parseInt(PORT);
			final String[] hosts = getSearchHosts();
			List<HttpHost> hostList = new ArrayList<>();
			
			Arrays.stream(hosts).forEach(host -> {
				log.info("Adding es host: {}.", host);
				hostList.add(new HttpHost(host, port, "http"));
			});

			restClientBuilder= RestClient.builder(hostList.toArray(new HttpHost[hostList.size()]));
			
			client = new RestHighLevelClient(restClientBuilder);
			return client;

		} catch (Exception ex) {
			log.error("Exception when connection to elastic search", ex);
			throw ex;
		}
	}

	

	public RestHighLevelClient getClient() {
		return client;
	}

	public String[] getSearchHosts() {
		return HOSTS.split(",");
	}
}