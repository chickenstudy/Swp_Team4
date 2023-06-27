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
public class BannerDTOUpdate {
    private int bannerid;
    private String picture;
    private int cinemaid;
}
