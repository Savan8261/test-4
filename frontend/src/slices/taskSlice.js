import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  totalTasks: 0,
  error: "",
  isLoadingTask: false,
  stats: {},
};

export const assignTask = createAsyncThunk(
  "task/assign",
  async (
    { task, description, startDate, dueDate, userId },
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task, description, startDate, dueDate, userId }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Post error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const editTask = createAsyncThunk(
  "task/edit",
  async (
    { id, task, description, startDate, dueDate, userId, status },
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task,
          description,
          startDate,
          dueDate,
          userId,
          status,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();

      return data.task;
    } catch (error) {
      console.log("error");

      console.error("Edit error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (
    { userId, status, limit, page, startDate, dueDate },
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem("token");

    try {
      let url = `http://localhost:5000/api/v1/tasks?page=${page}&limit=${limit}`;
      if (userId) url += `&userId=${userId}`;
      if (status) url += `&status=${status}`;
      if (startDate) url += `&startDate=${startDate}`;
      if (dueDate) url += `&dueDate=${dueDate}`;

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

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTasksStats = createAsyncThunk(
  "task/fetchTasksStats",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/v1/tasks/stats", {
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
      const data = await response.json();
      return data.stats;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserTasksStatsById = createAsyncThunk(
  "task/fetchUserTasksStatsById",
  async ({ id }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/tasks/userTasksStats/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }
      const data = await response.json();
      return data.stats;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitTaskAsComplete = createAsyncThunk(
  "user/submitTaskAsComplete",
  async ({ id, update }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(update),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Edit error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserTasksById = createAsyncThunk(
  "user/fetchUserTasksById",
  async (
    { id, status, page, limit, startDate, dueDate },
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem("token");
    try {
      let url = `http://localhost:5000/api/v1/tasks/userTasks/${id}?page=${page}&limit=${limit}`;
      if (status) url += `&status=${status}`;
      if (startDate) url += `&startDate=${startDate}`;
      if (dueDate) url += `&dueDate=${dueDate}`;

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
      return result;
    } catch (error) {
      console.error("Fetching error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (taskId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      return taskId;
    } catch (error) {
      console.error("delete process error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(assignTask.pending, (state) => {
        state.isLoadingTask = true;
        state.error = "";
      })
      .addCase(assignTask.fulfilled, (state, action) => {
        state.isLoadingTask = false;
        state.error = "";
      })
      .addCase(assignTask.rejected, (state, action) => {
        state.isLoadingTask = false;
        state.error = action.payload.message;
      })
      .addCase(editTask.pending, (state, action) => {
        state.isLoadingTask = true;
        state.error = "";
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.isLoadingTask = false;
        state.tasks = state.tasks
          .filter((el) => action.payload.id !== el.id)
          .concat(action.payload);
        state.error = "";
      })
      .addCase(editTask.rejected, (state, action) => {
        state.isLoadingTask = false;
        state.error = action.payload.message;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.isLoadingTask = true;
        state.error = "";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoadingTask = false;
        state.error = "";
        state.tasks = action.payload.tasks;
        state.totalTasks = action.payload.length;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoadingTask = false;
        state.error = action.payload;
      })
      .addCase(fetchTasksStats.pending, (state) => {
        state.isLoadingTask = true;
        state.error = "";
      })
      .addCase(fetchTasksStats.fulfilled, (state, action) => {
        state.isLoadingTask = false;
        state.error = "";
        state.stats = action.payload;
      })
      .addCase(fetchTasksStats.rejected, (state, action) => {
        state.isLoadingTask = false;
        state.error = action.payload;
      })
      .addCase(fetchUserTasksStatsById.pending, (state) => {
        state.isLoadingTask = true;
        state.error = "";
      })
      .addCase(fetchUserTasksStatsById.fulfilled, (state, action) => {
        state.isLoadingTask = false;
        state.error = "";
        state.stats = action.payload;
      })
      .addCase(fetchUserTasksStatsById.rejected, (state, action) => {
        state.isLoadingTask = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoadingTask = true;
        state.error = "";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoadingTask = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.error = "";
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoadingTask = false;
        state.error = action.payload;
      })
      .addCase(submitTaskAsComplete.pending, (state) => {
        state.isLoadingUser = true;
        state.error = "";
      })
      .addCase(submitTaskAsComplete.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.tasks = state.tasks
          .filter((el) => action.payload.task.id !== el.id)
          .concat(action.payload.task);
        state.error = "";
      })
      .addCase(submitTaskAsComplete.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.payload;
      })
      .addCase(fetchUserTasksById.pending, (state) => {
        state.isLoadingTask = true;
        state.error = "";
      })
      .addCase(fetchUserTasksById.fulfilled, (state, action) => {
        state.isLoadingTask = false;
        state.error = "";
        state.tasks = action.payload.tasks;
        state.totalTasks = action.payload.length;
      })
      .addCase(fetchUserTasksById.rejected, (state, action) => {
        state.isLoadingTask = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
