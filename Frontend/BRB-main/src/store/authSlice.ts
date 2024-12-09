import { createSlice } from "@reduxjs/toolkit";

const initialState: { token: string | null } = {
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (_state, action) => {
      const token = action.payload;
      localStorage.setItem("token", token);
      return { token };
    },
    signOut: () => {
      localStorage.removeItem("token");
      return { token: null };
    },
  },
});
export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
