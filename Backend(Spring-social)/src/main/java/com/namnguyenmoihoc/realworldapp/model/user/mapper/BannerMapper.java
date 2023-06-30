package com.namnguyenmoihoc.realworldapp.model.user.mapper;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.entity.Banner;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOResponseCreate;
import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOUpdate;

public class BannerMapper {
    public static Banner toBanner(BannerDTOCreate bannerDTOcreate) throws UnsupportedEncodingException {

        String pictureStr = bannerDTOcreate.getPicture();

        try {

            String encodePictureStr = Base64.getEncoder().encodeToString(pictureStr.getBytes("ASCII"));

            byte[] decodePicture = Base64.getDecoder().decode(encodePictureStr);// string to byte[]

            Banner banner = Banner.builder().picture(decodePicture).active(Byte.valueOf("0")).build();
            return banner;

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        return null;
    }

    public static BannerDTOResponse toBannerDTOReponse(Banner banner) {

        String pictureEncode = new String(banner.getPicture());

        /*
         * byte[] posterDecode = Base64.getUrlDecoder().decode(posterEncode); // byte to
         * string
         * byte[] bannerDecode = Base64.getUrlDecoder().decode(bannerEncode);
         * 
         * String decodedStringPoster = new String(posterDecode,
         * StandardCharsets.UTF_8);
         * String decodedStringBanner = new String(bannerDecode,
         * StandardCharsets.UTF_8);
         */

        return BannerDTOResponse.builder().bannerid(banner.getBannerid()).picture(pictureEncode).active(banner.getActive()).build();
    }

    public static BannerDTOResponseCreate toBannerDTOReponseCreate(Banner banner) {
        // byte to string
        String pictureEncode = new String(banner.getPicture());

        return BannerDTOResponseCreate.builder().picture(pictureEncode).active(banner.getActive()).build();
    }

    public static void updateBannerDetails(Banner banner, BannerDTOUpdate bannerDTOUpdate) {
        String pictureStr = bannerDTOUpdate.getPicture();

        try {
            String encodePictureStr = Base64.getEncoder().encodeToString(pictureStr.getBytes("ASCII"));

            byte[] decodePicture = Base64.getDecoder().decode(encodePictureStr); // string to byte[]

            banner.setPicture(decodePicture);
            banner.setActive(bannerDTOUpdate.getActive());

        } catch (Exception e) {

            e.printStackTrace();

        }

    }
}
