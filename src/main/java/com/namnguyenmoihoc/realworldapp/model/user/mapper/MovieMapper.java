package com.namnguyenmoihoc.realworldapp.model.user.mapper;

import java.io.UnsupportedEncodingException;

import java.util.Base64;

import java.util.HashMap;
import java.util.Map;



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
       
            e.printStackTrace();
        }
        return null;
    }

    public static MovieDTOResponse toMovieDTOReponse(Movie movie) {
        String posterEncode = new String(movie.getPoster());
        String bannerEncode = new String(movie.getBanner());

      

       
      

        return MovieDTOResponse.builder().id(movie.getMovieid()).name(movie.getName()).type(movie.getType())
                .poster(posterEncode).banner(bannerEncode).trailer(movie.getTrailer())
                .times(movie.getTimes()).description(movie.getDescription()).country(movie.getCountry())
                .show_date(movie.getShow_date()).build();
    }

    public static MovieDTOResponseCreate toMovieDTOReponseCreate(Movie movie) {
        String poster = Base64.getEncoder().encodeToString(movie.getPoster()); // byte to string
        String banner = Base64.getEncoder().encodeToString(movie.getBanner());
        return MovieDTOResponseCreate.builder().name(movie.getName()).type(movie.getType())
                .poster(poster).banner(banner).trailer(movie.getTrailer())
                .times(movie.getTimes()).description(movie.getDescription()).country(movie.getCountry())
                .show_date(movie.getShow_date()).build();
    }

    public static Map<String, MovieDTOResponseCreate> buildMovieResponse(Movie movie) {
        String poster = Base64.getEncoder().encodeToString(movie.getPoster()); // byte to string
        String banner = Base64.getEncoder().encodeToString(movie.getBanner());
        Map<String, MovieDTOResponseCreate> wrapper = new HashMap<>();

        MovieDTOResponseCreate movieDTOResponse = MovieDTOResponseCreate.builder().poster(poster)
                .banner(banner).trailer(movie.getTrailer()).show_date(movie.getShow_date())
                .country(movie.getCountry()).name(movie.getName()).description(movie.getDescription())
                .type(movie.getType()).times(movie.getTimes()).build();

        wrapper.put("update:", movieDTOResponse);
        return wrapper;
    }

    public static void updateMovieDetails(Movie movie, MovieDTOUpdate movieDTOUpdate) {
        String posterStr = movieDTOUpdate.getPoster();
        String bannerStr = movieDTOUpdate.getBanner();
        try {
            String encodePosterStr = Base64.getEncoder().encodeToString(posterStr.getBytes("ASCII"));
            String encodeBannerStr = Base64.getEncoder().encodeToString(bannerStr.getBytes("ASCII"));
            byte[] decodePoster = Base64.getDecoder().decode(encodePosterStr); // string to byte[]
            byte[] decodeBanner = Base64.getDecoder().decode(encodeBannerStr);

            movie.setBanner(decodeBanner);
            movie.setPoster(decodePoster);
            movie.setTrailer(movieDTOUpdate.getTrailer());
            movie.setShow_date(movieDTOUpdate.getShow_date());
            movie.setCountry(movieDTOUpdate.getCountry());
            movie.setName(movieDTOUpdate.getName());
            movie.setDescription(movieDTOUpdate.getDescription());
            movie.setType(movieDTOUpdate.getType());
            movie.setTimes(movieDTOUpdate.getTimes());
        } catch (Exception e) {

            e.printStackTrace();

        }

    }

}
