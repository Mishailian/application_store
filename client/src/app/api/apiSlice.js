import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const buildQueryParams = (params) => {
  let result = "";
  for (let key in params) {
    result += `${key}=${params[key]}&`;
  }
  result = result.slice(0, -1);
  console.log(result);
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      console.log(getState());
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["POSTS", "POST", "USESRS", "USER", "UNDECLARED"],
  endpoints: (builder) => ({
    getArhive: builder.query({
      query: () => "/archive/",
    }),
    getPosts: builder.query({
      providesTags: ["POSTS"],
      query: ({ page }) => {
        page = page ?? "";
        let url = "/store/";
        if (page) url = url + `?page=${page}`;

        return {
          url: url,
          method: "Get",
        };
      },
    }),
    getPostsCount: builder.query({
      providesTags: ["POSTS"],
      query: () => "/store/?count=1",
    }),
    getUndeclaredPosts: builder.query({
      providesTags: ["UNDECLARED"],
      query: () => "/undeclared/",
    }),
    getPost: builder.query({
      providesTags: ["POST"],
      query: ({ postId }) => ({
        url: `/store/${postId}/`,
        method: "GET",
      }),
    }),
    getUsers: builder.query({
      providesTags: ["USERS"],
      query: () => "/users/",
    }),
    getUser: builder.query({
      providesTags: ["USER"],
      query: (userId) => ({
        url: `/users/${userId}/`,
        method: "GET",
      }),
    }),
    getUsersDB: builder.query({
      query: () => ({
        url: `/users/?get_exdb=true`,
        method: "GET",
      }),
    }),
    getFilterPosts: builder.query({
      providesTags: ["POSTS"],
      query: (params) => ({
        url: `/store/?${buildQueryParams(params)}`,
        method: "GET",
      }),
    }),
    getTags: builder.query({
      query: () => "/tags/",
    }),

    declaredPost: builder.mutation({
      invalidatesTags: ["POSTS", "UNDECLARED"],
      query: ({ postId }) => ({
        url: `/undeclared/?declared=${postId}`,
        method: "GET",
      }),
    }),
    chengeTag: builder.mutation({
      query: ({ initialState, tagId }) => ({
        url: `/tags/${tagId}/`,
        method: "PUT",
        body: initialState,
      }),
    }),
    chengePost: builder.mutation({
      invalidatesTags: ["POST", "POSTS"],
      query: ({ initialState, postId }) => {
        console.log({ body: initialState });
        return {
          url: `/store/${postId}/`,
          method: "PATCH",
          body: initialState,
        };
      },
    }),

    authentication: builder.mutation({
      query: ({ initialState }) => ({
        url: "/token/",
        body: initialState,
        method: "POST",
      }),
    }),

    deleteTag: builder.mutation({
      query: (tagId) => ({ url: `/tags/${tagId}/`, method: "DELETE" }),
    }),
    deletePost: builder.mutation({
      invalidatesTags: ["POSTS"],
      query: (postId) => ({
        url: `/store/${postId}/`,
        method: "DELETE",
      }),
    }),

    addPost: builder.mutation({
      invalidatesTags: ["UNDECLARED"],
      query: ({ initialState }) => {
        console.log(initialState);
        return {
          url: "/undeclared/",
          body: initialState,
          method: "POST",
        };
      },
    }),
    addTag: builder.mutation({
      query: ({ initialState }) => ({
        url: "/tags/",
        body: initialState,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetArhiveQuery,
  useAuthenticationMutation,
  useGetPostsQuery,
  useGetPostsCountQuery,
  useGetUndeclaredPostsQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useGetUsersDBQuery,
  useGetPostQuery,
  useGetTagsQuery,
  useDeclaredPostMutation,
  useChengeTagMutation,
  useGetFilterPostsQuery,
  useChengePostMutation,
  useDeleteTagMutation,
  useDeletePostMutation,
  useAddPostMutation,
  useAddTagMutation,
} = apiSlice;
