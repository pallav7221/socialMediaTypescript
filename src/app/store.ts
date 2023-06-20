import { configureStore, Middleware } from "@reduxjs/toolkit";
import userReducer from "../User/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware: Middleware[] = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["your/action/type"],
        ignoredActionPaths: ["payload"],
        ignoredPaths: ["user.user"],
      },
    });

    return middleware;
  },
});
