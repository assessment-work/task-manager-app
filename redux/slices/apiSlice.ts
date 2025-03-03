import { createApi } from "@reduxjs/toolkit/query/react";

import { replaceUrlVariables } from "@/utils";

import { api, baseQueryWithReauth } from "./../configs";

import type {
  AddTaskApiResponse,
  DeleteTaskApiResponse,
  EditTaskApiResponse,
  GetAllTaskApiResponse,
  GetTaskByIdApiResponse,
  LoginApiResponse,
  SignupApiResponse,
} from "@/redux";
import type {
  AddTaskApiArgs,
  DeleteTaskByIdApiArgs,
  EditTaskByIdApiArgs,
  GetTaskByIdApiArgs,
  LoginApiArgs,
  SignupApiArgs,
} from "@/dtos";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["GetAllTask", "GetTaskById"],
  endpoints: (build) => ({
    login: build.mutation<LoginApiResponse, LoginApiArgs>({
      query: (args: LoginApiArgs) => ({
        url: api.endpoints.auth.login,
        method: api.methods.post,
        body: args,
      }),
    }),
    signup: build.mutation<SignupApiResponse, SignupApiArgs>({
      query: (args: SignupApiArgs) => ({
        url: api.endpoints.auth.signup,
        method: api.methods.post,
        body: args,
      }),
    }),
    addTask: build.mutation<AddTaskApiResponse, AddTaskApiArgs>({
      query: (args: AddTaskApiArgs) => ({
        url: api.endpoints.task.add,
        method: api.methods.post,
        body: args,
      }),
      invalidatesTags: ["GetAllTask"],
    }),
    getAllTask: build.query<GetAllTaskApiResponse, {}>({
      query: () => ({
        url: api.endpoints.task.list,
        method: api.methods.get,
      }),
      providesTags: ["GetAllTask"],
    }),
    getTaskById: build.query<GetTaskByIdApiResponse, GetTaskByIdApiArgs>({
      query: (args: GetTaskByIdApiArgs) => ({
        url: replaceUrlVariables<GetTaskByIdApiArgs>(
          api.endpoints.task.getById,
          {
            id: args.id,
          }
        ),
        method: api.methods.get,
      }),
      providesTags: ["GetTaskById"],
    }),
    editTask: build.mutation<EditTaskApiResponse, EditTaskByIdApiArgs>({
      query: (args: EditTaskByIdApiArgs) => ({
        url: replaceUrlVariables<EditTaskByIdApiArgs>(api.endpoints.task.edit, {
          id: args.id,
        }),
        method: api.methods.put,
        body: {
          title: args.title,
          description: args.description,
          status: args.status,
        } as Partial<EditTaskByIdApiArgs>,
      }),
      invalidatesTags: ["GetTaskById", "GetAllTask"],
    }),
    deleteTask: build.mutation<DeleteTaskApiResponse, DeleteTaskByIdApiArgs>({
      query: (args: DeleteTaskByIdApiArgs) => ({
        url: replaceUrlVariables<DeleteTaskByIdApiArgs>(
          api.endpoints.task.delete,
          {
            id: args.id,
          }
        ),
        method: api.methods.delete,
      }),
      invalidatesTags: ["GetAllTask"],
    }),
  }),
});

export const {
  useGetAllTaskQuery,
  useLazyGetAllTaskQuery,
  useGetTaskByIdQuery,
  useLazyGetTaskByIdQuery,

  useLoginMutation,
  useSignupMutation,
  useAddTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;

export { apiSlice };
