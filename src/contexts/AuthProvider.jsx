import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import supabase from "../lib/supabaseClient";
import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to "cleaning" the user data
  const cleanUserData = (user) => {
    if (!user) return null;
    return {
      id: user.id,
      name: user.user_metadata?.name || "",
      email: user.email,
    };
  };

  // The useEffect hook is used to restore the user data when the component mounts
  useEffect(() => {
    const getSession = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setError(error.message);
        setUser(null);
      } else if (data?.session?.user) {
        setUser(cleanUserData(data.session.user));
        setError(null);
      } else {
        setUser(null);
        setError(null);
      }
      setLoading(false);
    };

    getSession();

    // Listen authentication changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(cleanUserData(session?.user || null));
        setLoading(false);
      }
    );

    // Unsubscribe from the listener on unmount
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Function to handle user registration
  const register = async ({ name, email, password }) => {
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) throw error;

      const user = data.user;

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({ id: user.id, name });

      if (profileError) throw profileError;

      setUser(cleanUserData(user));
      setLoading(false);
      return user;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  // function to handle login with email and password
  const login = async ({ email, password }) => {
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setUser(cleanUserData(data.user));
      setLoading(false);
      return data?.user;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  // Function to handle user logout

  const logout = async () => {
    setError(null);
    setLoading(true);

    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle reset password
  const resetPassword = async (email) => {
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;
      return {
        success: true,
        message:
          "Se o email estiver correto, você receberá um link para redefinir sua senha.",
      };
    } catch (err) {
      console.error(err.message);
      setError("Ocorreu um erro ao tentar recuperar sua senha.");
      return {
        success: false,
        message: "Ocorreu um erro ao tentar recuperar sua senha.",
      };
    } finally {
      setLoading(false);
    }
  };

  // Function to update password
  const updatePassword = async (newPassword) => {
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return {
        success: false,
        message: err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        loading,
        error,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
