import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const urlLocalServer = "http://localhost:3000/api";
//const urlRemoteServer = "'http://фиалки-жуковой-елены.рф/api'";

export const violetsAPI = createApi({
  reducerPath: "violetsAPI",
  tagTypes: ["Violets"],
  baseQuery: fetchBaseQuery({
    baseUrl: urlLocalServer,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.authData.token || "";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchVioletsForAdmin: build.query({
      query: (data) => ({
        url: "/violetcards",
        params: data,
      }),
      providesTags: (result) => ["Violets"],
    }),
    fetchVioletsForSlider: build.query({
      query: () => ({
        url: "/slider",
      }),
    }),
    fetchAllViolets: build.query({
      query: ({ page, searchValue, requestAll }) => ({
        url: "/homePage",
        params: {
          page,
          searchValue,
          requestAll,
        },
      }),
      providesTags: (result) => ["Violets"],
    }),
    fetchViolet: build.query({
      query: (titleSlug) => ({
        url: `/homePage/violets/${titleSlug}`,
      }),
    }),
    createViolet: build.mutation({
      query: (body) => ({
        url: "/violetcards/createcard",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Violets"],
    }),
    deleteViolet: build.mutation({
      query: (titleSlug) => ({
        url: `/violetcards/${titleSlug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Violets"],
    }),
    updateViolet: build.mutation({
      query: ({ titleSlug, data }) => ({
        url: `violetcards/put/${titleSlug}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Violets"],
    }),
  }),
});

export const {
  useFetchAllVioletsQuery,
  useFetchVioletQuery,
  useFetchVioletsForSliderQuery,
  useFetchVioletsForAdminQuery,
  useCreateVioletMutation,
  useDeleteVioletMutation,
  useUpdateVioletMutation,
} = violetsAPI;
