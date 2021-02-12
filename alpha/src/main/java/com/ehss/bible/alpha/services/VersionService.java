package com.ehss.bible.alpha.services;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@Getter
@Setter
@ConfigurationProperties(prefix="bible.config")
public class VersionService {

    Map<String,String> versions=new HashMap<>();
    Map<String,String> tocpath=new HashMap<>();





}
