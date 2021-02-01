package com.ehss.bible.alpha.services;

import com.ehss.bible.alpha.pojo.toc.VirtualTOC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VirtualTOCService {
    TOCAdapterService tocAdapterService;
    EpubTOCService epubTOCService;

    @Autowired
    public VirtualTOCService(TOCAdapterService tocAdapterService, EpubTOCService epubTOCService){
        this.tocAdapterService = tocAdapterService;
        this.epubTOCService = epubTOCService;
    }

    public VirtualTOC constructVirtualTOC() throws Exception{
        return tocAdapterService.toVirtualTOC(epubTOCService.getToc());
    }
}
