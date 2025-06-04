import { createSlice } from '@reduxjs/toolkit';
import {
  createCounseling,
  fetchCounselingsByTeacher,
  updateCounseling,
} from './thunks/counselingThunks';

const counselingSlice = createSlice({
  name: 'counseling',
  initialState: {
    counselingList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCounseling.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCounseling.fulfilled, (state, action) => {
        state.loading = false;
        state.counselingList.push(action.payload);
      })
      .addCase(createCounseling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCounselingsByTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCounselingsByTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.counselingList = action.payload;
      })
      .addCase(fetchCounselingsByTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCounseling.fulfilled, (state, action) => {
        const index = state.counselingList.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.counselingList[index] = {
            ...state.counselingList[index],
            ...action.payload,
          };
        }
      });
  },
});

export default counselingSlice.reducer;
