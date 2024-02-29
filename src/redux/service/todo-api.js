import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_URL }),
  endpoints: (build) => ({
    getTodo: build.query({
      query: (page = 1) => {
        return {
          url: "/todos",
          params: { _limit: 4, _page: page },
        };
      },
      providesTags: ["todos"],
      transformResponse: (data, res) => {
        const totalCount = res?.response?.headers?.get("X-total-count");
        console.log(totalCount);
        const pageSize = parseInt(Number(totalCount) / 4) + 1;
        return { data, pageSize };
      },
    }),

    getSingleTodo: build.query({
      query: (id) => {
        return {
          url: `/todos/${id}`,
        };
      },
    }),
    postTodo: build.mutation({
      query: (data) => {
        return {
          url: "/todos",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["todos"],
    }),
    deleteTodo: build.mutation({
      query: (id) => {
        return {
          url: `/todos/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["todos"],
    }),
  }),
});

export const {
  useGetTodoQuery,
  useGetSingleTodoQuery,
  usePostTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
