import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for the auth slice
const initialState = {
  error: "",
  isLoadingAuth: false,
  user: {},
};

// Async thunk for user signup
export const signup = createAsyncThunk(
  "user/signup",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }
      const result = await response.json();
      localStorage.setItem("token", result.token);
    } catch (error) {
      console.error("Signup failed :", error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for user login
export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }
      const result = await response.json();
      localStorage.setItem("token", result.token);
      return result;
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue({ message: "Login Failed" });
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout() {
      localStorage.removeItem("token");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoadingAuth = true;
        state.error = "";
        state.user = {};
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.error = "";
        state.user = action.payload?.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload?.message;
        state.isLoadingAuth = false;
        state.user = {};
      })
      .addCase(login.pending, (state) => {
        state.isLoadingAuth = true;
        state.error = "";
        state.user = {};
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.error = "";
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload?.message;
        state.isLoadingAuth = false;
        state.user = {};
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
