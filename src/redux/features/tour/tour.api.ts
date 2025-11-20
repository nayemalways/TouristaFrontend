import { baseApi } from "@/redux/base.api";

const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTour: builder.mutation({
      query: (tourInfo) => ({
        url: "/tour/create",
        method: "POST",
        data: tourInfo
      }),
      invalidatesTags: ["TOUR"],
    }),
    addTourType: builder.mutation({
      query: (tourTypeInfo) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeInfo,
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

export const { useAddTourTypeMutation, useGetTourTypeQuery, useRemoveTourTypeMutation, useAddTourMutation} = tourApi;
