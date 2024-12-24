import React from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context";
import login from "./auth.api";
import { useState } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState('');
  const [token, setToken] = useState(localStorage.getItem("demo") || "");

  const navigate = useNavigate();

  const signin = async (data: { login: string; password: string }) => {
    try {
      const response: { user: string, token: string } = await login(data);
      const result = await response;
      setUser(result.user);
      setToken(result.token);
      localStorage.setItem(result.user, result.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const signout = () => {
    setUser('');
    setToken("");
    localStorage.removeItem("demo");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, token, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};