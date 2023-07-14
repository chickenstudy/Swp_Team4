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

//     @Override
//     public List<BannerDTOResponse> getListBanner() {
//         // TODO Auto-generated method stub
//         List<Banner> listBanner = bannerRepository.findAll();

//         List<BannerDTOResponse> bannerDTOResponses = new ArrayList<>();

//         for (Banner banner : listBanner) {
//             bannerDTOResponses.add(BannerMapper.toBannerDTOReponse(banner));
//         }
//         return bannerDTOResponses;
//     }

// @Override
//     public Map<String, BannerDTOResponseCreate> getUpdateBanner(BannerDTOUpdate bannerDTOUpdate)
//             throws CustomNotFoundException {
//         // TODO Auto-generated method stub
//         Optional<Banner> bannerOptional = bannerRepository.findByBannerid(bannerDTOUpdate.getBannerid());
//                 System.out.println(bannerOptional);

//         if (bannerOptional.isEmpty()) {
//             throw new CustomNotFoundException(CustomError.builder().code("404").message("Banner not found").build());
//         }

//         // return buidProfileResponse(userOptional.get());

//         Banner banner = bannerOptional.get();
//         BannerMapper.updateBannerDetails(banner, bannerDTOUpdate);

//         banner = bannerRepository.save(banner);
//         return BannerMapper.buildBannerResponse(banner);
//     }

    

//     @Override
//     public void getDeleteBanner(int bannerid) throws CustomNotFoundException {
//         // TODO Auto-generated method stub
//         Optional<Banner> bannerOptional = bannerRepository.findById(bannerid);

//         if (bannerOptional.isEmpty()) {
//             throw new CustomNotFoundException(CustomError.builder().code("404").message("Banner not found").build());
//         }

//         bannerRepository.deleteById(bannerid);
//     }

//     @Override
//     public Map<String, BannerDTOResponse> getBannerByID(int bannerid) throws CustomNotFoundException {
//         Optional<Banner> bannerOptional = bannerRepository.findById(bannerid);

//         if (bannerOptional.isEmpty()) {
//             throw new CustomNotFoundException(CustomError.builder().code("404").message("Banner not found").build());
//         }
//         Banner banner = bannerOptional.get();

//         BannerDTOResponse bannerDTO = BannerMapper.toBannerDTOReponse(banner);
//         Map<String, BannerDTOResponse> result = new HashMap<>();
//         result.put("banner", bannerDTO);

//         return result;

//     }

}
