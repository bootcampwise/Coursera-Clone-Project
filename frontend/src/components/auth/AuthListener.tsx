import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../../lib/supabase";
import { syncGoogleUser } from "../../features/auth/authSlice";
import type { AppDispatch } from "../../app/store";
import toast from "react-hot-toast";

const AuthListener: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // No currentUser needed here anymore for handleSync logic

  useEffect(() => {
    let mounted = true;

    const handleSync = async (supabaseUser: any, showToast: boolean) => {
      if (!mounted) return;

      const userData = {
        email: supabaseUser.email || "",
        name:
          supabaseUser.user_metadata?.full_name ||
          supabaseUser.email?.split("@")[0] ||
          "User",
        providerId: supabaseUser.id,
        avatarUrl: supabaseUser.user_metadata?.avatar_url,
      };

      try {
        const result = await dispatch(syncGoogleUser(userData));

        if (mounted) {
          if (syncGoogleUser.fulfilled.match(result)) {
            if (showToast) {
              toast.success(`Welcome back, ${userData.name}!`);
            }
          } else if (syncGoogleUser.rejected.match(result)) {
            toast.error(
              (result.payload as string) || "Failed to sync user data"
            );
          }
        }
      } catch (err) {
        if (mounted) {
          toast.error("An unexpected error occurred during sync");
        }
      }
    };

    // 1. Initial Check on mount - always silent
    const checkInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        handleSync(session.user, false);
      }
    };

    checkInitialSession();

    // 2. Listen for changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (event === "SIGNED_IN" && session?.user) {
          // Only show toast if we don't already have a valid user in localStorage
          // This prevents duplicate toasts on mount/refresh
          const hasStoredUser = !!localStorage.getItem("user");
          handleSync(session.user, !hasStoredUser);
        } else if (event === "USER_UPDATED" && session?.user) {
          handleSync(session.user, false);
        }
      }
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return null;
};

export default AuthListener;
