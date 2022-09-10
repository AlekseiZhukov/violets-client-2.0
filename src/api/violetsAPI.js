import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const urlLocalServer = "http://localhost:3000/api";
//const urlRemoteServer = "'http://фиалки-жуковой-елены.рф/api'";

export const violetsAPI = createApi({
  reducerPath: "violetsAPI",
  tagTypes: ["Violets"],
  baseQuery: fetchBaseQuery({ baseUrl: urlLocalServer }),
  endpoints: (build) => ({
    fetchVioletsForSlider: build.query({
      query: () => ({
        url: "/slider",
      }),
    }),
    fetchAllViolets: build.query({
      query: ({ page, searchValue }) => ({
        url: "/homePage",
        params: {
          page,
          searchValue,
        },
      }),
      providesTags: (result) => ["Violets"],
    }),
    fetchViolet: build.query({
      query: (titleSlug) => ({
        url: `/homePage/violet/${titleSlug}`,
      }),
    }),
    /* createCharacter: build.mutation({
      query: (body) => ({
        url: "/characters",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Characters"],
    }),
    updateCharacter: build.mutation({
      query: (body) => ({
        url: `/characters/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Characters"],
    }),
    deleteCharacter: build.mutation({
      query: (body) => ({
        url: `/characters/${body.id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Characters"],
    }),*/
  }),
});

export const {
  useFetchAllVioletsQuery,
  useFetchVioletQuery,
  useFetchVioletsForSliderQuery,
} = violetsAPI;
