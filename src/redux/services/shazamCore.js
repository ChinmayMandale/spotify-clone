import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Created an API endpoint using redux
export const shazamCoreAPI = createApi({
    reducerPath: 'shazamCoreAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY)
            return headers;
        }
    }),
    endpoints: (builder) => ({
        //redux toolkit allows this to be called as a hook
        getTopCharts: builder.query({ query: () => '/v1/charts/world' }),
        getSongDetails: builder.query({query: ({songid}) => `/v1/tracks/details?track_id=${songid}`}),
        getRelatedSongs: builder.query({query: ({songid}) => `/v1/tracks/related?track_id=${songid}`}),
        getArtistDetails: builder.query({query: (artistId) => `/v2/artists/details?artist_id=${artistId}`}),
        getSongsByCountry: builder.query({query: (countryCode) => `/v1/charts/country?country_code=${countryCode}`}),
        getSongsByGenre: builder.query({query: (genre) => `/v1/charts/genre-world?genre_code=${genre}`}),
        getSongBySearch: builder.query({query: (searchTerm) => `/v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`})
    }),
});

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetRelatedSongsQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsByGenreQuery,
    useGetSongBySearchQuery
} = shazamCoreAPI;