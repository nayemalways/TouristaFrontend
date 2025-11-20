import { baseApi } from "@/redux/base.api";

const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDivision: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      providesTags: ["DIVISION"],
      transformResponse: (response) => response.data,
    }),
    addDivision: builder.mutation({
      query: (divisionInfo) => ({
        url: "/division/create",
        method: "POST",
        data: divisionInfo,
        headers: {
          "Content-Type": "application/form-data"
        }
      }),
      invalidatesTags: ["DIVISION"],
    }),
    updateDivision: builder.mutation({
      query: (divisionInfo) => ({
        url: `/division/${divisionInfo?.divisionId}`,
        method: "PATCH",
        data: divisionInfo?.formdata,
        headers: {
          "Content-Type": "application/form-data"
        }
      }),
      invalidatesTags: ["DIVISION"],
    }),
    deleteDivision: builder.mutation({
      query: (divisionId) => ({
        url: `/division/${divisionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DIVISION"],
    }),
  }),
});

export const { useAddDivisionMutation, useGetDivisionQuery, useDeleteDivisionMutation, useUpdateDivisionMutation } = divisionApi;
