package com.namnguyenmoihoc.realworldapp.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOResponseCreate;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOUpdate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;

public interface BannerService {
    Map<String, BannerDTOResponseCreate> createBanner(Map<String, BannerDTOCreate> bannerDTOCreateMap)
            throws UnsupportedEncodingException;

    List<BannerDTOResponse> getListBanner();

    Map<String, BannerDTOResponseCreate> getUpdateAccount(BannerDTOUpdate bannerDTOUpdate)
            throws CustomNotFoundException;

    void getDeleteBanner(int bannerid) throws CustomNotFoundException;

    Map<String, BannerDTOResponseCreate> getBannerByID(int bannerid) throws CustomNotFoundException;
}
