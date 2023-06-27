package com.namnguyenmoihoc.realworldapp.model.banner;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BannerDTOCreate {
    private int cinemaid;
    private String picture;
}
