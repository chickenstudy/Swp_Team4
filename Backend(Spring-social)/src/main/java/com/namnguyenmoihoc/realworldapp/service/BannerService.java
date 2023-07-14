package com.namnguyenmoihoc.realworldapp.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOResponseCreate;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOUpdate;

public interface BannerService {
        public Map<String, BannerDTOResponseCreate> createBanner(Map<String, BannerDTOCreate> bannerDTOCreateMap)
                        throws UnsupportedEncodingException;

        public List<BannerDTOResponse> getListBanner();

//         public Map<String, BannerDTOResponseCreate> getUpdateBanner(BannerDTOUpdate bannerDTOUpdate)
//                         throws CustomNotFoundException;

//         public void getDeleteBanner(int bannerid) throws CustomNotFoundException;

        public Map<String, BannerDTOResponse> getBannerByID(int bannerid) throws CustomNotFoundException;
}