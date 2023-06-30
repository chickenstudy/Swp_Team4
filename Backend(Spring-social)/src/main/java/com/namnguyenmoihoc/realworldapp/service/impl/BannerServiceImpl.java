package com.namnguyenmoihoc.realworldapp.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Banner;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOResponseCreate;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOUpdate;

import com.namnguyenmoihoc.realworldapp.model.user.CustomError;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.BannerMapper;
import com.namnguyenmoihoc.realworldapp.repository.BannerRepository;
import com.namnguyenmoihoc.realworldapp.service.BannerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BannerServiceImpl implements BannerService {
    private final BannerRepository bannerRepository;

    @Override
    public Map<String, BannerDTOResponseCreate> createBanner(Map<String, BannerDTOCreate> bannerDTOCreateMap)
            throws UnsupportedEncodingException {
        
        BannerDTOCreate bannerDTOcreate = bannerDTOCreateMap.get("banner");
        Banner banner = BannerMapper.toBanner(bannerDTOcreate);
        banner = bannerRepository.save(banner);

        Map<String, BannerDTOResponseCreate> wrapper = new HashMap<>();
        BannerDTOResponseCreate bannerDTOResponse = BannerMapper.toBannerDTOReponseCreate(banner);
        wrapper.put("banner", bannerDTOResponse);
        return wrapper;
    }

    @Override
    public List<BannerDTOResponse> getListBanner() {
        // TODO Auto-generated method stub
        List<Banner> listBanner = bannerRepository.findAll();

        List<BannerDTOResponse> bannerDTOResponses = new ArrayList<>();

        for (Banner banner : listBanner) {
            bannerDTOResponses.add(BannerMapper.toBannerDTOReponse(banner));
        }
        return bannerDTOResponses;
    }

    @Override
    public Map<String, BannerDTOResponseCreate> getUpdateAccount(BannerDTOUpdate bannerDTOUpdate)
            throws CustomNotFoundException {
        // TODO Auto-generated method stub
        Optional<Banner> bannerOptional = bannerRepository.findById(bannerDTOUpdate.getBannerid());

        if (bannerOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Banner not found").build());
        }

        // return buidProfileResponse(userOptional.get());

        Banner banner = bannerOptional.get();
        BannerMapper.updateBannerDetails(banner, bannerDTOUpdate);

        banner = bannerRepository.save(banner);
        return buildBannerResponse(banner);
    }

    private Map<String, BannerDTOResponseCreate> buildBannerResponse(Banner banner) {
        String picture = Base64.getEncoder().encodeToString(banner.getPicture());
        Map<String, BannerDTOResponseCreate> wrapper = new HashMap<>();

        BannerDTOResponseCreate bannerDTOResponse = BannerDTOResponseCreate.builder().picture(picture).active(banner.getActive()).build();

        wrapper.put("update:", bannerDTOResponse);
        return wrapper;
    }

    @Override
    public void getDeleteBanner(int bannerid) throws CustomNotFoundException {
        // TODO Auto-generated method stub
        Optional<Banner> bannerOptional = bannerRepository.findById(bannerid);

        if (bannerOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Banner not found").build());
        }

        bannerRepository.deleteById(bannerid);
    }

    @Override
    public Map<String, BannerDTOResponseCreate> getBannerByID(int bannerid) throws CustomNotFoundException {
        // TODO Auto-generated method stub
        Optional<Banner> bannerOptional = bannerRepository.findById(bannerid);

        if (bannerOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Banner not found").build());
        }
        Banner banner = bannerOptional.get();
        // BannerDTOResponseCreate.add(BannerMapper.toBannerDTOReponse(banner));
        BannerDTOResponseCreate bannerDTO = BannerMapper.toBannerDTOReponseCreate(banner);
        Map<String, BannerDTOResponseCreate> result = new HashMap<>();
        result.put("banner", bannerDTO);

        return result;
    }

}
