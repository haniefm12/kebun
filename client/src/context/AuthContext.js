// Importing createContext and useReducer from React
import { createContext, useReducer } from 'react';

// Creating an AuthContext using createContext
export const AuthContext = createContext();

// Defining an authReducer function to manage authentication state
export const authReducer = (state, action) => {
  // Switching based on the action type
  switch (action.type) {
    // When the action type is 'LOGIN', return a new state with the user property set to action.payload
    case 'LOGIN':
      return { user: action.payload };
    // When the action type is 'LOGOUT', return a new state with the user property set to null
    case 'LOGOUT':
      return { user: null };
    // For any other action type, return the current state
    default:
      return state;
  }
};

// Defining an AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  // Using useReducer to manage the authentication state
  const [state, dispatch] = useReducer(authReducer, { 
    // Initial state: user is null
    user: null
  });

  // Logging the current authentication state to the console
  console.log('AuthContext state:', state);
  
  // Returning a Provider component that wraps the children components
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  );
};