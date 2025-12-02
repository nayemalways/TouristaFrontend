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
     getInvoice: builder.query({
      query: (transacetion_id) => ({
        url: `/payment/invoice?transection_id=${transacetion_id}`,
        method: "GET"
      }),
    })
  }),
});

export const { useBookTourMutation , useGetInvoiceQuery} = paymentApi;
