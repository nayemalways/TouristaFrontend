import { baseApi } from "@/redux/base.api";

const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (divisionInfo) => ({
        url: "/division/create",
        method: "POST",
        data: divisionInfo,
      }),
      invalidatesTags: ["TOUR"],
    }),
    addTourType: builder.mutation({
      query: (tourInfo) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourInfo,
      }),
      invalidatesTags: ["TOUR"],
    }),

    removeTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-type/${tourTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),

    getTourType: builder.query({
      query: () => ({
        url: "/tour/tour-type",
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useAddTourTypeMutation, useGetTourTypeQuery, useRemoveTourTypeMutation, useAddDivisionMutation } = tourApi;
