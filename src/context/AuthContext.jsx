import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

// Auth reducer for state management
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "UPDATE_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing auth on mount
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const userRole = localStorage.getItem("userRole");

    if (userData && userRole) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem("userData");
        localStorage.removeItem("userRole");
      }
    }
  }, []);

  const login = async (credentials) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email, // Changed from username to email
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store auth data
      localStorage.setItem("userData", JSON.stringify(data.user));
      localStorage.setItem("userRole", data.user.role);

      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      return data;
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
    dispatch({ type: "LOGOUT" });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const updateUser = (updatedUserData) => {
    // Update both context and localStorage
    const currentUserData = JSON.parse(
      localStorage.getItem("userData") || "{}"
    );
    const newUserData = { ...currentUserData, ...updatedUserData };

    localStorage.setItem("userData", JSON.stringify(newUserData));
    dispatch({ type: "UPDATE_USER", payload: updatedUserData });
  };

  const value = {
    ...state,
    login,
    logout,
    clearError,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
