package com.namnguyenmoihoc.realworldapp.service.impl;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


import static org.junit.jupiter.api.Assertions.assertThrows;

import static org.mockito.Mockito.*;


import java.util.ArrayList;

import java.util.List;

import java.util.Optional;

import com.namnguyenmoihoc.realworldapp.entity.Banner;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;

import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOResponse;

import com.namnguyenmoihoc.realworldapp.repository.BannerRepository;
import com.namnguyenmoihoc.realworldapp.service.BannerService;

public class BannerServiceImplTest {

    @Mock
    private BannerRepository bannerRepository;

    private BannerService bannerService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        bannerService = new BannerServiceImpl(bannerRepository);
       
    }

    @Test
    public void testGetListBanner() {
        // Prepare test data
        List<Banner> banners = new ArrayList<>();
        // Add banners to the list

        List<BannerDTOResponse> expectedResponse = new ArrayList<>();
        // Set properties of expectedResponse objects based on banners

        // Mock the bannerRepository.findAll() method
        when(bannerRepository.findAll()).thenReturn(banners);

        // Perform the getListBanner() method
        List<BannerDTOResponse> actualResponse = bannerService.getListBanner();

        // Assertions
        Assertions.assertEquals(expectedResponse.size(), actualResponse.size());
    }

    @Test
    public void testGetDeleteBanner() throws CustomNotFoundException {
        // Prepare test data
        int bannerId = 1;

        Optional<Banner> bannerOptional = Optional.of(new Banner());
        // Mock the bannerRepository.findById() method
        when(bannerRepository.findById(bannerId)).thenReturn(bannerOptional);

        // Perform the getDeleteBanner() method
        bannerService.getDeleteBanner(bannerId);

        // Verify that the bannerRepository.deleteById() method was called once with the
        // correct parameter
        verify(bannerRepository, times(1)).deleteById(bannerId);
    }

    @Test
    void testGetBannerByID() throws CustomNotFoundException {
        int bannerid = 1;

        // Prepare the mock behavior for the repository
        Banner banner = new Banner();
        banner.setBannerid(bannerid);
        banner.setPicture("picture".getBytes());
        banner.setActive((byte) 1);
        // Set other properties of the banner as needed

        
    }

    @Test
    void testGetBannerByIDNotFound() {
        int bannerid = 1;

        // Prepare the mock behavior for the repository
        when(bannerRepository.findById(bannerid)).thenReturn(Optional.empty());

        // Call the method under test and assert that it throws CustomNotFoundException
        assertThrows(CustomNotFoundException.class, () -> {
            bannerService.getBannerByID(bannerid);
        });
    }

}