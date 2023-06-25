package com.namnguyenmoihoc.realworldapp.model.user.mapper;

import java.io.UnsupportedEncodingException;

import java.util.Base64;



import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponseCreate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOUpdate;

public class MovieMapper {
    public static Movie toMovie(MovieDTOCreate movieDTOcreate) throws UnsupportedEncodingException {
        String posterStr = movieDTOcreate.getPoster();
        String bannerStr = movieDTOcreate.getBanner();

        try {
            String encodePosterStr = Base64.getEncoder().encodeToString(posterStr.getBytes("ASCII"));
            String encodeBannerStr = Base64.getEncoder().encodeToString(bannerStr.getBytes("ASCII"));
            byte[] decodePoster = Base64.getDecoder().decode(encodePosterStr); // string to byte[]
            byte[] decodeBanner = Base64.getDecoder().decode(encodeBannerStr);

            Movie movie = Movie.builder().name(movieDTOcreate.getName()).type(movieDTOcreate.getType())
                    .poster(decodePoster).banner(decodeBanner)
                    .trailer(movieDTOcreate.getTrailer())
                    .times(movieDTOcreate.getTimes()).country(movieDTOcreate.getCountry())
                    .show_date(movieDTOcreate.getShow_date())
                    .description(movieDTOcreate.getDescription()).build();
            return movie;

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        return null;
    }

    public static MovieDTOResponse toMovieDTOReponse(Movie movie) {
        String posterEncode = new String(movie.getPoster());
        String bannerEncode = new String(movie.getBanner());

        /* 
        byte[] posterDecode = Base64.getUrlDecoder().decode(posterEncode); // byte to string
        byte[] bannerDecode = Base64.getUrlDecoder().decode(bannerEncode);

        String decodedStringPoster = new String(posterDecode, StandardCharsets.UTF_8);
        String decodedStringBanner = new String(bannerDecode, StandardCharsets.UTF_8);
        */

        return MovieDTOResponse.builder().id(movie.getMovie_id()).name(movie.getName()).type(movie.getType())
                .poster(posterEncode).banner(bannerEncode).trailer(movie.getTrailer())
                .times(movie.getTimes()).description(movie.getDescription()).country(movie.getCountry())
                .show_date(movie.getShow_date()).build();
    }

    

    public static Movie toMovieUpdate(MovieDTOUpdate movieDTOUpdate) {
        byte[] poster = Base64.getDecoder().decode(movieDTOUpdate.getPoster()); // string to byte[]
        byte[] banner = Base64.getDecoder().decode(movieDTOUpdate.getPoster());

        Movie movie = Movie.builder().name(movieDTOUpdate.getName()).type(movieDTOUpdate.getType())
                .poster(poster).banner(banner)
                .trailer(movieDTOUpdate.getTrailer())
                .times(movieDTOUpdate.getTimes()).country(movieDTOUpdate.getCountry())
                .show_date(movieDTOUpdate.getShow_date())
                .description(movieDTOUpdate.getDescription()).build();
        return movie;
    }

    public static MovieDTOResponseCreate toMovieDTOReponseCreate(Movie movie) {
        String poster = Base64.getEncoder().encodeToString(movie.getPoster()); // byte to string
        String banner = Base64.getEncoder().encodeToString(movie.getBanner());
        return MovieDTOResponseCreate.builder().name(movie.getName()).type(movie.getType())
                .poster(poster).banner(banner).trailer(movie.getTrailer())
                .times(movie.getTimes()).description(movie.getDescription()).country(movie.getCountry())
                .show_date(movie.getShow_date()).build();
    }

}
