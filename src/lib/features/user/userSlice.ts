import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: object | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
