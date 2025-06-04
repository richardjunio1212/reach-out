import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  registerStudent,
  registerTeacher,
  registerCounselor,
  logoutUser,
  changePassword,
  editStudent,
  editTeacher,
  editCounselor,
  forgotPassword,
  fetchCurrentUser,
} from './thunks/authThunks';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem('user');
    },
    setUserFromStorage: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        sessionStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerCounselor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCounselor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerCounselor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        sessionStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        sessionStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(editTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editCounselor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCounselor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        sessionStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(editCounselor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        sessionStorage.removeItem('user');
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        sessionStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
