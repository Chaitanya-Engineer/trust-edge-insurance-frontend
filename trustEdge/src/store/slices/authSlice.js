import { createSlice } from "@reduxjs/toolkit";

// ─── Initial State ────────────────────────────────────────────
const initialState = {
  user: null,           // logged-in user ka data
  accessToken: null,    // JWT access token
  refreshToken: null,   // JWT refresh token
  isLoggedIn: false,    // login status
  isAdmin: false,       // admin hai ya nahi
};

// ─── Auth Slice ───────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {

    // ── Login Success ────────────────────────────────────────
    // LoginPage se call hoga jab API success aaye
    setCredentials: (state, action) => {
      const { user, tokens } = action.payload;

      state.user         = user;
      state.accessToken  = tokens.access;
      state.refreshToken = tokens.refresh;
      state.isLoggedIn   = true;
      state.isAdmin      = user.role === "ADMIN";

      // localStorage mein bhi save karo
      // (page refresh pe bhi token rahe)
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);
    },

    // ── Set User Only ────────────────────────────────────────
    // /me/ API se user fetch karne ke baad call hoga
    setUser: (state, action) => {
      state.user      = action.payload;
      state.isLoggedIn = true;
      state.isAdmin   = action.payload.role === "ADMIN";
    },

    // ── Logout ───────────────────────────────────────────────
    clearCredentials: (state) => {
      state.user         = null;
      state.accessToken  = null;
      state.refreshToken = null;
      state.isLoggedIn   = false;
      state.isAdmin      = false;

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
});

export const { setCredentials, setUser, clearCredentials } = authSlice.actions;

// ─── Selectors ────────────────────────────────────────────────
// Component mein aise use karo:
// const user = useSelector(selectUser);
export const selectUser       = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsAdmin    = (state) => state.auth.isAdmin;
export const selectAccessToken = (state) => state.auth.accessToken;

export default authSlice.reducer;