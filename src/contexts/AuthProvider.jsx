import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import useApiRequest from "../hooks/useApiRequest";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { request, error: apiError } = useApiRequest();

  // The useEffect hook is used to restore the user data when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    setLoading(true);

    if (!token || !id) {
      setUser(null);
      setError(null);
      setLoading(false);
      return;
    }

    // Restore the user based on the token and id
    const restore = async () => {
      setLoading(true);
      setError(null);

      const userData = await request("me?id=" + id, "GET", null, {
        Authorization: `Bearer ${token}`,
      });

      if (!userData || userData?.success === false) {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        setError("Não foi possível restaurar os dados do usuário");
      } else {
        setUser(userData);
        setError(null);
      }

      setLoading(false);
    };

    restore();
  }, [request]);

  // Function to handle user login and get the user data
  const login = async (credentials) => {
    setError(null);
    setLoading(true);

    const loginResp = await request("login", "POST", credentials);

    if (loginResp?.success === false) {
      setError(loginResp.error.message);
      setLoading(false);
      return null;
    }

    localStorage.setItem("token", loginResp.token);
    localStorage.setItem("id", loginResp.id);

    const userData = await request("me?id=" + loginResp.id, "GET", null, {
      Authorization: `Bearer ${loginResp.token}`,
    });

    if (!userData || userData?.success === false) {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      setError(
        apiError?.message ||
          "Não foi possível obter os dados do usuário após o login"
      );
      return null;
    }

    setUser(userData);
    setError(null);
    setLoading(false);
    return userData;
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
