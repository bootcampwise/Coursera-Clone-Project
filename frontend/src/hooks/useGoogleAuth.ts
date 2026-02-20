import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../lib/supabase";
import { logout } from "../redux/slices/auth/authSlice";
import type { AppDispatch } from "../redux/store";
import toast from "react-hot-toast";

export const useGoogleAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          prompt: "select_account",
          access_type: "offline",
        },
      },
    });

    if (error) {
      toast.error(error.message);
    }
  }, []);

  const signOut = useCallback(async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    await supabase.auth.signOut();
    dispatch(logout());
    toast.success("Logged out successfully");
  }, [dispatch]);

  return { signInWithGoogle, signOut };
};
