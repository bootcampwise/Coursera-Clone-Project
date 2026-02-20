import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../../lib/supabase";
import { syncGoogleUser } from "../../redux/slices/auth/authSlice";
import type { AppDispatch } from "../../redux/store";
import toast from "react-hot-toast";

const AuthListener: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let mounted = true;

    const handleSync = async (
      supabaseUser: {
        id?: string | null;
        email?: string | null;
        user_metadata?: { full_name?: string; avatar_url?: string };
      },
      showToast: boolean
    ) => {
      if (!mounted) return;

      const userData = {
        email: supabaseUser.email || "",
        name:
          supabaseUser.user_metadata?.full_name ||
          supabaseUser.email?.split("@")[0] ||
          "User",
        providerId: supabaseUser.id || "",
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

    const checkInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        handleSync(session.user, false);
      }
    };

    checkInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (event === "SIGNED_IN" && session?.user) {
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
