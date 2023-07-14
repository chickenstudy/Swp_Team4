// package com.namnguyenmoihoc.realworldapp.service.impl;

// import org.junit.jupiter.api.Assertions;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;

// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.*;

// import java.io.UnsupportedEncodingException;
// import java.util.ArrayList;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import java.util.Optional;

// import com.namnguyenmoihoc.realworldapp.entity.Banner;
// import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
// import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOCreate;
// import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOResponse;
// import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOResponseCreate;
// import com.namnguyenmoihoc.realworldapp.model.banner.BannerDTOUpdate;
// import com.namnguyenmoihoc.realworldapp.model.user.CustomError;
// import com.namnguyenmoihoc.realworldapp.model.user.mapper.BannerMapper;
// import com.namnguyenmoihoc.realworldapp.repository.BannerRepository;
// import com.namnguyenmoihoc.realworldapp.service.BannerService;
// import com.namnguyenmoihoc.realworldapp.service.impl.BannerServiceImpl;

// public class BannerServiceImplTest {

//     @Mock
//     private BannerRepository bannerRepository;

//     private BannerService bannerService;

//     @BeforeEach
//     public void setUp() {
//         MockitoAnnotations.openMocks(this);
//         bannerService = new BannerServiceImpl(bannerRepository);
//     }

//     @Test
//     public void testCreateBanner() throws UnsupportedEncodingException {
//         // Prepare test data
//         BannerDTOCreate bannerDTOCreate = new BannerDTOCreate();
//         // Set properties of bannerDTOCreate object

//         Map<String, BannerDTOCreate> bannerDTOCreateMap = new HashMap<>();
//         bannerDTOCreateMap.put("banner", bannerDTOCreate);

//         Banner banner = new Banner();
//         // Set properties of banner object based on bannerDTOCreate

//         BannerDTOResponseCreate expectedResponse = new BannerDTOResponseCreate();
//         // Set properties of expectedResponse object based on banner

//         // Mock the bannerRepository.save() method
//         when(bannerRepository.save(any(Banner.class))).thenReturn(banner);

//         // Perform the createBanner() method
//         Map<String, BannerDTOResponseCreate> actualResponse = bannerService.createBanner(bannerDTOCreateMap);

//         // Assertions
//         Assertions.assertEquals(expectedResponse, actualResponse.get("banner"));
//         verify(bannerRepository, times(1)).save(any(Banner.class));
//     }

//     @Test
//     public void testGetListBanner() {
//         // Prepare test data
//         List<Banner> banners = new ArrayList<>();
//         // Add banners to the list

//         List<BannerDTOResponse> expectedResponse = new ArrayList<>();
//         // Set properties of expectedResponse objects based on banners

//         // Mock the bannerRepository.findAll() method
//         when(bannerRepository.findAll()).thenReturn(banners);

//         // Perform the getListBanner() method
//         List<BannerDTOResponse> actualResponse = bannerService.getListBanner();

//         // Assertions
//         Assertions.assertEquals(expectedResponse.size(), actualResponse.size());
//     }

//     @Test
//     public void testGetUpdateBanner() throws CustomNotFoundException {
//         // Prepare test data
//         BannerDTOUpdate bannerDTOUpdate = new BannerDTOUpdate();
//         // Set properties of bannerDTOUpdate object

//         Optional<Banner> bannerOptional = Optional.of(new Banner());
//         // Set properties of bannerOptional object based on bannerDTOUpdate

//         Map<String, BannerDTOResponseCreate> expectedResponse = new HashMap<>();
//         // Set properties of expectedResponse object based on bannerOptional

//         // Mock the bannerRepository.findByBannerid() method
//         when(bannerRepository.findByBannerid(anyInt())).thenReturn(bannerOptional);

//         // Mock the bannerRepository.save() method
//         when(bannerRepository.save(any(Banner.class))).thenReturn(bannerOptional.get());

//         // Perform the getUpdateBanner() method
//         Map<String, BannerDTOResponseCreate> actualResponse = bannerService.getUpdateBanner(bannerDTOUpdate);

//         // Assertions
//         Assertions.assertEquals(expectedResponse, actualResponse);
//         verify(bannerRepository, times(1)).findByBannerid(anyInt());
//         verify(bannerRepository, times(1)).save(any(Banner.class));
//     }

//     @Test
//     public void testGetDeleteBanner() throws CustomNotFoundException {
//         // Prepare test data
//         int bannerId = 1;

//         Optional<Banner> bannerOptional = Optional.of(new Banner());
//         // Mock the bannerRepository.findById() method
//         when(bannerRepository.findById(bannerId)).thenReturn(bannerOptional);

//         // Perform the getDeleteBanner() method
//         bannerService.getDeleteBanner(bannerId);

//         // Verify that the bannerRepository.deleteById() method was called once with the
//         // correct parameter
//         verify(bannerRepository, times(1)).deleteById(bannerId);
//     }

//     @Test
//     public void testGetBannerByID() throws CustomNotFoundException {
//         // Prepare test data
//         int bannerId = 1;

//         Optional<Banner> bannerOptional = Optional.of(new Banner());
//         // Set properties of bannerOptional object based on bannerId

//         BannerDTOResponse expectedResponse = new BannerDTOResponse();
//         // Set properties of expectedResponse object based on bannerOptional

//         // Mock the bannerRepository.findById() method
//         when(bannerRepository.findById(bannerId)).thenReturn(bannerOptional);

//         // Perform the getBannerByID() method
//         Map<String, BannerDTOResponse> actualResponse = bannerService.getBannerByID(bannerId);

//         // Assertions
//         Assertions.assertEquals(expectedResponse, actualResponse.get("banner"));
//         verify(bannerRepository, times(1)).findById(bannerId);
//     }
// }