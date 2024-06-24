import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  error: "",
  isLoadingUser: false,
};

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async ({ username }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      let url = "http://localhost:5000/api/v1/users?";
      if (username) url += `&username=${username}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }
      const result = await response.json();
      return result.users;
    } catch (error) {
      console.error("Fetching error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoadingUser = true;
        state.error = "";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.error = "";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
