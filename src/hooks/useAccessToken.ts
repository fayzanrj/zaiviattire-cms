import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useAccessToken = () => {
  const { data: session, status } = useSession();

  const accessToken = useMemo(() => {
    if (status === "loading") {
      return null;
    }

    // @ts-ignore
    if (!session || !session.user || !session.user.accessToken) {
      return null;
    }
    // @ts-ignore
    return session.user.accessToken;
  }, [session, status]);

  return accessToken;
};

export default useAccessToken;
