package com.ehss.bible.alpha;

import com.ehss.bible.alpha.services.VersionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.concurrent.Executor;

@SpringBootApplication
@EnableAsync
@EnableCaching
@Slf4j
public class AlphaApp implements CommandLineRunner {

	@Autowired
	VersionService versionService;

	public static void main(String[] args) {
		SpringApplication.run(AlphaApp.class, args);
	}


	@Bean("threadPoolTaskExecutor")
	public Executor getAsyncExecutor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(5);
		executor.setMaxPoolSize(20);
		executor.setQueueCapacity(10);
		executor.setThreadNamePrefix("AlphaIngestor-");
		executor.initialize();
		return executor;
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**");
			}
		};
	}

	@Override
	public void run(String... args) throws Exception {
		log.info("asv:"+versionService.getVersions().get("asv"));
		log.info("path:"+versionService.getTocpath().get("asv"));
	}
}
