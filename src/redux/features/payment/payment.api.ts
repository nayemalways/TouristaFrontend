import { baseApi } from "@/redux/base.api";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookTour: builder.mutation({
      query: (tourInfo) => ({
        url: "/booking",
        method: "POST",
        data: tourInfo
      }),
    }),
     getTours: builder.query({
      query: () => ({
        url: "/tour",
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    })
  }),
});

export const { useBookTourMutation , useGetToursQuery} = paymentApi;
