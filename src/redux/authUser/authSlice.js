import { createSlice } from "@reduxjs/toolkit"

import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserData,
  updateUserAvatar,
  sendVerifyEmail,
} from "./authOperators"

const userInitialState = {
  user: null,
  isLoading: true,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPhotoURL: (state, action) => {
      if (state.user) {
        state.user.photoURL = action.payload;
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.expirationTime = 0;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })

      //================================================================
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })

      //================================================================
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })

      //================================================================
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserData.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })

      //================================================================
      .addCase(updateUserAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
    
      //================================================================
      .addCase(sendVerifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendVerifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(sendVerifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
})

export const authUserReducer = authSlice.reducer
export const { setError, setPhotoURL } = authSlice.actions;