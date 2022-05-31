import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState<{ userId: number } | null>(null);

  useEffect(() => {}, []);
};

export default useUser;
