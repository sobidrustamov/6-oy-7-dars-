import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./service/todo-api";

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
  },

  middleware: (defaultMiddleware) => {
    return defaultMiddleware().prepend(todoApi.middleware);
  },
});
