import { useGoogleLogin } from "@react-oauth/google";
import { useCallback, useRef } from "react";

export const useAuth = () => {
  const resolveRef = useRef<((value: string) => void) | null>(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      const data = await res.json();
      if (resolveRef.current) {
        resolveRef.current(data.sub);
      }
    },
  });

  const authenticateUser = useCallback(() => {
    return new Promise<string>((resolve) => {
      resolveRef.current = resolve;
      login();
    });
  }, [login]);

  return { authenticateUser };
};
