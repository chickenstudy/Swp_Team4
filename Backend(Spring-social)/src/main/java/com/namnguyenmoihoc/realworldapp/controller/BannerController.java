package com.namnguyenmoihoc.realworldapp.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOResponseCreate;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOUpdate;
import com.namnguyenmoihoc.realworldapp.service.BannerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/banner")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BannerController {
    private final BannerService bannerService;

    @PostMapping("/create")
    public Map<String, BannerDTOResponseCreate> createBanner(
            @RequestBody Map<String, BannerDTOCreate> bannerDTOCreateMap) throws UnsupportedEncodingException {
        return bannerService.createBanner(bannerDTOCreateMap);
    }

    @GetMapping("/listBanner")
    public List<BannerDTOResponse> getListBanner() {
        return bannerService.getListBanner();
    }

    @PutMapping("/updateBanner/{bannerid}")
    public Map<String, BannerDTOResponseCreate> getUpdateBanner(@PathVariable int bannerid,
            @RequestBody BannerDTOUpdate bannerDTOUpdate)
            throws CustomNotFoundException {
        bannerDTOUpdate.setBannerid(bannerid);
        return bannerService.getUpdateBanner(bannerDTOUpdate);
    }

    @DeleteMapping("/deletebanner/{bannerid}")
    public void getDeleteBanner(@PathVariable(value = "bannerid") int bannerid)
            throws CustomNotFoundException {

        bannerService.getDeleteBanner(bannerid);

    }

   @GetMapping("/listBanner/{bannerid}")
    public Map<String, BannerDTOResponse> getListBannerByID(@PathVariable(value = "bannerid") int bannerid)
            throws CustomNotFoundException {
        return bannerService.getBannerByID(bannerid);

    }

}
