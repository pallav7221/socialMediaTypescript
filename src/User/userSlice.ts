import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface UserState {
  user: any;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;

export const useUserData = () => useSelector((state: { user: UserState }) => state.user);
