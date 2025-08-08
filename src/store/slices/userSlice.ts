import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/types";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

interface UserState {
  // Auth state
  currentUser: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // User management state
  users: User[];
  selectedUser: User | null;

  // Loading states
  loading: boolean;
  authLoading: boolean;
  updateLoading: boolean;

  // Error states
  error: string | null;
  authError: string | null;
  updateError: string | null;
}

export const {
  clearError,
  clearAuthError,
  clearUpdateError,
  clearAllErrors,
  setLoading,
  setSelectedUser,
  clearUserData,
  updateCurrentUserState,
} = userSlice.actions;
export default userSlice.reducer;
